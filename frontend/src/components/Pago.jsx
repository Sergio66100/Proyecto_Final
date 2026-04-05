import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../App";

function Pago() {
  const navigate = useNavigate();
  const { pedido, setPedido } = useApp();
  const [pagado, setPagado] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  // Leer datos de sesión y preferencias guardadas
  const sesion = JSON.parse(localStorage.getItem("usuario") || "{}");
  const notificacionesActivas = localStorage.getItem("notificaciones") !== "false";

  const confirmarPago = async (metodo) => {
    setCargando(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/pedidos/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: pedido,
          total,
          metodoPago: metodo,
          emailCliente: sesion.email   || null,
          nombreCliente: sesion.nombre || "Cliente",
          notificacionesActivas,        // respeta la preferencia del usuario
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Error al procesar el pedido.");

      setMetodoPago(metodo);
      setPagado(true);
      setPedido([]); // limpia el carrito
    } catch (err) {
      setError("Hubo un problema al procesar el pago. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // ── Pantalla de confirmación ─────────────────────────────────────────────
  if (pagado) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white text-center px-3">
        <div style={{ fontSize: "4rem", animation: "bounceIn .5s ease" }}>✅</div>
        <h2 className="mt-3 mb-2">¡Pedido confirmado!</h2>
        <p className="text-secondary mb-1">
          {metodoPago === "tarjeta"
            ? "Pago con tarjeta procesado correctamente."
            : "El camarero se acercará en breve para cobrar en efectivo."}
        </p>

        {notificacionesActivas && sesion.email && (
          <p className="text-warning mt-2" style={{ fontSize: "0.9rem" }}>
            📧 Resumen enviado a <strong>{sesion.email}</strong>
          </p>
        )}

        <p className="text-warning fw-bold fs-5 mt-3 mb-4">
          Total: {total.toFixed(2)} €
        </p>

        <button className="btn btn-success px-4" onClick={() => navigate("/")}>
          Volver al menú
        </button>
      </div>
    );
  }

  // ── Pantalla de pago ─────────────────────────────────────────────────────
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white px-3">
      <h2 className="mb-1">💳 Método de pago</h2>

      {/* Aviso notificaciones */}
      <p style={{ fontSize: "0.82rem", color: notificacionesActivas ? "#f5a623" : "#666", marginBottom: "20px" }}>
        {notificacionesActivas
          ? `📧 Se enviará confirmación a ${sesion.email || "tu email"}`
          : "🔕 Notificaciones desactivadas — no se enviará email"}
      </p>

      {/* Resumen del pedido */}
      {pedido.length > 0 ? (
        <div
          className="card bg-secondary text-white p-3 mb-4"
          style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
        >
          <h5 className="mb-3">🧾 Tu pedido</h5>
          {pedido.map((p) => (
            <div key={p.id} className="d-flex justify-content-between mb-1">
              <span>{p.nombre} ×{p.cantidad}</span>
              <span>{(p.precio * p.cantidad).toFixed(2)} €</span>
            </div>
          ))}
          <hr className="border-light" />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total</span>
            <span className="text-warning">{total.toFixed(2)} €</span>
          </div>
        </div>
      ) : (
        <p className="text-secondary mb-4">No hay productos en el pedido.</p>
      )}

      {error && (
        <div className="alert alert-danger w-100 mb-3" style={{ maxWidth: "420px" }}>
          {error}
        </div>
      )}

      {/* Botones de pago */}
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <button
          className="btn btn-success w-100 mb-3 py-2 fs-5"
          onClick={() => confirmarPago("tarjeta")}
          disabled={pedido.length === 0 || cargando}
        >
          {cargando ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : null}
          💳 Pagar con tarjeta
        </button>

        <button
          className="btn btn-warning w-100 mb-3 py-2 fs-5"
          onClick={() => confirmarPago("efectivo")}
          disabled={pedido.length === 0 || cargando}
        >
          💵 Pagar en efectivo (llamar camarero)
        </button>

        <button
          className="btn btn-outline-light w-100"
          onClick={() => navigate("/")}
          disabled={cargando}
        >
          ⬅ Volver al menú
        </button>
      </div>
    </div>
  );
}

export default Pago;