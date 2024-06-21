const mongoose= require('mongoose');

const productosEsquema = new mongoose.Schema({
    
    id: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
    tipo: String
        
    }
);

const Productos= mongoose.model('Productos', productosEsquema);

module.exports= Productos;
