const express    = require("express");
const cors       = require("cors");
const mysql      = require("mysql2");
const crypto     = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// ── SHA-256 ──────────────────────────────────────────────────────────────────
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// ═══════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN GMAIL 
// ═══════════════════════════════════════════════════════════════════
const EMAIL_RESTAURANTE = "restaurantesergio123@gmail.com";
const EMAIL_APP_PASSWORD = "ouym lglv blss ynct";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_RESTAURANTE, pass: EMAIL_APP_PASSWORD },
});

// ── Horario del restaurante (RF-04, regla de negocio) ────────────────────────
const HORA_APERTURA  = "12:00";
const HORA_CIERRE    = "23:00";
const INTERVALO_MIN  = 15; // minutos entre reservas (regla de negocio)

function horaEnRango(hora) {
  return hora >= HORA_APERTURA && hora <= HORA_CIERRE;
}

// ═══════════════════════════════════════════════════════════════════
//  CONEXIÓN MYSQL
// ═══════════════════════════════════════════════════════════════════
const db = mysql.createConnection({
  host: "localhost", user: "root", password: "", database: "restaurante",
});

db.connect((err) => {
  if (err) console.error("❌ Error conexión BD:", err);
  else     console.log("✅ Conectado a MySQL");
});

// ═══════════════════════════════════════════════════════════════════
//  PLANTILLAS DE EMAIL
// ═══════════════════════════════════════════════════════════════════

function emailReservaHTML({ nombre, fecha, hora, numPersonas, notas, idReserva }) {
  const fechaFormato = new Date(`${fecha}T${hora}`).toLocaleString("es-ES", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return `
  <!DOCTYPE html><html lang="es">
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#faf7f2;font-family:'Segoe UI',sans-serif;">
    <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;
                box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <div style="background:linear-gradient(135deg,#1a1a1a,#2c2c2c);padding:32px;text-align:center;">
        <div style="font-size:3rem;">🍽️</div>
        <h1 style="color:#f5a623;font-size:1.6rem;margin:8px 0 0;">Restaurante</h1>
        <p style="color:#aaa;margin:6px 0 0;font-size:0.9rem;">Confirmación de reserva #${idReserva}</p>
      </div>

      <div style="padding:28px 32px 0;">
        <p style="font-size:1.05rem;color:#333;">Hola, <strong>${nombre}</strong> 👋</p>
        <p style="color:#666;font-size:0.95rem;">Tu reserva ha sido confirmada. Aquí tienes los detalles:</p>
      </div>

      <div style="padding:16px 32px;display:flex;flex-direction:column;gap:12px;">
        ${[
          ["📅 Fecha",       fechaFormato],
          ["🕐 Hora",        hora],
          ["👥 Personas",    `${numPersonas} persona${numPersonas > 1 ? "s" : ""}`],
          notas ? ["📝 Notas", notas] : null,
        ].filter(Boolean).map(([label, val]) => `
          <div style="background:#fdf3e3;border-radius:10px;padding:14px 18px;display:flex;justify-content:space-between;">
            <span style="color:#999;font-size:0.85rem;">${label}</span>
            <span style="color:#333;font-weight:600;font-size:0.95rem;">${val}</span>
          </div>`).join("")}
      </div>

      <div style="margin:16px 32px;background:#fff8ec;border:1px solid #f5a62333;border-radius:10px;padding:14px 18px;">
        <p style="margin:0;font-size:0.85rem;color:#c47e0f;">
          ⚠️ Las cancelaciones deben realizarse con al menos <strong>2 horas de antelación</strong>.
        </p>
      </div>

      <div style="padding:24px 32px;text-align:center;border-top:1px solid #f0e6d3;margin-top:8px;">
        <p style="color:#aaa;font-size:0.82rem;margin:0;">
          Gracias por elegirnos 🙏 · Restaurante
        </p>
      </div>
    </div>
  </body></html>`;
}

async function enviarEmailReserva({ email, nombre, fecha, hora, numPersonas, notas, idReserva }) {
  const html = emailReservaHTML({ nombre, fecha, hora, numPersonas, notas, idReserva });

  await Promise.all([
    // Al cliente
    transporter.sendMail({
      from: `"Restaurante 🍔" <${EMAIL_RESTAURANTE}>`,
      to: email,
      subject: `✅ Reserva confirmada · ${fecha} ${hora}`,
      html,
    }),
    // Al restaurante
    transporter.sendMail({
      from: `"Restaurante 🍔" <${EMAIL_RESTAURANTE}>`,
      to: EMAIL_RESTAURANTE,
      subject: `📋 Nueva reserva de ${nombre} · ${fecha} ${hora} · ${numPersonas} personas`,
      html,
    }),
  ]);
}

// ═══════════════════════════════════════════════════════════════════
//  USUARIOS
// ═══════════════════════════════════════════════════════════════════

app.post("/usuarios", (req, res) => {
  const { nombre, email, passwordHash, rol, creadoEn } = req.body;
  if (!nombre || !email || !passwordHash)
    return res.status(400).json({ success: false, mensaje: "Faltan campos." });

  db.query("SELECT id FROM usuarios WHERE email = ?", [email.toLowerCase()], (err, result) => {
    if (err) return res.status(500).json({ success: false });
    if (result.length > 0)
      return res.status(409).json({ success: false, mensaje: "Email ya registrado." });

    db.query(
      "INSERT INTO usuarios (nombre, email, password_hash, rol, creado_en) VALUES (?,?,?,?,?)",
      [nombre.trim(), email.toLowerCase().trim(), passwordHash, rol || "cliente", creadoEn || new Date()],
      (err2, r) => {
        if (err2) return res.status(500).json({ success: false });
        res.status(201).json({ success: true, id: r.insertId, nombre, email, rol: rol || "cliente" });
      }
    );
  });
});

app.get("/usuarios", (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ success: false });
  db.query(
    "SELECT id, nombre, email, password_hash AS passwordHash, rol FROM usuarios WHERE email = ?",
    [email.toLowerCase()],
    (err, result) => {
      if (err) return res.status(500).json([]);
      res.json(result);
    }
  );
});

// ═══════════════════════════════════════════════════════════════════
//  PRODUCTOS
// ═══════════════════════════════════════════════════════════════════

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

// ═══════════════════════════════════════════════════════════════════
//  PEDIDOS
// ═══════════════════════════════════════════════════════════════════

app.post("/pedidos/confirmar", async (req, res) => {
  const { items, total, metodoPago, emailCliente, nombreCliente, notificacionesActivas } = req.body;
  if (!items || items.length === 0)
    return res.status(400).json({ success: false, mensaje: "Pedido vacío." });

  const fecha = new Date();
  db.query(
    "INSERT INTO pedidos (total, fecha, estado) VALUES (?,?,?)",
    [total, fecha, "pagado"],
    (err, result) => {
      if (err) return res.status(500).json({ success: false });
      const pedidoId = result.insertId;
      const valores  = items.map((i) => [pedidoId, i.id, i.cantidad]);

      db.query("INSERT INTO items_pedido (id_pedido, id_producto, cantidad) VALUES ?", [valores],
        async (err2) => {
          if (err2) return res.status(500).json({ success: false });

          if (notificacionesActivas) {
            try { await enviarEmailPedido({ emailCliente, nombreCliente, items, total, metodoPago, fecha }); }
            catch (e) { console.error("⚠️ Email pedido:", e.message); }
          }
          res.json({ success: true, pedidoId });
        }
      );
    }
  );
});

// (función de email de pedido separada para no mezclar con reservas)
async function enviarEmailPedido({ emailCliente, nombreCliente, items, total, metodoPago, fecha }) {
  const filas = items.map((i) =>
    `<tr>
      <td style="padding:10px 16px;border-bottom:1px solid #f0e6d3;">${i.nombre}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #f0e6d3;text-align:center;">${i.cantidad}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #f0e6d3;text-align:right;color:#c47e0f;font-weight:600;">
        ${(i.precio * i.cantidad).toFixed(2)} €
      </td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html><html><body style="font-family:'Segoe UI',sans-serif;background:#faf7f2;">
    <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
      <div style="background:linear-gradient(135deg,#1a1a1a,#2c2c2c);padding:32px;text-align:center;">
        <div style="font-size:3rem;">🍔</div>
        <h1 style="color:#f5a623;margin:8px 0 0;">Restaurante</h1>
        <p style="color:#aaa;margin:6px 0 0;font-size:.9rem;">Confirmación de pedido</p>
      </div>
      <div style="padding:28px 32px 0;">
        <p style="color:#333;">Hola, <strong>${nombreCliente}</strong> 👋</p>
      </div>
      <div style="padding:16px 32px;">
        <table style="width:100%;border-collapse:collapse;font-size:.95rem;">
          <thead><tr style="background:#fdf3e3;">
            <th style="padding:10px 16px;text-align:left;color:#c47e0f;">Producto</th>
            <th style="padding:10px 16px;text-align:center;color:#c47e0f;">Cant.</th>
            <th style="padding:10px 16px;text-align:right;color:#c47e0f;">Precio</th>
          </tr></thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
      <div style="margin:0 32px 24px;background:#fdf3e3;border-radius:12px;padding:16px 20px;display:flex;justify-content:space-between;">
        <span style="color:#666;">Total</span>
        <span style="font-size:1.3rem;font-weight:700;color:#c47e0f;">${total.toFixed(2)} €</span>
      </div>
    </div>
  </body></html>`;

  const asunto = `🍔 Pedido confirmado · ${total.toFixed(2)} €`;
  await Promise.all([
    transporter.sendMail({ from: `"Restaurante" <${EMAIL_RESTAURANTE}>`, to: emailCliente, subject: asunto, html }),
    transporter.sendMail({ from: `"Restaurante" <${EMAIL_RESTAURANTE}>`, to: EMAIL_RESTAURANTE, subject: `📋 Nuevo pedido de ${nombreCliente}`, html }),
  ]);
}

app.get("/pedidos", (req, res) => {
  db.query("SELECT * FROM pedidos ORDER BY fecha DESC", (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

app.delete("/pedidos/:id", (req, res) => {
  db.query("DELETE FROM pedidos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// ═══════════════════════════════════════════════════════════════════
//  RESERVAS
// ═══════════════════════════════════════════════════════════════════

// Comprueba RF-03, RF-05 y las reglas de negocio de solapamiento
app.get("/reservas/disponibilidad", (req, res) => {
  const { fecha, hora, personas } = req.query;
  if (!fecha || !hora || !personas)
    return res.status(400).json({ disponible: false, mensaje: "Faltan parámetros." });

  // Regla: solo dentro del horario de apertura
  if (!horaEnRango(hora))
    return res.json({ disponible: false, mensaje: `Solo se aceptan reservas entre ${HORA_APERTURA} y ${HORA_CIERRE}.` });

  // Buscar reservas activas en esa fecha con solapamiento de INTERVALO_MIN
  db.query(
    `SELECT id_reserva FROM reservas
     WHERE fecha = ? AND estado = 'activa'
       AND ABS(TIMESTAMPDIFF(MINUTE, CONCAT(fecha,' ',hora), CONCAT(?,' ',?))) < ?`,
    [fecha, fecha, hora, INTERVALO_MIN],
    (err, result) => {
      if (err) return res.status(500).json({ disponible: false });
      if (result.length > 0)
        return res.json({ disponible: false, mensaje: `Ya hay una reserva cerca de esa hora. Prueba con otro horario.` });
      res.json({ disponible: true });
    }
  );
});

// ── POST /reservas ───────────────────────────────────────────────────────────
app.post("/reservas", async (req, res) => {
  const { id_cliente, nombre, email, telefono, fecha, hora, num_personas, notas, notificacionesActivas } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !telefono || !fecha || !hora || !num_personas)
    return res.status(400).json({ success: false, mensaje: "Faltan campos obligatorios." });

  if (!horaEnRango(hora))
    return res.status(400).json({ success: false, mensaje: `Reservas solo entre ${HORA_APERTURA} y ${HORA_CIERRE}.` });

  // Regla: un cliente solo puede tener una reserva activa por día (RF-05)
  db.query(
    "SELECT id_reserva FROM reservas WHERE id_cliente = ? AND fecha = ? AND estado = 'activa'",
    [id_cliente, fecha],
    (err, existing) => {
      if (err) return res.status(500).json({ success: false });
      if (existing.length > 0)
        return res.status(409).json({ success: false, mensaje: "Ya tienes una reserva activa para ese día." });

      // Comprobar solapamiento con otras reservas
      db.query(
        `SELECT id_reserva FROM reservas
         WHERE fecha = ? AND estado = 'activa'
           AND ABS(TIMESTAMPDIFF(MINUTE, CONCAT(fecha,' ',hora), CONCAT(?,' ',?))) < ?`,
        [fecha, fecha, hora, INTERVALO_MIN],
        (err2, solapadas) => {
          if (err2) return res.status(500).json({ success: false });
          if (solapadas.length > 0)
            return res.status(409).json({ success: false, mensaje: "Ese horario no está disponible. Prueba otra hora." });

          // Insertar reserva
          db.query(
            `INSERT INTO reservas (id_cliente, nombre, email, telefono, fecha, hora, num_personas, notas, estado)
             VALUES (?,?,?,?,?,?,?,?,'activa')`,
            [id_cliente || null, nombre, email, telefono, fecha, hora, num_personas, notas || null],
            async (err3, result) => {
              if (err3) return res.status(500).json({ success: false });
              const idReserva = result.insertId;

              // Email de confirmación
              if (notificacionesActivas) {
                try {
                  await enviarEmailReserva({ email, nombre, fecha, hora, numPersonas: num_personas, notas, idReserva });
                } catch (e) {
                  console.error("⚠️ Email reserva:", e.message);
                }
              }

              res.status(201).json({ success: true, idReserva });
            }
          );
        }
      );
    }
  );
});

// Para que el cliente vea sus propias reservas
app.get("/reservas", (req, res) => {
  const { id_cliente } = req.query;
  const query = id_cliente
    ? "SELECT * FROM reservas WHERE id_cliente = ? ORDER BY fecha DESC, hora DESC"
    : "SELECT * FROM reservas ORDER BY fecha DESC, hora DESC";
  const params = id_cliente ? [id_cliente] : [];

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

// Regla: cancelación con al menos 2 horas de antelación
app.put("/reservas/:id/cancelar", (req, res) => {
  const id = req.params.id;

  db.query("SELECT fecha, hora FROM reservas WHERE id_reserva = ?", [id], (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ success: false, mensaje: "Reserva no encontrada." });

    const reserva = result[0];
    const fechaHoraReserva = new Date(`${reserva.fecha.toISOString().split("T")[0]}T${reserva.hora}`);
    const ahora = new Date();
    const diferenciaHoras = (fechaHoraReserva - ahora) / (1000 * 60 * 60);

    if (diferenciaHoras < 2)
      return res.status(400).json({
        success: false,
        mensaje: "No se puede cancelar con menos de 2 horas de antelación.",
      });

    db.query(
      "UPDATE reservas SET estado = 'cancelada' WHERE id_reserva = ?",
      [id],
      (err2) => {
        if (err2) return res.status(500).json({ success: false });
        res.json({ success: true });
      }
    );
  });
});

// ═══════════════════════════════════════════════════════════════════
app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));