import { useState } from "react";
import "./Login.css";

function Login({ setLogueado }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, password }),
        });

        const data = await res.json();

        if (data.success) {
            setLogueado(true);
        } else {
            alert("Error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>🍔 Delivery App</h2>

                <input
                    placeholder="Usuario"
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;