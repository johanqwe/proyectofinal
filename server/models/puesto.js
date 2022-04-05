const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let puestoSchema = new mongoose.Schema({
    idEmpresa:{
        type: Schema.Types.ObjectId, ref:'empresa',
        required: [true, "id de la empresa"]
    },
    strNombre:{
        type: String,
        rrequired: [true, "coloca nombre"]
    }
    
    })


module.exports = mongoose.model("puesto", puestoSchema)