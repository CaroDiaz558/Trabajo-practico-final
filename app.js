//PAQUETES Y ARCHIVOS

const express= require('express');
require('dotenv').config();
const flash= require('connect-flash');
const connectDB= require('./config/connectDB');
const session = require('express-session');

const usersRouter= require('./routes/user');
const productRouter= require('./routes/product');
const homeRouter= require('./routes/home');


const app = express();

//MIDDLEWARE


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
    } else {
        req.user = null;
    }
    res.locals.user = req.user;
    next();
});

app.use(flash());
 
//Configuracion flash 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());



app.use('/usuarios', usersRouter);
app.use('/productos', productRouter);
app.use('/', homeRouter)


//Rutas GET


app.get('/about', (req, res) => {
    res.render('page/about')
});
app.get('/contact', (req, res) => {
    res.render('page/contact')
});

app.get('/contact/envio', (req, res)=>{
    res.render('page/envio')
})

app.post('/contact/envio', (req, res)=>{
    res.render('page/envio')
})


const iniciar = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
       
      

    }catch(error){
        console.log(error)
    }
}

iniciar();


//PUERTO
app.listen(process.env.PORT, ()=>{
    console.log('Puerto ejecutándose')
})
