const mongoose= require('mongoose');

const usuariosEsquema= new mongoose.Schema({
    username: String,
    email: String,
    password: String,

});

const Usuarios= mongoose.model('Usuarios', usuariosEsquema);

module.exports= Usuarios;

