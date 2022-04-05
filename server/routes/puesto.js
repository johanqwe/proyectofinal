const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const puestoModel = require("../models/puesto");
const ObjectId = require("mongoose").Types.ObjectId;


//CONSULTA GLOBAL
router.get("/", (req, res) => {

    puestoModel.find()
        .then((puesto) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se han consutado los puestos exitosamente  ",
                cont: {
                    puesto
                }
            })
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al consultarlos puestos",
                cont: {
                    err
                }

            })
        });
})


//CONSULTA ESPECÍFICA
router.get("/:id", (req, res) => {

    const idPuesto = req.params.id;

    if (!ObjectId.isValid(idPuesto)) {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "El identificador del puesto no es válido"

        })
    }
    return res.status(200).json({
        "response": "Estas en el método GET del puesto",
        idPuesto
    })
});

router.post("/", (req, res) => {

    const puestoBody = req.body;
    const puesto = new puestoModel(puestoBody);

    puesto.save()
        .then((documento) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El puesto se registró exitosamente",
                cont: {
                    documento
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar registrar el puesto",
                cont: {
                    err: err.message
                }

            })
        });
})


router.put("/:id", (req, res) => {
    const puestoBody = req.body;
    const idPuesto = req.params.id

    puestoModel.findOneAndUpdate(idPuesto, puestoBody)
        .then((puesto) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El puesto se actualizo exitosamente",
                cont: {
                    puesto
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
    puestoModel.remove()
        .then((puesto) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "El puesto se elimino exitosamente",
                cont: {
                    puesto
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