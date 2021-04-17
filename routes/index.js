const express = require("express")
const rotas = express.Router()
const mongoose = require("mongoose")
require("../models/Segredo")
const Segredo = mongoose.model("segredo")

const util = require('../utils/mensagem')
const colorir = require('../utils/cor')

//? usado para atualizar as cores
// const update = require('../utils/updateCor')

rotas.get("/atualizar", (req, res) => {
  // update.updateCor()
  res.send("atualizando ...")
})

rotas.get("/", (req, res) => {
  // updateCor()
  Segredo.find().limit(88).sort({ "dataAt": 'desc' }).then((segredos) => {
    res.render("index", { segredos: segredos, mensagem: util.mensagem() })
  }).catch((erro) => {
    res.send("erro ao buscar registro" + erro)
  })
})


rotas.post("/", (req, res) => {
  //if (req.body.segredo || typeof req.body.segredo != undefined || req.body.segredo != null){
  if (req.body.segredo != undefined) {

    console.log(req.body)
    var segredo = req.body.segredo.trimLeft()

    //corto a string para mao utrapassar o valor
    segredo = segredo.substr(0, 264)

    const novo = {
      segredo: segredo,
      cor: colorir.cor(),
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

module.exports = rotas