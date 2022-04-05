
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const empresaModel = require("../models/empresa");
const ObjectId = require("mongoose").Types.ObjectId;


//CONSULTA GLOBAL
router.get("/", (req, res) => {

    empresaModel.find()
        .then((empresa) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "las empresas se consultaron exitosamente  ",
                cont: {
                    empresa
                }
            })
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "no se pudo consultar las empresas",
                cont: {
                    err
                }

            })
        });
})


//CONSULTA ESPECÍFICA
router.get("/:id", (req, res) => {

    const idEmpresa = req.params.id;

    if (!ObjectId.isValid(idEmpresa)) {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: " la empresa no es válida"

        })
    }
    return res.status(200).json({
        "response": "Estas en GET de empresa",
        idEmpresa
    })
});

router.post("/", (req, res) => {

    const empresaBody = req.body;
    const empresa = new empresaModel(empresaBody);

    empresa.save()
        .then((documento) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "La empresa se registró de forma correcta",
                cont: {
                    documento
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar registrar la empresa",
                cont: {
                    err: err.message
                }

            })
        });
})


router.put("/:id", (req, res) => {
    const empresaBody = req.body;
    const idEmpresa = req.params.id

    empresaModel.findOneAndUpdate(idEmpresa, empresaBody)
        .then((empresa) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "La empresa se actualizo con los nuevos valores",
                cont: {
                    empresa
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar actualizar la información de la empresa",
                cont: {
                    err
                }

            });
        })
})

router.delete("/:id", (req, res) => {
    empresaModel.remove()
        .then((empresa) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "La empresa se eliminó"
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "Hubo un error al intentar eliminar la empresa",
                cont: {
                    err
                }

            })
        });
})

 
module.exports = router;