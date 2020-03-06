const express = require("express")
const app = express()
const rotas = require("./rotas/index")
const bodyParser = require("body-parser")

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
//const connection = new mongoose.connect("mongodb://localhost:27017/BlogPress", { useNewUrlParser: true }).then(() => {
mongoose.connect("mongodb+srv://secret:5aZDkdleESSyO542@cluster0-zi8ww.gcp.mongodb.net/Secreto?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log("Conectado ao MongoDB :D")
}).catch((erro) => {
    console.log("Erro ao conectar MongoDB - DESCRICAO DO ERRO: " + erro)
}) 


app.get("/about", (req, res)=>{
    res.send("pode dizer qualquer coisa pois e gravado anomimamente, e não tem historico.")
})

app.use("/", rotas)
const PORTA = process.env.PORT || 3001
app.listen(PORTA, ()=>{
    console.log("app rodando")
})