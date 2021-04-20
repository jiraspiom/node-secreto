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
    res.status(200).json({ mensagem: util.mensagem(), results: segredos })
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
      res.status(201).json({ ok: true })
    ).catch((erro) => {
      res.json({ ok: false })
    })
  } else {
    res.json({ ok: false })
  }
})

rotas.put('/segredo/:id', (req, res) => {
  const _id = req.params.id;
  if (!_id) return res.json('segredo nao encontrado...')

  Segredo.findOne({_id: _id}).then((seg)=>{

    total = seg.coracao ? seg.coracao + 1 : 1

    Segredo.updateOne({ _id: seg._id }, { coracao: total }, (err) => {
      if (err) {
        console.log(`Error: ` + err)
      }
    });
  }).catch((erro)=>{
    console.log('ERRO O BUSCAR, OU NAO EXISTE O REGISTRO', erro)
  });

  res.json({id: _id })

})

//! funcionando
rotas.put('/segredo/:id', (req, res) => {
  const _id = req.params.id;

  if (!_id) return res.json('segredo nao encontrado...')

  //! COMENTADO PARA TESTAR
  // let total = 0;

  // Segredo.findOneAndUpdate({ _id: _id, }, { coracao: total, }, (err, doc) => {
  //   if (err) {
  //     console.log(`Error: ` + err)
  //   } else {
  //     console.log("ok")
  //   }
  // });
  res.json({ testado: 'oi', id: _id })
})


// 1.	!mdbfoau	
// 2.	!mdbuo
// 3.	!mdbum



// rotas.put('/segredos/:id', (req, res) => {
//   const _id = req.params.id;

//   if (!_id) return res.json('segredo nao encontrado...')

//   let coracao = 0;

//   const segredo = Segredo.updateOne({ _id: _id }, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//       res.json({ oi: 'ok' })
//       res.coracao = 1;
//       // if (segredo) {
//       //   console.log('tem registro')
//       //   coracao = segredo.coracao + 1;
//       //   Segredo.updateOne({ _id }, { $set: { coracao } })
//       // } else {
//       //   console.log("nao tem registro");
//       //   coracao = 1;
//       //   Segredo.insertOne({ _id, coracao })
//       // }
//     }
//   })
//   console.log(segredo);
//   // res.json({ok: 'oi' })

//   // if (segredo) {
//   //   coracao = segredo.coracao + 1;
//   //   Segredo.update({ _id: _id }, { $inc: { coracao: coracao } },
//   //     {},
//   //     (err, numberAffected) => {
//   //       res.json({ erro: err });
//   //     });
//   // } else {
//   //   coracao = 1;
//   //   Segredo.update({ _id: req.params.id }, { $inc: { coracao: coracao } }, {}, (err, numberAffected) => {
//   //     res.json({ criado: 'ok' });
//   //   });
//   // }

//   // const segredo = Segredo.findOne(_id)

//   // let coracao = 0;

//   // if (segredo) {
//   //   console.log('tem registro')
//   //   coracao = segredo.coracao + 1;
//   //   Segredo.collection("").updateOne({ _id }, { $set: { coracao } })
//   // } else {
//   //   console.log("nao tem registro");
//   //   coracao = 1;
//   //   Segredo.insertOne({ _id, coracao })
//   // }

//   // res.json({id: segredo})


//   // try {
//   //   const response = Segredo.findByIdAndUpdate(id, _id, {
//   //     new: true,
//   //     runValidators: true,
//   //   })
//   //   if (!response) {
//   //     return res.status(400).json({ success: false })
//   //   }
//   //   res.status(200).json({ success: true, data: response })
//   // } catch (error) {
//   //   res.status(400).json({ success: false })
//   // }



// })



module.exports = rotas
