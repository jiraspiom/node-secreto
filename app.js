const express = require("express")
const app = express()
const rotas = require("./routes/index")
const rotaapi = require("./api/routes/segredo")
const bodyParser = require("body-parser")
require('dotenv').config()

//carregar a view engina
app.set('view engine', 'ejs') 

//statico
app.use(express.static('public'))

//bodyparse para trabalhar com html e json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const mongoose = require('mongoose')

//mongoose
mongoose.Promise = global.Promise;
//const connection = new mongoose.connect("mongodb://localhost:27017/Segredo", { useNewUrlParser: true }).then(() => {
mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true }).then(() => {
    console.log("Conectado ao MongoDB :D")
}).catch((erro) => {
    console.log("Erro ao conectar MongoDB - DESCRICAO DO ERRO: " + erro)
}) 


app.get("/about", (req, res)=>{
    //res.send("pode dizer qualquer coisa pois e gravado anomimamente, e não tem historico.")
    res.render("sobre isso ai")
})

app.use("/", rotas)
app.use("/api", rotaapi)

// const PORTA = process.env.PORT || 3001
// app.listen(PORTA, ()=>{
//     console.log("app rodando")
// })

module.exports = app;