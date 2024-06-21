const express= require('express');
const router= express.Router();

const {homeProductos} = require('../controllers/product');


router.route('/').get(homeProductos);



module.exports = router; 
