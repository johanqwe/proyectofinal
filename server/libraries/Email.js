const NodeMailer = require("nodemailer");
const Hogan = require("hogan.js");
const fs = require("fs");
const path = require("path");

class Email {
    constructor(){
        this.transport = NodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:"johan15pop@gmail.com",
                pass:"pepvqoybtgmotcbz"
            }
        });
    }
        enviarCorreo(correoElectronico, strApellidos, strNombre, strApellidoSegundo, strdireccion, numEdad){
            return new Promise((resolve, reject) =>{
                const template = fs.readFileSync(path.resolve(__dirname,"../assets/templatesHTML/template.html"), "utf-8")
                const templateCompiled = Hogan.compile(template)
                const html = templateCompiled.render({strNombre: strNombre, strApellidos: strApellidos, correoElectronico: correoElectronico, strApellidoSegundo: strApellidoSegundo, strdireccion: strdireccion, numEdad:numEdad})
    
                this.transport.sendMail({
                    from: '"UTMA" <johan15pop@gmail.com>',
                    to: correoElectronico,
                    subject: "correo eletronico prueba",
                    html:html
    
                }).then((response)=>{
                    resolve(response)
                }).catch((err)=>{
                    reject(err)
                })
            })

           
        }
    }

module.exports = new Email();