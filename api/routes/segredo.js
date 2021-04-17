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
    console.log('passou no post')
    console.log(req.body)
    if (req.body.segredo != undefined) {
        console.log(segredo)
      var segredo = req.body.segredo.trimLeft()

      segredo = segredo.substr(0, 264)
    
      const novo = {
        segredo: segredo,
        cor: colorir.cor(),
        dataAt: Date.now()
      }
  
      new Segredo(novo).save().then(
        res.json({ok: true})
      ).catch((erro) => {
        res.statusCode(200)
        res.json({ok: false})
      })
    } else {
      res.json({ok: false})
    }
  })

module.exports = rotas
