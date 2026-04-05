import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import Login from "./components/Login";
import Menu from "./components/Menu";
import Pago from "./components/Pago";

export const AppContext = createContext(null);
 
export function useApp() {
  return useContext(AppContext);
}
 
// ─── Ruta protegida ─────────────────────────────────────────────────────────
function RutaProtegida({ children }) {
  const { logueado } = useApp();
  return logueado ? children : <Navigate to="/login" replace />;
}
 
// ─── App ────────────────────────────────────────────────────────────────────
function App() {
  // Persistir sesión en localStorage
  const [logueado, setLogueado] = useState(
    () => localStorage.getItem("logueado") === "true"
  );
 
  // Estado global del pedido: se pasa entre Menu → Pago
  const [pedido, setPedido] = useState([]);
 
  const login = () => {
    setLogueado(true);
    localStorage.setItem("logueado", "true");
  };
 
  const logout = () => {
    setLogueado(false);
    setPedido([]);
    localStorage.removeItem("logueado");
  };
 
  return (
    <AppContext.Provider value={{ logueado, login, logout, pedido, setPedido }}>
      <BrowserRouter>
        <Routes>
          {/* Si ya está logueado, redirige al menú */}
          <Route
            path="/login"
            element={logueado ? <Navigate to="/" replace /> : <Login />}
          />
 
          {/* Rutas protegidas */}
          <Route path="/" element={
            <RutaProtegida><Menu /></RutaProtegida>
          } />
          <Route path="/pago" element={
            <RutaProtegida><Pago /></RutaProtegida>
          } />
 
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
 
export default App;