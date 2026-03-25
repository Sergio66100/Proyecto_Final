import { useState } from "react";

function CrearPedido({ actualizar }) {
    const [producto, setProducto] = useState("");

    const crear = async () => {
        await fetch("http://localhost:3000/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ producto }),
        });

        actualizar();
    };

    return (
        <div>
            <h3>Nuevo Pedido</h3>
            <input onChange={(e) => setProducto(e.target.value)} />
            <button onClick={crear}>Crear</button>
        </div>
    );
}

export default CrearPedido;