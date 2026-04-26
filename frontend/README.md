# 🍔 Restaurante App — Sistema de Pedidos, Reservas e IA

> **Proyecto Intermodular · 2º DAM · Curso 2025/2026**
> Profesora: María Sierra Escalera Pérez

Aplicación web completa de restaurante tipo delivery desarrollada con React + Node.js + MySQL + Python.
Permite a los clientes registrarse, explorar el menú con recomendaciones inteligentes, realizar pedidos,
reservar mesas y recibir confirmaciones por correo electrónico.

---

## 🧰 Tecnologías utilizadas

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite | React 18.x, Vite 5.x |
| Routing | React Router DOM | 6.x |
| Estilos | Bootstrap | 5.x |
| Backend | Node.js + Express | Node 20.x, Express 4.x |
| Base de datos | MySQL (XAMPP) | 8.x |
| Email | Nodemailer | 6.x |
| IA / Recomendaciones | Python + scikit-learn | Python 3.11, sklearn 1.4 |
| Microservicio IA | Flask + Flask-CORS | Flask 3.x |
| Seguridad | Web Crypto API (SHA-256) | Nativa en navegadores |

---

## ⚙️ Requisitos previos

- **Node.js** v20 o superior + npm
- **Python** 3.11 o superior + pip
- **XAMPP** (MySQL + Apache) o MySQL standalone
- **Navegador** moderno (Chrome recomendado)
- Cuenta de **Gmail** con contraseña de aplicación habilitada

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sergio66100/Proyecto_Final.git
cd Proyecto_Final
```

### 2. Instalar dependencias del backend (Node.js)

```bash
cd backend
npm install
```

### 3. Instalar dependencias del microservicio Python

```bash
cd backend
pip install flask flask-cors scikit-learn pandas numpy mysql-connector-python
```

### 4. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 5. Configurar la base de datos

1. Abre **XAMPP** e inicia MySQL
2. Abre **phpMyAdmin** → crea la base de datos `restaurante`
3. Ejecuta los scripts SQL en este orden:

```
database/setup_usuarios.sql
database/setup_reservas.sql
```

### 6. Configurar credenciales de Gmail

En `backend/server.js`, edita estas líneas con tus datos:

```js
const EMAIL_RESTAURANTE  = "tu_email@gmail.com";
const EMAIL_APP_PASSWORD = "xxxx xxxx xxxx xxxx"; // contraseña de aplicación Google
```

> Para obtener una contraseña de aplicación:
> Google Account → Seguridad → Verificación en 2 pasos → Contraseñas de aplicación

---

## ▶️ Ejecución

Necesitas **3 terminales** abiertas simultáneamente:

### Terminal 1 — Backend Node.js

```bash
cd backend
node server.js
# → http://localhost:3000
```

### Terminal 2 — Microservicio Python (IA)

```bash
cd backend
python microservicio_recomendaciones.py
# → http://localhost:5001
```

> Opcional pero recomendado. Si no está corriendo, la app funciona sin recomendaciones.

### Terminal 3 — Frontend React

```bash
cd frontend
npm run dev
# → http://localhost:5173
```

---

## 🔑 Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@restaurante.com | admin123A |
| Cliente | cliente@test.com | Test1234 |

> Las contraseñas se almacenan con SHA-256. Nunca en texto plano.

---

## ✅ Funcionalidades implementadas

### 🔐 Autenticación y seguridad
- [x] Registro de usuario con validación de email y contraseña segura
- [x] Contraseñas hasheadas con SHA-256 (Web Crypto API)
- [x] Bloqueo temporal tras 5 intentos fallidos de login (30 segundos)
- [x] Indicador visual de fuerza de contraseña
- [x] Sesión persistente en localStorage
- [x] Rutas protegidas (no accesible sin login)
- [x] Logout con limpieza de sesión

### 🍽️ Menú y productos
- [x] Carga dinámica de productos desde MySQL
- [x] Agrupación por categorías con scroll automático
- [x] Tarjetas de producto con imagen, nombre y precio
- [x] Controles de cantidad integrados en la tarjeta

### 🤖 Recomendaciones con IA
- [x] Sección **"Lo más pedido"** basada en frecuencia real de pedidos
- [x] Sección **"Clientes que compraron esto también pidieron…"** (filtrado colaborativo ítem-ítem)
- [x] Modelo scikit-learn con similitud coseno
- [x] Reentrenamiento automático tras cada pedido y cada 10 minutos
- [x] Datos sintéticos para arranque en frío (script incluido)
- [x] Fallback silencioso si el microservicio no está disponible

### 🛒 Carrito y pedidos
- [x] Añadir / quitar productos con actualización en tiempo real
- [x] Cálculo dinámico del total
- [x] Modal de resumen antes de confirmar
- [x] Guardado del pedido en MySQL al pagar
- [x] Pantalla de confirmación con método de pago

### 💳 Pago
- [x] Pago con tarjeta (simulado)
- [x] Pago en efectivo (llamar camarero)
- [x] Pantalla de confirmación con resumen del pedido pagado

### 📅 Reservas
- [x] Modal de reserva desde el sidebar
- [x] Campos: nombre, teléfono, fecha, hora, personas, notas
- [x] Validación de horario (12:00–23:00)
- [x] Restricción: una reserva activa por cliente por día
- [x] Intervalo mínimo de 15 minutos entre reservas
- [x] Cancelación solo con ≥2 horas de antelación

### 📧 Notificaciones por email
- [x] Email de confirmación de pedido al cliente y al restaurante
- [x] Email de confirmación de reserva al cliente y al restaurante
- [x] Plantillas HTML profesionales con diseño responsive
- [x] Activación/desactivación desde el sidebar

### ⚙️ Configuración y UX
- [x] Tema oscuro / claro con persistencia
- [x] Nombre de usuario personalizable
- [x] Skeleton loader en sección de recomendaciones
- [x] Feedback visual en todos los formularios (errores, éxito, cargando)
- [x] Tecla Enter funcional en login y registro

---

## 🚧 Funcionalidades pendientes

- [ ] Historial de pedidos para el cliente
- [ ] Panel de administración (gestión de productos y pedidos)
- [ ] Estados del pedido en tiempo real (preparando → listo → entregado)
- [ ] Versión responsive completa para móvil
- [ ] Recuperación de contraseña por email
- [ ] Paginación en el historial de pedidos

---

## ⚠️ Problemas conocidos

| Problema | Estado | Descripción |
|----------|--------|-------------|
| Imágenes en recomendaciones IA | ✅ Resuelto | El microservicio omitía el campo `imagen` en la query SQL |
| Email no llegaba al pagar | ✅ Resuelto | Faltaba configurar contraseña de aplicación Gmail |
| Error `Invalid hook call` | ✅ Resuelto | Versiones incompatibles de React; fijadas en package.json |
| React Router pantalla en blanco | ✅ Resuelto | Faltaba `<BrowserRouter>` en el nivel correcto |
| `node-fetch` ESM vs CJS | ✅ Resuelto | Usar `node-fetch@2` para compatibilidad con CommonJS |

---

## 📸 Capturas de pantalla

<img width="1856" alt="Login" src="https://github.com/user-attachments/assets/e95aa38d-4c8b-4424-898a-dfb16cb91baf" />
<img width="1852" alt="Menú principal" src="https://github.com/user-attachments/assets/e0e128ae-5fb5-43d3-b55a-6c2bb2671b31" />
<img width="1852" alt="Carrito y pedido" src="https://github.com/user-attachments/assets/8d766ff5-bf9f-4896-9f52-1ab73d814504" />
<img width="1853" alt="Modal resumen" src="https://github.com/user-attachments/assets/7e89e917-9404-457d-9364-297cdd7484c3" />
<img width="1857" alt="Pantalla de pago" src="https://github.com/user-attachments/assets/c394a6f3-68e9-40d2-af16-f58a89e2db31" />
<img width="1852" alt="Modal reserva" src="https://github.com/user-attachments/assets/c33328a1-185a-4cb4-bba3-ecdc510bab34" />
<img width="1531" alt="Recomendaciones IA" src="https://github.com/user-attachments/assets/c2a3f6dd-43c1-4343-8e2b-224dce397302" />
<img width="1851" alt="Email confirmación" src="https://github.com/user-attachments/assets/c7464181-eac4-453f-a9e8-b3a3557a000e" />

---

## 📁 Estructura del proyecto

```
Proyecto_Final/
├── backend/
│   ├── server.js                          # API REST principal (Node.js + Express)
│   ├── microservicio_recomendaciones.py   # Microservicio IA (Flask + scikit-learn)
│   ├── generar_datos_sinteticos.py        # Script de datos de prueba para IA
│   └── package.json
├── frontend/
│   └── src/
│       ├── App.jsx                        # Contexto global + rutas
│       └── components/
│           ├── Login.jsx                  # Login + Registro
│           ├── Login.css
│           ├── Menu.jsx                   # Menú, carrito, sidebar, modales
│           └── Pago.jsx                   # Pantalla de pago
├── database/
│   ├── setup_usuarios.sql
│   └── setup_reservas.sql
└── README.md
```

---

## 👨‍💻 Autor

**Sergio Gómez**
2º DAM — Desarrollo de Aplicaciones Multiplataforma
GitHub: [@Sergio66100](https://github.com/Sergio66100)
