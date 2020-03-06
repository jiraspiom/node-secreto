const express = require("express")
const rotas = express.Router()
const mongoose = require("mongoose")
require("../models/Segredo")
const Segredo = mongoose.model("segredo")

rotas.get("/", (req, res) => {
   // updateCor()
    Segredo.find().limit(88).sort({ "dataAt": 'desc' }).then((segredos) => {
        res.render("index", { segredos: segredos })
    }).catch((erro) => {
        res.send("erro ao buscar registro" + erro)
    })
})
rotas.post("/", (req, res) => {
    if (req.body.segredo != undefined) {
        const novo = {
            segredo: req.body.segredo,
            cor: cor(),
            dataAt: Date.now()
        }

        new Segredo(novo).save().then(
            res.redirect("/")
        ).catch((erro) => {
            res.redirect("/")
        })
    } else {
        res.redirect("/")
    }
})

function cor() {
    const cores = [
        "blue-grey",
        "blue darken-1",
        "teal darken-1",
        "teal darken-1",
        "lime darken-2",
        "orange darken-1",
        "grey darken-1",
        "blue-grey darken-1",
        "purple darken-1",
        "pink darken-1",
        "light-blue darken-1",
        "yellow darken-2"
    ]
    return cores[Math.floor(Math.random() * cores.length)]
}

//Funcao para atualizar os campos que não estava colorido
function updateCor(){
    Segredo.find({cor: undefined}).then((segredos)=>{
        segredos.forEach(segredo => {
            segredo.cor = cor()
            segredo.save().then(()=>{
                console.log("salvo com sucesso")
            }).catch((erro)=>{
                console.log("erro ao salvar")
            })

        });
    })
}

module.exports = rotas