"""
generar_datos_sinteticos.py
────────────────────────────
Genera pedidos sintéticos realistas para que el modelo de recomendaciones
tenga datos suficientes desde el primer día.

Uso:
  python generar_datos_sinteticos.py

Solo necesitas ejecutarlo UNA VEZ. No borra pedidos reales.
"""

import mysql.connector
import random
from datetime import datetime, timedelta

DB_CONFIG = {
    "host":     "localhost",
    "user":     "root",
    "password": "",
    "database": "restaurante",
}

# ── Patrones de co-compra realistas para un restaurante ─────────────────────
# Cada lista es un "grupo" de productos que suelen pedirse juntos.
# Ajusta los IDs según los que tengas en tu tabla `productos`.
GRUPOS_FRECUENTES = [
    [1, 2],        # Hamburguesa BBQ + Clásica (mesa de 2)
    [1, 5, 6],     # BBQ + bebidas
    [2, 3, 6],     # Clásica + Vegana + refresco
    [1, 2, 3, 5],  # Mesa de 4 variada
    [4, 5],        # Vegana + agua
    [1, 6],        # BBQ + cerveza
    [2, 5, 3],     # Clásica + agua + vegana
    [1, 2, 6, 5],  # Mesa de 4 con bebidas
]

NUM_PEDIDOS_SINTETICOS = 120  # pedidos a generar


def generar():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    # Obtener productos reales de la BD
    cursor.execute("SELECT id FROM productos")
    ids_reales = [row[0] for row in cursor.fetchall()]

    if not ids_reales:
        print("❌ No hay productos en la BD. Añade productos primero.")
        conn.close()
        return

    print(f"✅ {len(ids_reales)} productos encontrados: {ids_reales}")

    pedidos_creados = 0
    fecha_base = datetime.now() - timedelta(days=90)

    for i in range(NUM_PEDIDOS_SINTETICOS):
        # Fecha aleatoria en los últimos 90 días
        fecha = fecha_base + timedelta(
            days=random.randint(0, 90),
            hours=random.randint(12, 22),
            minutes=random.choice([0, 15, 30, 45]),
        )

        # Elegir un grupo de co-compra (70%) o aleatorio (30%)
        if random.random() < 0.7 and GRUPOS_FRECUENTES:
            grupo = random.choice(GRUPOS_FRECUENTES)
            # Filtrar solo IDs que existen en la BD
            items_ids = [pid for pid in grupo if pid in ids_reales]
            if not items_ids:
                items_ids = random.sample(ids_reales, min(2, len(ids_reales)))
        else:
            n_items = random.randint(1, min(4, len(ids_reales)))
            items_ids = random.sample(ids_reales, n_items)

        # Calcular total aproximado
        total_estimado = len(items_ids) * random.uniform(6, 12)

        # Insertar pedido
        cursor.execute(
            "INSERT INTO pedidos (total, fecha, estado) VALUES (%s, %s, %s)",
            (round(total_estimado, 2), fecha, "pagado"),
        )
        pedido_id = cursor.lastrowid

        # Insertar ítems
        for pid in items_ids:
            cantidad = random.choices([1, 2], weights=[0.8, 0.2])[0]
            cursor.execute(
                "INSERT INTO items_pedido (id_pedido, id_producto, cantidad) VALUES (%s, %s, %s)",
                (pedido_id, pid, cantidad),
            )

        pedidos_creados += 1

    conn.commit()
    cursor.close()
    conn.close()

    print(f"✅ {pedidos_creados} pedidos sintéticos generados correctamente.")
    print("👉 Ahora reinicia el microservicio para que entrene con estos datos.")


if __name__ == "__main__":
    generar()