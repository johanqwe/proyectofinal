const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("./config/config")


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", require("./routes/index"));


mongoose.connect(process.env.DB_URL, ()=>{
    console.log("se conecto a al base de datos")
})
app.listen(process.env.PORT, ()=>{
    console.log("eschando desde el puerto 3000");
});

