exports.mensagem = () => {
    const cores = [
        "Vamos escrever alguma abobrinha aqui pessoal",
        "Pode escrever, não doi...",
        "Campo deve ser preenchido",
        "Assim não da né, escreva ai uai.",
        "Oxi, você não vai com minha cara, cade a mensaguem?",
        "Ops, esqueceu da mensaguem",
        "Parabens, só que você tem de escrever alguma coisa aqui.",
        "Faltou a mensaguem",
        "Não vou postar por que você não escreveu nada",
        "Mensagem aqui, please!",
        "Sem mensaguem não da pra postar",
        "Verdade, não minto, mas mensaguem deve ser escrita nesse campo."
    ]
    return cores[Math.floor(Math.random() * cores.length)]
}
