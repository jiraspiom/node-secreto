const express = require("express")
const rotas = express.Router()
const mongoose = require("mongoose")
var cors = require('cors')

rotas.use(cors())

require('../../models/Segredo')
const Segredo = mongoose.model("segredo")

const util = require('../../utils/mensagem')
const colorir = require('../../utils/cor')

rotas.get('/', (req, res) => {
    res.json({ resposta: "oi..." });
})

rotas.get("/segredo", (req, res) => {
    Segredo.find().limit(88).sort({ "dataAt": 'desc' }).then((segredos) => {
        res.json({ mensagem: util.mensagem(), results: segredos })
    }).catch((erro) => {
        console.log('saiu')
        res.send("erro ao buscar registro: " + erro)
    })
})

rotas.post("/segredo", (req, res) => {

    if (req.body.segredo != undefined) {
      var segredo = req.body.segredo.trimLeft()

      segredo = segredo.substr(0, 264)
      url = req.body.urlImage ? req.body.urlImage : "www"
    
      const novo = {
        segredo: segredo,
        cor: colorir.cor(),
        dataAt: Date.now(),
        urlImage: url
      }
     console.log(novo)
  
      new Segredo(novo).save().then(
        res.json({ok: true})
      ).catch((erro) => {
        res.json({ok: false})
      })
    } else {
      res.json({ok: false})
    }
  })

module.exports = rotas
