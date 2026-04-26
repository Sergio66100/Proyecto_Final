"""
microservicio_recomendaciones.py
─────────────────────────────────
Microservicio Flask que expone un endpoint de recomendaciones
basado en filtrado colaborativo ítem-ítem (co-compra) con scikit-learn.

Arrancarlo:
  pip install flask flask-cors scikit-learn pandas numpy mysql-connector-python
  python microservicio_recomendaciones.py

Corre en http://localhost:5001
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
import threading
import time
import os

app = Flask(__name__)
CORS(app)

# ── Configuración MySQL (igual que tu server.js) ─────────────────────────────
DB_CONFIG = {
    "host":     "localhost",
    "user":     "root",
    "password": "",
    "database": "restaurante",
}

# ── Estado global del modelo ─────────────────────────────────────────────────
modelo = {
    "matriz":       None,   # DataFrame producto x producto (similitud coseno)
    "productos":    None,   # DataFrame con id y nombre de productos
    "top_global":   [],     # Lista de productos más pedidos (fallback)
    "entrenado_en": None,
}

# ════════════════════════════════════════════════════════════════════
#  CONEXIÓN Y CARGA DE DATOS
# ════════════════════════════════════════════════════════════════════

def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def cargar_datos():
    """
    Carga pedidos e items desde MySQL y construye:
    - Una matriz usuario-producto (cada pedido = un "usuario" implícito)
    - La similitud coseno ítem-ítem
    - El top global de productos más pedidos
    """
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Productos del menú
        cursor.execute("SELECT id, nombre, precio, categoria, imagen FROM productos")
        productos = cursor.fetchall()

        # Ítems de todos los pedidos
        cursor.execute("""
            SELECT ip.id_pedido, ip.id_producto, ip.cantidad
            FROM items_pedido ip
            JOIN pedidos p ON ip.id_pedido = p.id
        """)
        items = cursor.fetchall()

        cursor.close()
        conn.close()

        if not productos:
            print("⚠️  No hay productos en la BD.")
            return False

        df_productos = pd.DataFrame(productos)
        modelo["productos"] = df_productos

        # ── Top global (fallback cuando no hay historial) ────────────────
        if items:
            df_items = pd.DataFrame(items)
            ventas = df_items.groupby("id_producto")["cantidad"].sum().reset_index()
            ventas = ventas.merge(df_productos[["id", "nombre"]], left_on="id_producto", right_on="id")
            ventas = ventas.sort_values("cantidad", ascending=False)
            modelo["top_global"] = ventas["id_producto"].tolist()[:10]
        else:
            # Sin pedidos reales: todos los productos como fallback
            modelo["top_global"] = df_productos["id"].tolist()

        # ── Matriz de co-compra ítem-ítem ────────────────────────────────
        if len(items) >= 5:   # mínimo para que el modelo sea útil
            df_items = pd.DataFrame(items)

            # Matriz pedido x producto (binaria: 1 si ese producto estaba en el pedido)
            matriz_pedido = df_items.pivot_table(
                index="id_pedido",
                columns="id_producto",
                values="cantidad",
                aggfunc="sum",
                fill_value=0,
            )
            # Binarizar: no importa cuántas unidades, solo si estaba o no
            matriz_pedido = (matriz_pedido > 0).astype(float)

            # Similitud coseno entre productos (traspuesta)
            sim = cosine_similarity(matriz_pedido.T)
            sim_df = pd.DataFrame(
                sim,
                index=matriz_pedido.columns,
                columns=matriz_pedido.columns,
            )
            modelo["matriz"] = sim_df
            print(f"✅ Modelo entrenado con {len(items)} ítems de {df_items['id_pedido'].nunique()} pedidos.")
        else:
            modelo["matriz"] = None
            print(f"ℹ️  Pocos datos ({len(items)} ítems). Usando top global como fallback.")

        modelo["entrenado_en"] = time.time()
        return True

    except Exception as e:
        print(f"❌ Error cargando datos: {e}")
        return False


# ════════════════════════════════════════════════════════════════════
#  LÓGICA DE RECOMENDACIÓN
# ════════════════════════════════════════════════════════════════════

def recomendar_para_carrito(ids_carrito: list, n: int = 5) -> list:
    """
    Dado un carrito de productos, devuelve hasta n recomendaciones.
    Estrategia:
      1. Si hay modelo entrenado → similitud coseno ítem-ítem
      2. Si no → top global excluyendo lo que ya está en el carrito
    """
    df_productos = modelo["productos"]
    if df_productos is None:
        return []

    excluir = set(ids_carrito)

    # ── Con modelo ───────────────────────────────────────────────────
    if modelo["matriz"] is not None:
        sim_df = modelo["matriz"]
        scores = pd.Series(dtype=float)

        for pid in ids_carrito:
            if pid in sim_df.index:
                scores = scores.add(sim_df[pid], fill_value=0)

        # Excluir productos ya en el carrito
        scores = scores.drop(labels=[p for p in excluir if p in scores.index], errors="ignore")
        scores = scores.sort_values(ascending=False)
        top_ids = scores.head(n).index.tolist()

    # ── Fallback: top global ─────────────────────────────────────────
    else:
        top_ids = [p for p in modelo["top_global"] if p not in excluir][:n]

    # Enriquecer con datos del producto
    resultado = []
    for pid in top_ids:
        row = df_productos[df_productos["id"] == pid]
        if not row.empty:
            resultado.append({
            "id":        int(row.iloc[0]["id"]),
            "nombre":    row.iloc[0]["nombre"],
            "precio":    float(row.iloc[0]["precio"]),
            "categoria": row.iloc[0]["categoria"],
            "imagen":    row.iloc[0]["imagen"],
        })

    return resultado


def recomendar_top(n: int = 8) -> list:
    """Devuelve los n productos más pedidos (para la sección destacada sin carrito)."""
    df_productos = modelo["productos"]
    if df_productos is None:
        return []

    top_ids = modelo["top_global"][:n]
    resultado = []
    for pid in top_ids:
        row = df_productos[df_productos["id"] == pid]
        if not row.empty:
            resultado.append({
                "id":        int(row.iloc[0]["id"]),
                "nombre":    row.iloc[0]["nombre"],
                "precio":    float(row.iloc[0]["precio"]),
                "categoria": row.iloc[0]["categoria"],
                "imagen":    row.iloc[0]["imagen"],
            })

    # Si no hay pedidos, devuelve todos los productos mezclados
    if not resultado:
        for _, row in df_productos.head(n).iterrows():
            resultado.append({
                "id":        int(row["id"]),
                "nombre":    row["nombre"],
                "precio":    float(row["precio"]),
                "categoria": row["categoria"],
                "imagen":    row.iloc[0]["imagen"],
            })

    return resultado


# ════════════════════════════════════════════════════════════════════
#  ENDPOINTS
# ════════════════════════════════════════════════════════════════════

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "ok":           True,
        "entrenado":    modelo["entrenado_en"] is not None,
        "num_productos": len(modelo["productos"]) if modelo["productos"] is not None else 0,
        "tiene_modelo": modelo["matriz"] is not None,
    })


@app.route("/recomendaciones/top", methods=["GET"])
def top_productos():
    """
    GET /recomendaciones/top?n=8
    Devuelve los productos más pedidos (sección destacada del menú).
    """
    n = int(request.args.get("n", 8))
    return jsonify(recomendar_top(n))


@app.route("/recomendaciones/carrito", methods=["POST"])
def recomendaciones_carrito():
    """
    POST /recomendaciones/carrito
    Body: { "ids": [1, 3, 7] }
    Devuelve recomendaciones basadas en el carrito actual.
    """
    body = request.get_json()
    ids  = body.get("ids", []) if body else []

    if not ids:
        return jsonify(recomendar_top(5))

    recomendaciones = recomendar_para_carrito(ids, n=5)
    return jsonify(recomendaciones)


@app.route("/recomendaciones/reentrenar", methods=["POST"])
def reentrenar():
    """
    POST /recomendaciones/reentrenar
    Fuerza el reentrenamiento del modelo (lo llama server.js tras cada pedido).
    """
    ok = cargar_datos()
    return jsonify({ "success": ok })


# ════════════════════════════════════════════════════════════════════
#  REENTRENAMIENTO AUTOMÁTICO CADA 10 MINUTOS
# ════════════════════════════════════════════════════════════════════

def reentrenamiento_periodico():
    while True:
        time.sleep(600)  # 10 minutos
        print("🔄 Reentrenando modelo...")
        cargar_datos()


if __name__ == "__main__":
    print("🚀 Iniciando microservicio de recomendaciones...")
    cargar_datos()  # carga inicial

    # Hilo de reentrenamiento periódico
    hilo = threading.Thread(target=reentrenamiento_periodico, daemon=True)
    hilo.start()

    app.run(port=5001, debug=False)