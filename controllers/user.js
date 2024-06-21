const User= require('../models/user');

const bcrypt= require('bcrypt')
const {
    check,
    validationResult,
    body
  } = require('express-validator');


const mostrarIngreso = (req, res)=>{
    res.render('page/login', {errors:[]});
}

const Ingreso = async (req, res) => {
    console.log('Ingreso al usuario');

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('page/login', { errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const users = await User.find();
        let usuarioLogueado = [];

        if (username && password) {
            usuarioLogueado = users.filter(user => user.username === username);
            if (usuarioLogueado.length > 0) {
               
                if (!bcrypt.compareSync(password, usuarioLogueado[0].password)) {
                    usuarioLogueado = [];
                }
            }
        }
        const user = { username: usuarioLogueado[0].username }; // Datos del usuario autenticado
        req.session.user = user;
        console.log(usuarioLogueado);

        if (usuarioLogueado.length === 0) {
            req.flash('error_msg', 'Nombre de usuario o contraseña incorrectos');
            return res.redirect('/usuarios/login');
           
        } else {
            
            req.session.loggedin = true; 
            req.session.username = usuarioLogueado[0].username;
            req.flash('success_msg', 'Ingreso exitoso');
            res.redirect('/');
       
        }
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al ingresar. ¿Ya te registrate?');
        res.redirect('/usuarios/login');
    }
}

const cerrarSesion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/usuarios/login');
    });
};


const mostrarRegistro = (req, res)=>{
    res.render('page/register', {errors:[]});
}



const Registro = async (req, res) => {
    
    let errors = validationResult(req);

   
    if (!errors.isEmpty()) {
        return res.render('page/register', { errors: errors.array() });
    }

   
    const { username, email, password, confirmPassword } = req.body;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        return res.render('page/register', { 
            errors: [{ msg: 'Las contraseñas no coinciden' }] 
        });
    }

    try {

        const existeUser = await User.findOne({ email });
        if (existeUser) {
            return res.render('page/register', {
                errors: [{ msg: 'El correo electrónico ya está registrado' }]
            });
        }
     
        const hashedPassword = bcrypt.hashSync(password, 10);

       
       const agregarUsuario= await User.insertMany({ username: username, email: email, password: hashedPassword });
      
        req.flash('success_msg', 'Registro exitoso. Ahora puedes iniciar sesión.');
        res.redirect('/usuarios/login');
        
    } catch (error) {
        console.error(error);
        // res.status(500).send('Error en el servidor');
        res.render('page/register', { error_msg: 'Error al registrar el usuario' });
    }
}



module.exports={
    mostrarIngreso,
    Ingreso, 
    Registro, 
    mostrarRegistro, 
    cerrarSesion
}