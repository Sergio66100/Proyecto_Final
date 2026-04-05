import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../App";

function Menu() {
  const navigate = useNavigate();
  const { logout, pedido, setPedido } = useApp();

  const [productos, setProductos]                       = useState([]);
  const [mostrarResumen, setMostrarResumen]             = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarAjustes, setMostrarAjustes]             = useState(false);
  const [mostrarReserva, setMostrarReserva]             = useState(false);
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);
  const [temaOscuro, setTemaOscuro]                     = useState(true);
  const [nombre, setNombre]                             = useState("");

  // ── Estado del formulario de reserva ────────────────────────────────────
  const [reservaData, setReservaData] = useState({
    telefono: "", fecha: "", hora: "", num_personas: 2, notas: "",
  });
  const [reservaEstado, setReservaEstado] = useState(""); // "cargando"|"ok"|"error"
  const [reservaMensaje, setReservaMensaje] = useState("");

  const sesion = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((r) => r.json()).then(setProductos);

    const tema  = localStorage.getItem("tema");
    const notif = localStorage.getItem("notificaciones");
    const nom   = localStorage.getItem("nombre");
    if (tema === "claro") setTemaOscuro(false);
    if (notif !== null)   setNotificacionesActivas(notif === "true");
    if (nom)              setNombre(nom);
  }, []);

  // ── Agrupación ───────────────────────────────────────────────────────────
  const porCategoria = productos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = [];
    acc[p.categoria].push(p);
    return acc;
  }, {});

  // ── Carrito ──────────────────────────────────────────────────────────────
  const añadir = (producto) => {
    const existe = pedido.find((p) => p.id === producto.id);
    if (existe) {
      setPedido(pedido.map((p) => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p));
    } else {
      setPedido([...pedido, { ...producto, cantidad: 1 }]);
    }
  };

  const quitar = (id) => {
    setPedido(
      pedido.map((p) => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
            .filter((p) => p.cantidad > 0)
    );
  };

  const total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  const irAPagar = async () => {
    try {
      await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: pedido, total, fecha: new Date().toISOString(), estado: "pendiente" }),
      });
    } catch { console.warn("No se pudo guardar el pedido."); }
    setMostrarResumen(false);
    navigate("/pago");
  };

  // ── Sidebar ──────────────────────────────────────────────────────────────
  const irInicio = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToCategoria = (cat) => {
    const el = document.getElementById(cat);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const salir = () => { logout(); navigate("/login"); };

  // ── Tema ─────────────────────────────────────────────────────────────────
  const cambiarTema = () => {
    const nuevo = !temaOscuro;
    setTemaOscuro(nuevo);
    localStorage.setItem("tema", nuevo ? "oscuro" : "claro");
  };

  const guardarNotificaciones = () => {
    localStorage.setItem("notificaciones", notificacionesActivas);
    setMostrarNotificaciones(false);
  };

  const guardarNombre = () => {
    localStorage.setItem("nombre", nombre);
    alert("Nombre guardado 👤");
  };

  // ── Reserva ──────────────────────────────────────────────────────────────
  const hoy = new Date().toISOString().split("T")[0];

  const handleReserva = async () => {
    const { telefono, fecha, hora, num_personas, notas } = reservaData;

    if (!fecha || !hora || !telefono) {
      setReservaEstado("error");
      setReservaMensaje("Rellena todos los campos obligatorios.");
      return;
    }

    setReservaEstado("cargando");
    setReservaMensaje("");

    try {
      const res = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_cliente:    sesion.id   || null,
          nombre:        sesion.nombre || nombre || "Cliente",
          email:         sesion.email || "",
          telefono,
          fecha,
          hora,
          num_personas:  parseInt(num_personas),
          notas,
          notificacionesActivas,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setReservaEstado("ok");
        setReservaMensaje(
          `✅ Reserva #${data.idReserva} confirmada para el ${fecha} a las ${hora}.` +
          (notificacionesActivas && sesion.email ? ` Confirmación enviada a ${sesion.email}.` : "")
        );
        setReservaData({ telefono: "", fecha: "", hora: "", num_personas: 2, notas: "" });
      } else {
        setReservaEstado("error");
        setReservaMensaje(data.mensaje || "No se pudo completar la reserva.");
      }
    } catch {
      setReservaEstado("error");
      setReservaMensaje("Error de conexión con el servidor.");
    }
  };

  // ── Estilos dinámicos ────────────────────────────────────────────────────
  const sidebarClase = temaOscuro ? "bg-dark text-white" : "bg-light text-dark border-end";
  const btnSidebar   = temaOscuro ? "btn-outline-light" : "btn-outline-dark";
  const cardClase    = temaOscuro ? "bg-dark text-white" : "bg-white text-dark";
  const fondo = temaOscuro
    ? "linear-gradient(135deg,#1e1e2f,#2c2c54)"
    : "linear-gradient(135deg,#f5f5f5,#dddddd)";

  return (
    <div className="d-flex vh-100 vw-100">

      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <div className={`d-flex flex-column align-items-center py-3 ${sidebarClase}`}
           style={{ width: "80px", flexShrink: 0 }}>
        <h4>🍔</h4>
        <hr className="w-100" />

        <button className={`btn ${btnSidebar} mb-3`} onClick={irInicio}          title="Inicio">🏠</button>
        <button className={`btn ${btnSidebar} mb-3`} onClick={() => setMostrarNotificaciones(true)} title="Notificaciones">🔔</button>
        <button className={`btn ${btnSidebar} mb-3`} onClick={() => setMostrarAjustes(true)}        title="Ajustes">⚙️</button>
        <button className={`btn ${btnSidebar} mb-3`} onClick={() => { setMostrarReserva(true); setReservaEstado(""); setReservaMensaje(""); }}
                title="Reservar mesa">🪑</button>

        <div className="mt-auto">
          <button className="btn btn-danger" onClick={salir} title="Cerrar sesión">🚪</button>
        </div>
      </div>

      {/* ── PRODUCTOS ────────────────────────────────────────────────────── */}
      <div className="flex-grow-1 p-4"
           style={{ background: fondo, color: temaOscuro ? "white" : "black", overflowY: "auto" }}>
        <h2 className="mb-3">🍽 Menú</h2>

        <div className="mb-4">
          {Object.keys(porCategoria).map((cat) => (
            <button key={cat} className="btn btn-warning me-2 mb-2"
              onClick={() => scrollToCategoria(cat)}>{cat}</button>
          ))}
        </div>

        {Object.keys(porCategoria).map((categoria) => (
          <div key={categoria} id={categoria}>
            <h3 className="mt-4 mb-3 text-warning">{categoria}</h3>
            <div className="row">
              {porCategoria[categoria].map((p) => {
                const enPedido = pedido.find((x) => x.id === p.id);
                return (
                  <div className="col-md-4 mb-4" key={p.id}>
                    <div className={`card shadow h-100 ${cardClase}`}>
                      <img src={p.imagen} alt={p.nombre} className="card-img-top"
                           style={{ height: "160px", objectFit: "cover" }} />
                      <div className="card-body text-center d-flex flex-column justify-content-between">
                        <div>
                          <h5>{p.nombre}</h5>
                          <p className="text-warning fw-bold">{p.precio} €</p>
                        </div>
                        {enPedido ? (
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-danger btn-sm" onClick={() => quitar(p.id)}>−</button>
                            <span className="fw-bold">{enPedido.cantidad}</span>
                            <button className="btn btn-success btn-sm" onClick={() => añadir(p)}>+</button>
                          </div>
                        ) : (
                          <button className="btn btn-warning" onClick={() => añadir(p)}>Añadir</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── PANEL PEDIDO ─────────────────────────────────────────────────── */}
      <div className="text-white p-4 d-flex flex-column"
           style={{ width: "320px", flexShrink: 0, background: "#111", overflowY: "auto" }}>
        <h3>🛒 Pedido</h3>
        {pedido.length === 0 ? <p className="text-secondary">No hay productos</p> : (
          pedido.map((p) => (
            <div key={p.id} className="mb-3 border-bottom border-secondary pb-2">
              <strong>{p.nombre}</strong>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-danger btn-sm" onClick={() => quitar(p.id)}>−</button>
                  <span>{p.cantidad}</span>
                  <button className="btn btn-success btn-sm" onClick={() => añadir(p)}>+</button>
                </div>
                <span>{(p.precio * p.cantidad).toFixed(2)} €</span>
              </div>
            </div>
          ))
        )}
        <hr className="border-secondary" />
        <h4>Total: {total.toFixed(2)} €</h4>
        <button className="btn btn-success w-100 mt-3"
          onClick={() => setMostrarResumen(true)} disabled={pedido.length === 0}>
          Confirmar Pedido
        </button>
      </div>

      {/* ── MODAL NOTIFICACIONES ─────────────────────────────────────────── */}
      {mostrarNotificaciones && (
        <Modal onClose={() => setMostrarNotificaciones(false)}>
          <h3>🔔 Notificaciones</h3>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>Activar notificaciones por email</span>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox"
                checked={notificacionesActivas}
                onChange={() => setNotificacionesActivas(!notificacionesActivas)} />
            </div>
          </div>
          <p className="text-muted mt-2" style={{ fontSize: "0.82rem" }}>
            {notificacionesActivas
              ? `📧 Se enviarán emails de confirmación a ${sesion.email || "tu cuenta"}`
              : "🔕 No recibirás emails de confirmación"}
          </p>
          <button className="btn btn-primary w-100 mt-3" onClick={guardarNotificaciones}>Guardar</button>
        </Modal>
      )}

      {/* ── MODAL AJUSTES ────────────────────────────────────────────────── */}
      {mostrarAjustes && (
        <Modal onClose={() => setMostrarAjustes(false)}>
          <h3>⚙️ Ajustes</h3>
          <button className="btn btn-outline-dark w-100 mb-3" onClick={cambiarTema}>
            {temaOscuro ? "☀️ Cambiar a claro" : "🌙 Cambiar a oscuro"}
          </button>
          <input className="form-control mb-2" placeholder="Tu nombre"
            value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button className="btn btn-outline-dark w-100 mb-3" onClick={guardarNombre}>
            Guardar perfil 👤
          </button>
          <button className="btn btn-primary w-100" onClick={() => setMostrarAjustes(false)}>Cerrar</button>
        </Modal>
      )}

      {/* ── MODAL RESERVA ────────────────────────────────────────────────── */}
      {mostrarReserva && (
        <Modal onClose={() => setMostrarReserva(false)}>
          <h3 className="mb-1">🪑 Reservar mesa</h3>
          <p className="text-muted mb-3" style={{ fontSize: "0.83rem" }}>
            Horario: 12:00 – 23:00 · Cancela con 2h de antelación
          </p>

          {/* Feedback */}
          {reservaEstado === "ok" && (
            <div className="alert alert-success py-2" style={{ fontSize: "0.88rem" }}>
              {reservaMensaje}
            </div>
          )}
          {reservaEstado === "error" && (
            <div className="alert alert-danger py-2" style={{ fontSize: "0.88rem" }}>
              {reservaMensaje}
            </div>
          )}

          {reservaEstado !== "ok" && (
            <>
              {/* Nombre (rellenado si hay sesión) */}
              <div className="mb-2">
                <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>
                  Nombre <span className="text-danger">*</span>
                </label>
                <input className="form-control" value={sesion.nombre || nombre}
                  disabled={!!sesion.nombre} readOnly={!!sesion.nombre}
                  onChange={(e) => setNombre(e.target.value)} />
              </div>

              {/* Teléfono */}
              <div className="mb-2">
                <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>
                  Teléfono <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="tel" placeholder="612345678"
                  maxLength={9}
                  value={reservaData.telefono}
                  onChange={(e) => setReservaData({ ...reservaData, telefono: e.target.value.replace(/\D/g, "") })} />
              </div>

              {/* Fecha y Hora */}
              <div className="row mb-2">
                <div className="col">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>
                    Fecha <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="date" min={hoy}
                    value={reservaData.fecha}
                    onChange={(e) => setReservaData({ ...reservaData, fecha: e.target.value })} />
                </div>
                <div className="col">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>
                    Hora <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="time" min="12:00" max="23:00"
                    value={reservaData.hora}
                    onChange={(e) => setReservaData({ ...reservaData, hora: e.target.value })} />
                </div>
              </div>

              {/* Personas */}
              <div className="mb-2">
                <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>
                  Número de personas
                </label>
                <div className="d-flex align-items-center gap-3">
                  <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setReservaData({ ...reservaData, num_personas: Math.max(1, reservaData.num_personas - 1) })}>−</button>
                  <span className="fw-bold fs-5">{reservaData.num_personas}</span>
                  <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setReservaData({ ...reservaData, num_personas: Math.min(20, reservaData.num_personas + 1) })}>+</button>
                </div>
              </div>

              {/* Notas */}
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.82rem" }}>Notas (opcional)</label>
                <textarea className="form-control" rows={2}
                  placeholder="Alergias, ocasión especial, silla de bebé..."
                  value={reservaData.notas}
                  onChange={(e) => setReservaData({ ...reservaData, notas: e.target.value })} />
              </div>

              {/* Aviso notificaciones */}
              <p style={{ fontSize: "0.78rem", color: notificacionesActivas ? "#f5a623" : "#999" }} className="mb-3">
                {notificacionesActivas && sesion.email
                  ? `📧 Se enviará confirmación a ${sesion.email}`
                  : "🔕 Notificaciones desactivadas"}
              </p>

              <button className="btn btn-warning w-100 fw-bold"
                onClick={handleReserva}
                disabled={reservaEstado === "cargando"}>
                {reservaEstado === "cargando"
                  ? <><span className="spinner-border spinner-border-sm me-2" />Reservando...</>
                  : "🪑 Confirmar reserva"}
              </button>
            </>
          )}

          {reservaEstado === "ok" && (
            <button className="btn btn-secondary w-100 mt-2"
              onClick={() => setMostrarReserva(false)}>Cerrar</button>
          )}
        </Modal>
      )}

      {/* ── MODAL RESUMEN PEDIDO ─────────────────────────────────────────── */}
      {mostrarResumen && (
        <Modal onClose={() => setMostrarResumen(false)}>
          <h3 className="mb-3">🧾 Resumen del pedido</h3>
          {pedido.map((p) => (
            <div key={p.id} className="d-flex justify-content-between mb-2">
              <span>{p.nombre} ×{p.cantidad}</span>
              <span>{(p.precio * p.cantidad).toFixed(2)} €</span>
            </div>
          ))}
          <hr />
          <h4 className="text-end">Total: {total.toFixed(2)} €</h4>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={() => setMostrarResumen(false)}>✏️ Editar</button>
            <button className="btn btn-success" onClick={irAPagar}>💳 Ir a pagar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Modal reutilizable ────────────────────────────────────────────────────────
function Modal({ children, onClose }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
         style={{ background: "rgba(0,0,0,0.7)", zIndex: 1050 }}
         onClick={onClose}>
      <div className="card shadow p-4"
           style={{ width: "460px", maxHeight: "90vh", overflowY: "auto", borderRadius: "15px" }}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Menu;