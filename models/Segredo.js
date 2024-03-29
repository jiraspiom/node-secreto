
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var segredoSchema = new mongoose.Schema({
    segredo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    dataAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    urlImage: {
        type: String,
        required: true
    },
    coracao: {
        type: Number,
        required: false
    }
});

//Export the model
mongoose.model('segredo', segredoSchema);

