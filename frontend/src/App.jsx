import { useState } from "react";
import Login from "./components/Login";
import Pedidos from "./components/Pedidos";

function App() {
    const [logueado, setLogueado] = useState(false);

    return (
        <div>
            {logueado ? <Pedidos /> : <Login setLogueado={setLogueado} />}
        </div>
    );
}

export default App;