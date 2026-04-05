import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import "./Login.css";

// ── Utilidades de seguridad ──────────────────────────────────────────────────

// Hash SHA-256 con Web Crypto API (nativa en navegadores modernos)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarPassword(password) {
  const errores = [];
  if (password.length < 8) errores.push("Mínimo 8 caracteres");
  if (!/[A-Z]/.test(password)) errores.push("Una mayúscula");
  if (!/[0-9]/.test(password)) errores.push("Un número");
  return errores;
}

function fuerzaPassword(pass) {
  if (!pass) return { nivel: 0, texto: "", color: "" };
  const errores = validarPassword(pass);
  if (errores.length >= 2) return { nivel: 1, texto: "Débil", color: "#e74c3c" };
  if (errores.length === 1) return { nivel: 2, texto: "Media", color: "#f39c12" };
  return { nivel: 3, texto: "Fuerte", color: "#2ecc71" };
}

// ── Componente ───────────────────────────────────────────────────────────────
function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setError("");

    if (bloqueadoHasta && Date.now() < bloqueadoHasta) {
      const seg = Math.ceil((bloqueadoHasta - Date.now()) / 1000);
      setError(`Demasiados intentos. Espera ${seg}s.`);
      return;
    }

    if (!loginData.email || !loginData.password) {
      setError("Rellena todos los campos.");
      return;
    }
    if (!validarEmail(loginData.email)) {
      setError("Email no válido.");
      return;
    }

    setCargando(true);
    try {
      const res = await fetch(
        `http://localhost:3000/usuarios?email=${encodeURIComponent(loginData.email.toLowerCase())}`
      );
      const usuarios = await res.json();

      if (usuarios.length === 0) throw new Error("Usuario no encontrado.");

      const usuario = usuarios[0];
      const hashIntroducido = await hashPassword(loginData.password);

      if (hashIntroducido !== usuario.passwordHash) {
        throw new Error("Contraseña incorrecta.");
      }

      // Guardar sesión sin datos sensibles
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        })
      );

      setIntentosFallidos(0);
      setBloqueadoHasta(null);
      login();
      navigate("/");
    } catch (err) {
      const nuevos = intentosFallidos + 1;
      setIntentosFallidos(nuevos);
      if (nuevos >= 5) {
        setBloqueadoHasta(Date.now() + 30_000);
        setError("Demasiados intentos. Bloqueado 30 segundos.");
        setIntentosFallidos(0);
      } else {
        setError(`${err.message} (intento ${nuevos}/5)`);
      }
    } finally {
      setCargando(false);
    }
  };

  // ── REGISTRO ───────────────────────────────────────────────────────────────
  const handleRegistro = async () => {
    setError("");
    setExito("");

    if (!regData.nombre || !regData.email || !regData.password || !regData.confirmar) {
      setError("Rellena todos los campos.");
      return;
    }
    if (!validarEmail(regData.email)) {
      setError("Email no válido.");
      return;
    }
    const erroresPass = validarPassword(regData.password);
    if (erroresPass.length > 0) {
      setError(erroresPass.join(" · "));
      return;
    }
    if (regData.password !== regData.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      // Verificar email duplicado
      const check = await fetch(
        `http://localhost:3000/usuarios?email=${encodeURIComponent(regData.email.toLowerCase())}`
      );
      const existentes = await check.json();
      if (existentes.length > 0) throw new Error("Este email ya está registrado.");

      const passwordHash = await hashPassword(regData.password);

      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: regData.nombre.trim(),
          email: regData.email.toLowerCase().trim(),
          passwordHash,
          rol: "cliente",
          creadoEn: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Error al guardar en la base de datos.");

      setExito("¡Cuenta creada! Redirigiendo...");
      setRegData({ nombre: "", email: "", password: "", confirmar: "" });
      setTimeout(() => {
        setModo("login");
        setExito("");
      }, 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") modo === "login" ? handleLogin() : handleRegistro();
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setError("");
    setExito("");
    setMostrarPass(false);
  };

  const fuerza = fuerzaPassword(regData.password);

  return (
    <div className="lb-bg">
      
      <div className="lb-orb lb-orb-1" />
      <div className="lb-orb lb-orb-2" />
      <div className="lb-orb lb-orb-3" />

      <div className="lb-card">
        <div className="lb-brand">
          <div className="lb-logo">🍽️</div>
          <h1 className="lb-title">Restaurante</h1>
          <p className="lb-sub">
            {modo === "login" ? "Bienvenido de nuevo" : "Únete a nosotros"}
          </p>
        </div>

        {/* Tabs */}
        <div className="lb-tabs">
          <button
            className={`lb-tab ${modo === "login" ? "lb-tab--active" : ""}`}
            onClick={() => cambiarModo("login")}
          >
            Entrar
          </button>
          <button
            className={`lb-tab ${modo === "registro" ? "lb-tab--active" : ""}`}
            onClick={() => cambiarModo("registro")}
          >
            Registrarse
          </button>
          <div className={`lb-tab-indicator ${modo === "registro" ? "lb-tab-indicator--right" : ""}`} />
        </div>

        {/* Alertas */}
        {error && (
          <div className="lb-alert lb-alert--error">
            <span>⚠️</span> {error}
          </div>
        )}
        {exito && (
          <div className="lb-alert lb-alert--success">
            <span>✅</span> {exito}
          </div>
        )}

        {/* ── FORM LOGIN ── */}
        {modo === "login" && (
          <div className="lb-form">
            <div className="lb-field">
              <label className="lb-label">Email</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">✉️</span>
                <input
                  className="lb-input"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="lb-field">
              <label className="lb-label">Contraseña</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">🔒</span>
                <input
                  className="lb-input"
                  type={mostrarPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="current-password"
                />
                <button
                  className="lb-eye"
                  type="button"
                  onClick={() => setMostrarPass(!mostrarPass)}
                  tabIndex={-1}
                >
                  {mostrarPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              className="lb-btn"
              onClick={handleLogin}
              disabled={cargando}
            >
              {cargando ? <span className="lb-spinner" /> : "Iniciar sesión"}
            </button>
          </div>
        )}

        {/* ── FORM REGISTRO ── */}
        {modo === "registro" && (
          <div className="lb-form">
            <div className="lb-field">
              <label className="lb-label">Nombre</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">👤</span>
                <input
                  className="lb-input"
                  type="text"
                  placeholder="Tu nombre"
                  value={regData.nombre}
                  onChange={(e) => setRegData({ ...regData, nombre: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="lb-field">
              <label className="lb-label">Email</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">✉️</span>
                <input
                  className="lb-input"
                  type="email"
                  placeholder="tu@email.com"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="lb-field">
              <label className="lb-label">Contraseña</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">🔒</span>
                <input
                  className="lb-input"
                  type={mostrarPass ? "text" : "password"}
                  placeholder="Mín. 8 caracteres"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="new-password"
                />
                <button
                  className="lb-eye"
                  type="button"
                  onClick={() => setMostrarPass(!mostrarPass)}
                  tabIndex={-1}
                >
                  {mostrarPass ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Barra de fuerza */}
              {regData.password && (
                <div className="lb-strength">
                  <div className="lb-strength-bar">
                    <div
                      className="lb-strength-fill"
                      style={{
                        width: `${(fuerza.nivel / 3) * 100}%`,
                        background: fuerza.color,
                      }}
                    />
                  </div>
                  <span style={{ color: fuerza.color }}>{fuerza.texto}</span>
                </div>
              )}
            </div>

            <div className="lb-field">
              <label className="lb-label">Repetir contraseña</label>
              <div className="lb-input-wrap">
                <span className="lb-input-icon">🔒</span>
                <input
                  className="lb-input"
                  type={mostrarPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={regData.confirmar}
                  onChange={(e) => setRegData({ ...regData, confirmar: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={cargando}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <p className="lb-hint">
              8+ caracteres · Una mayúscula · Un número
            </p>

            <button
              className="lb-btn"
              onClick={handleRegistro}
              disabled={cargando}
            >
              {cargando ? <span className="lb-spinner" /> : "Crear cuenta"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;