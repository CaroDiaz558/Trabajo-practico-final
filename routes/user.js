const express= require('express');
const User = require('../models/user')
const {mostrarIngreso, Ingreso, Registro, mostrarRegistro, cerrarSesion} = require('../controllers/user');


//Requiero el paquete expres-validator
const {
    check,
    body
    
} = require('express-validator');

const router= express.Router();

// //LOGIN



router.route('/login').post([
    check('username').notEmpty().withMessage('Debe completar el campo del usuario'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
], Ingreso);

router.route('/login').get(mostrarIngreso);


router.post('/registro', [
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
], Registro);

router.route('/registro').get(mostrarRegistro);

router.route('/logout').get(cerrarSesion)




module.exports=router