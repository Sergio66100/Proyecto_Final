# 🍔 Restaurante App - Sistema de Pedidos y Reservas

## 📄 Descripción

Aplicación web de restaurante tipo delivery desarrollada con React que permite a los usuarios realizar pedidos, reservar mesas y gestionar su experiencia dentro de la aplicación.

Incluye un flujo completo desde el login hasta el pago, además de notificaciones por correo para pedidos y reservas.

---

## 🛠️ Tecnologías utilizadas

**Frontend:**

* React (Vite)
* React Router DOM
* Bootstrap

**Backend:**

* Node.js + Express
* JSON Server (simulación de API)

**Otros:**

* JavaScript
* Fetch API (comunicación HTTP)
* Envío de emails (notificaciones)

---

## ⚙️ Requisitos previos

Para ejecutar este proyecto necesitas:

* Node.js (v18 o superior)
* npm
* Navegador web (Chrome recomendado)

---

## 📦 Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/Sergio66100/Proyecto_Final.git
```

### 2. Entrar en el proyecto

```bash
cd Proyecto_Final
```

### 3. Instalar backend

```bash
cd backend
npm install
```

### 4. Instalar frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Ejecución

### 1. Iniciar backend

```bash
cd backend
node server.js
```

### 2. Iniciar frontend

```bash
cd frontend
npm run dev
```

### 3. Abrir en navegador

```
http://localhost:5173
```

---

## ✅ Funcionalidades implementadas

### 🔐 Autenticación

* Login de usuario
* Registro
* Gestión de sesión
* Logout

### 🍽️ Menú y pedidos

* Carga dinámica de productos
* Agrupación por categorías
* Sistema de carrito:

  * Añadir productos
  * Modificar cantidades
  * Cálculo automático del total

### 🛒 Proceso de compra

* Modal de resumen del pedido
* Confirmación antes de pagar
* Pantalla de pago:

  * Pago con tarjeta (simulado)
  * Pago en efectivo (llamar camarero)

### 📅 Reservas

* Sistema de reserva de mesas
* Confirmación por correo electrónico

### 📧 Notificaciones

* Email al completar pedido
* Email al realizar reserva

### ⚙️ Configuración

* Cambio de tema (oscuro/claro)
* Activar/desactivar notificaciones
* Guardar nombre de usuario

---
<img width="1856" height="872" alt="Captura de pantalla 2026-04-05 043321" src="https://github.com/user-attachments/assets/e95aa38d-4c8b-4424-898a-dfb16cb91baf" />
<img width="1852" height="872" alt="Captura de pantalla 2026-04-05 043429" src="https://github.com/user-attachments/assets/e0e128ae-5fb5-43d3-b55a-6c2bb2671b31" />
<img width="1852" height="872" alt="Captura de pantalla 2026-04-05 043451" src="https://github.com/user-attachments/assets/8d766ff5-bf9f-4896-9f52-1ab73d814504" />
<img width="1853" height="876" alt="Captura de pantalla 2026-04-05 043510" src="https://github.com/user-attachments/assets/7e89e917-9404-457d-9364-297cdd7484c3" />
<img width="1857" height="873" alt="Captura de pantalla 2026-04-05 043528" src="https://github.com/user-attachments/assets/c394a6f3-68e9-40d2-af16-f58a89e2db31" />
<img width="1852" height="880" alt="Captura de pantalla 2026-04-05 043547" src="https://github.com/user-attachments/assets/c33328a1-185a-4cb4-bba3-ecdc510bab34" />
<img width="1531" height="763" alt="Captura de pantalla 2026-04-05 043630" src="https://github.com/user-attachments/assets/c2a3f6dd-43c1-4343-8e2b-224dce397302" />
<img width="1851" height="881" alt="Captura de pantalla 2026-04-05 043650" src="https://github.com/user-attachments/assets/c7464181-eac4-453f-a9e8-b3a3557a000e" />


## 🚧 Funcionalidades en desarrollo

* Mejora de experiencia de usuario (UI/UX)
* Optimización del flujo de pago

---

## 🔮 Funcionalidades futuras

* Historial de pedidos
* Panel de administración
* Estados del pedido (preparando, listo, entregado)
* Versión responsive (móvil)

---

## 🧠 Problemas técnicos destacados

* Error de navegación con React Router (pantalla en blanco)
* Error "Invalid hook call" por versiones incompatibles
* Problemas con Vite y plugins experimentales

---

## 👨‍💻 Autor

**Sergio**
2º DAM - Desarrollo de Aplicaciones Multiplataforma
