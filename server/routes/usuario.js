const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const usuarioModel = require("../models/usuario");
const ObjectId = require("mongoose").Types.ObjectId;


//CONSULTA GLOBAL
router.get("/", (req, res) => {

    usuarioModel.find()
        .then((usuarios) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se han consutado los usuarios exitosamente  ",
                cont: {
                    usuarios
                }
            })
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al consultarlos usuarios",
                cont: {
                    err
                }

            })
        });
})


//CONSULTA ESPECÍFICA
router.get("/:id", (req, res) => {

    const idUsuario = req.params.id;

    if (!ObjectId.isValid(idUsuario)) {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "El identificador del usuario no es válido"

        })
    }
    return res.status(200).json({
        "response": "Estas en el método GET de usuario",
        idUsuario
    })
});

router.post("/", (req, res) => {

    const usuarioBody = req.body;
    const usuario = new usuarioModel(usuarioBody);

    usuario.save()
        .then((documento) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El usuario se registró exitosamente",
                cont: {
                    documento
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar registrar al usuario",
                cont: {
                    err: err.message
                }

            })
        });
})


router.put("/:id", (req, res) => {
    const usuarioBody = req.body;
    const idUsuario = req.params.id

    usuarioModel.findOneAndUpdate(idUsuario, usuarioBody)
        .then((usuario) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El usuario se actualizo exitosamente",
                cont: {
                    usuario
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar actualizar la información del puesto",
                cont: {
                    err
                }

            });
        })
})

router.delete("/:id", (req, res) => {
    usuarioModel.remove()
        .then((usuario) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El usuario se elimino exitosamente",
                cont: {
                    usuario
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar eliminar el puesto",
                cont: {
                    err
                }

            })
        });
})

 
module.exports = router;