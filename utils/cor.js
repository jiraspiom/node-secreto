exports.cor = () => {
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