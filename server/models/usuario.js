const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usuarioSchema = new mongoose.Schema({
    strNombre:{
        type: String,
        required: [true, "especifica el nombre"]
    },
    strPrimerApellido:{
        type: String,
        required: [true, "especifica el primer apellido"]

    },
    strSegundoApellido:{
        type: String,
        required: [true, "especifica el segundo apellido"]

    },
    nmbEdad:{
        type: Number,
        required: [true, "especifica la edad"]

    },
    idPuesto:{
        type: Schema.Types.ObjectId, ref: 'puesto',
        required: [true, "especifica el puesto"]

    },
    strCorreo:{
        type: String,
        required: [true, "especifica el correo"]

    },
    stsPassword:{
        type: String,
        required: [true, "especifica una contraseña"]

    }
})
module.exports = mongoose.model("usuario", usuarioSchema)