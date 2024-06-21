const connectDB= require('./config/connectDB');

const Productos= require('./models/product');
const Usuarios= require('./models/user');
const Administrador= require('./models/admin');

const productJson=require('./datos.json');

require('dotenv').config();

const iniciar= async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        
        await Productos.create(productJson);
        await Usuarios.create();
        await Administrador.create();

    }catch(error){
        console.log(error) 
    }
}

iniciar();