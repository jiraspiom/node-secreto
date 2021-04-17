
//Funcao para atualizar os campos que não estava colorido
exports.updateCor = () => {
  Segredo.find({ cor: undefined }).then((segredos) => {
    segredos.forEach(segredo => {
      segredo.cor = cor()
      segredo.save().then(() => {
        console.log("salvo com sucesso")
      }).catch((erro) => {
        console.log("erro ao salvar")
      })
    });
  })
}


