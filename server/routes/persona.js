const express = require("express");
const router = express.Router();
const PersonaModel = require("../models/persona");
const ObjectId = require("mongoose").Types.ObjectId;
const Email = require("../libraries/Email");
const { response } = require("express");
const { enviarCorreo } = require("../libraries/Email");

//CONSULTA GLOBAL
router.get("/", (req, res) => {

  PersonaModel.find()
  .then((persona) => {
    return res.status(200).json({
        ok: true,
        status: 200,
        msg: "la persona se encontro exitosamente",
        cont: {persona}
    })
})
    .catch((err)=>{
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "la persona no ha sido encontrada",
            cont:{err}

        })
    })
  
  
    
});
//CONSULTA ESPECIFICA
router.get("/:id", (req, res) => {

    const idPersona = req.params.id;
    
    if(!ObjectId.isValid(idPersona)){
        return res.status(400).json({
            ok:jalse,
            status: 400,
            msg: "tu busqueda especifica no fue encontrada"
        })

    }

    return res.status(200).json({
        "response":"estas en el metodo GET de persona",
        idPersona

    })
});

router.post("/", (req, res)=>{

    
    const personaBody = req.body;
    const persona = new PersonaModel(personaBody);
    
    persona.save()
   
    .then((documento) =>{ 
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "la persona se registro exitosamente",
            cont: {documento}
        });
    })
    .catch((err) =>{
        return res.status(200).json({
            ok: false,
            status: 400,
            msg: "hubo un error al intentar registrar al usuario",
            cont: {
                err
            }
        })
    })
    

    
});

router.put("/:id", (req, res)=>{

    const personaBody= req.body;
    const idPersona = req.params.id;
    
    PersonaModel.findByIdAndUpdate(idPersona, personaBody)
    .then((persona) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha modificado correctamente",
            cont:{
                persona
            }       
    })
        })
    .catch((err) => {
        return res.status(400).json({
         ok: false,
         status:(400),
         msg:"Hubo un error al momento de modificar",
         cont:{
             err
         }
        })
    })
});

router.delete("/:id", (req, res)=>{

        PersonaModel.remove({_id:req.params.id})
       
        .then((documento) =>{ 
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "la persona se elimino exitosamente",
            });
        })
        .catch((err) =>{
            return res.status(200).json({
                ok: false,
                status: 400,
                msg: "hubo un error al intentar eliminar al usuario",
                cont: {
                    err
                }
            })
        })
    })

router.post("/enviarCorreo", (req, res) => {
let{correoElectronico, strNombre, strApellidos, strApellidoSegundo, strdireccion, numEdad} = req.body;
Email.enviarCorreo(correoElectronico, strApellidos,strNombre,  strApellidoSegundo, strdireccion, numEdad  )
.then((responseCorreo)=>{
    res.status(200).json({
        ok: true,
        status: 200,
        msg: "se envio el correo de forma correcta",
        cont: {
            responseCorreo
        }
    })

}).catch((err) =>{
    res.status(500).json({
        ok: false,
        status:500,
        msg: "no se envio el correo de forma correcta",
        cont:{
            err:err.message
        }
    })
})
})

module.exports = router;