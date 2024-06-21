const express= require('express');
const { Authenticated }= require('../middleware/middleware')

const router= express.Router();

const {obtenerTodosProductos,
      detalleProducto, 
      agregarProductoCarrito,
      quitarProductoCarrito, 
      verCarrito, 
      compraExitosa,
      buscarPorTipoDulce,
      buscarPorTipoSalado,
      homeProductos} = require('../controllers/product');


//Shop
router.route('/shop').get(obtenerTodosProductos);
router.route('/shop/:id').get(detalleProducto);

//Carrito
router.route('/carrito/agregar').post( Authenticated,agregarProductoCarrito);
router.route('/carrito/quitar').post(Authenticated, quitarProductoCarrito);
router.route('/carrito').get(Authenticated, verCarrito);
router.route('/carrito/exito').post(Authenticated, compraExitosa);


//POR TIPO
router.route('/pasteleria').get(buscarPorTipoDulce);
router.route('/panaderia').get(buscarPorTipoSalado);










module.exports= router;