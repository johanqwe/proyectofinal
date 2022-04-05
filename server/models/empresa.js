const mongoose = require("mongoose");

let empresaSchema = new mongoose.Schema({

strNombre:{
    type: String,
    required: [true, "coloca un nombre"]
},
strRazonSocial:{
    type: String,
    rrequired: [true, "coloca una razon"]
}

})

module.exports = mongoose.model("empresa", empresaSchema)