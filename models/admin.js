const mongoose= require('mongoose');

const adminEsquema= new mongoose.Schema({
    nombre_usuario: String,
    email: String,
    password: String,

});

const Administrador= mongoose.model('Administrador', adminEsquema);

module.exports= Administrador;