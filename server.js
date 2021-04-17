const app = require('./app')
const PORTA = process.env.PORT || 3001

app.listen(PORTA, ()=> { 
    console.log(`A magica acontece na porta ${PORTA}`); 
})