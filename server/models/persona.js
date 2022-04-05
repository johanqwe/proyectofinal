const mongoose = require("mongoose");

let personaSchema = new mongoose.Schema({

    strNombre: {
        type:String,
        required: [true,"es necesario meter el nombre de la persona"]

    },
    strPrimerApellido: {
        type:String,
        required: [true,"es necesario el primer apellido"]
    },
    strSegundoApellido: {
        type: String,
        required: [true, "en necesario el segundo nombre"]
    }

})

module.exports = mongoose.model("persona", personaSchema)