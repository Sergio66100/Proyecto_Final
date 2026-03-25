const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let pedidos = [];

// LOGIN
app.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    if (usuario && password) {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

// CREAR PEDIDO
app.post("/pedidos", (req, res) => {
    pedidos.push(req.body);
    res.json(req.body);
});

// LISTAR PEDIDOS
app.get("/pedidos", (req, res) => {
    res.json(pedidos);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});

app.delete("/pedidos/:id", (req, res) => {
    const id = req.params.id;
    pedidos = pedidos.filter((p, index) => index != id);
    res.json({ success: true });
});

app.put("/pedidos/:id", (req, res) => {
    const id = req.params.id;
    pedidos[id] = req.body;
    res.json(pedidos[id]);
});