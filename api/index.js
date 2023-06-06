const express = require("express")
const app = express()
const port = process.env.PORT || 3000;

const piadas = require("./src/piadas/piadas.json")

app.get("/piadas", (req, res) =>{
    return res.json(piadas)
})

app.listen(port, () => {
    console.log("server rodando")
})
