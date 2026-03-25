import { useEffect, useState } from "react";
import CrearPedido from "./CrearPedido";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevoTexto, setNuevoTexto] = useState("");

    const cargar = async () => {
        const res = await fetch("http://localhost:3000/pedidos");
        const data = await res.json();
        setPedidos(data);
    };

    useEffect(() => {
        cargar();
    }, []);

    const eliminar = async (id) => {
        await fetch(`http://localhost:3000/pedidos/${id}`, {
            method: "DELETE",
        });
        cargar();
    };

    const editar = async (id) => {
        await fetch(`http://localhost:3000/pedidos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ producto: nuevoTexto }),
        });

        setEditando(null);
        setNuevoTexto("");
        cargar();
    };

    return (
        <div>
            <h2>📋 Pedidos</h2>

            <CrearPedido actualizar={cargar} />

            <ul>
                {pedidos.map((p, i) => (
                    <li key={i}>
                        {editando === i ? (
                            <>
                                <input onChange={(e) => setNuevoTexto(e.target.value)} />
                                <button onClick={() => editar(i)}>Guardar</button>
                            </>
                        ) : (
                            <>
                                {p.producto}
                                <button onClick={() => setEditando(i)}>Editar</button>
                                <button onClick={() => eliminar(i)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pedidos;