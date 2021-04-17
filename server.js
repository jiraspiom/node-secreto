const app = require('./app')
const PORTA = 3001

app.listen(PORTA, ()=> { 
    console.log(`A magica acontece na porta ${PORTA}`); 
})