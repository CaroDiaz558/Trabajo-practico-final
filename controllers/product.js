const Productos= require('../models/product');
  //PRODUCTOS
const obtenerTodosProductos = async (req, res)=>{
    const products= await Productos.find();
    const favorito = req.session.favorito || [];
    const favoriteProductIds = favorito.map(item => item.productId);
    console.log('Todo ok, busqueda realizada');
    res.render('page/shop', {products: products, favoriteProductIds:favoriteProductIds})
}

const detalleProducto = async (req, res) => {
    const productId = req.params.id;
    
    try {
        const producto = await Productos.findById(productId);
        const favorito = req.session.favorito || [];
        const favoriteProductIds = favorito.map(item => item.productId);
        
        const products = await Productos.find().limit(5);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('page/product', { producto: producto, products:products, favoriteProductIds:favoriteProductIds });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al mostrar el detalle del producto');
    }
};

//CARRITO
const agregarProductoCarrito = async (req, res) => {
  
  
    const productId = req.body.productId;
    
    let carrito = req.session.carrito || [];

    try {
        const producto = await Productos.findById(productId);

        if (!producto) {

            throw new Error('Producto no encontrado');
        }

        const productIndex = carrito.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            carrito[productIndex].cantidad += 1;
            carrito[productIndex].subtotal += producto.precio;
        } else {
            const nuevoProducto = { productId: productId, cantidad: 1, subtotal: producto.precio };
            carrito.push(nuevoProducto);
        }

        req.session.carrito = carrito;
       
        req.flash('success_msg', 'Producto agregado al carrito.');
        res.redirect('/productos/carrito');

    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        req.flash('error_msg', 'Error al agregar producto al carrito.');
        res.redirect('/productos');
    }
};




const quitarProductoCarrito = async (req, res) => {
    const productId = req.body.productId;
    let carrito = req.session.carrito || [];

    try {
        const producto = await Productos.findById(productId);
        console.log(producto.precio)
        if (!producto) {
            console.log('Producto no encontrado');
            req.flash('error_msg', 'Producto no encontrado');
            return res.redirect('/productos/carrito');
        }

        const productIndex = carrito.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            
            carrito[productIndex].cantidad -= 1;
            carrito[productIndex].subtotal -= producto.precio;

            if (carrito[productIndex].cantidad <= 0) {
                carrito.splice(productIndex, 1);
            }
        }

        req.session.carrito = carrito;
        console.log('Producto quitado del carrito.')
        req.flash('success_msg', 'Producto quitado del carrito.');
        res.redirect('/productos/carrito');
    } catch (error) {
        console.error('Error al quitar producto del carrito:', error.message);
        req.flash('error_msg', 'Error al quitar producto del carrito.');
        res.redirect('/productos');
    }

    
};

const verCarrito = async (req, res) => {
    const carrito = req.session.carrito || [];
    
    if (carrito.length === 0) {
        res.render('page/cart', { carrito: []  });
        return;
    }

    const productIds = carrito.map(item => item.productId);
    const productos = await Productos.find({ _id: { $in: productIds } });

    let total = 0;
    const carritoConProductos = carrito.map(item => {
        
        const product = productos.find(p => p._id.toString() === item.productId);

        total += item.subtotal;
        console.log(total)
        

        return {
            ...item,
            _id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen
        };
    });

    res.render('page/cart', { carrito: carritoConProductos, total: total});
};

const compraExitosa = (req, res) => {
    req.session.carrito = []; 
    console.log('Compra realizada con éxito.')
    // req.flash('success_msg', 'Compra realizada con éxito! Gracias por tu compra');
    res.render('page/exito');
};

const homeProductos= async(req, res)=>{
    try {
        const products = await Productos.find().limit(3);
        const pasteleria= await Productos.find({nombre: 'Lemon Pie'}).limit(1);
        
        const panaderia= await Productos.find({nombre: 'Pan Francés'}).limit(1);
       
        res.render('page/home', { products: products, pasteleria: pasteleria, panaderia:panaderia });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

//POR TIPO

const buscarPorTipoSalado = async (req, res) => {
    try {

        const products = await Productos.find({ tipo: 'panaderia' });
        res.render('page/panaderia', { products: products });
       

    } catch (error) {

        console.error('Error al obtener productos', error)
        res.status(500).json({ error: `Error al obtener productos por tipo ${tipo}` });
    }
}

const buscarPorTipoDulce = async (req, res) => {
    try {

        const products = await Productos.find({ tipo: 'pasteleria' });
        res.render('page/pasteleria', { products: products });
       

    } catch (error) {

        console.error('Error al obtener productos', error)
        res.status(500).json({ error: `Error al obtener productos por tipo ${tipo}` });
    }
}



//FAVORITOS

const verFavoritos = async (req, res) => {
    const favorito = req.session.favorito || [];
    
    if (favorito.length === 0) {
        res.render('page/favorite', { favorito: []  });
        return;
    }

    const productIds = favorito.map(item => item.productId);
    const productos = await Productos.find({ _id: { $in: productIds } });

    let total = 0;
    const favoritoConProductos = favorito.map(item => {
        
        const product = productos.find(p => p._id.toString() === item.productId);
        

        return {
            ...item,
            _id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen
        };
    });

    res.render('page/favorite', { favorito: favoritoConProductos});
};


const agregarProductoFavorito = async (req, res) => {
  
  
    const productId = req.body.productId;
    
    let favorito = req.session.favorito || [];

    try {
        const producto = await Productos.findById(productId);

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        const productIndex = favorito.findIndex(item => item.productId === productId);

        if (productIndex == -1) {

            const nuevoProducto = { productId: productId };

            favorito.push(nuevoProducto);
            req.session.favorito = favorito;
            req.flash('success_msg', 'Producto agregado a favoritos.');
            

        } else {

            req.flash('success_msg', 'Este producto ya está entre tus favoritos.');
            
        }

        res.redirect('/productos/favorito');

    } catch (error) {
        console.error('Error al agregar producto a favorito:', error.message);
        req.flash('error_msg', 'Error al agregar producto a favorito.');
        res.redirect('/productos');
    }
};



const quitarProductoFavorito = async (req, res) => {
    const productId = req.body.productId;
    let favorito = req.session.favorito || [];

    try {
        const producto = await Productos.findById(productId);
        if (!producto) {
            console.log('Producto no encontrado');
            req.flash('error_msg', 'Producto no encontrado');
            return res.redirect('/productos/favorito');
        }

        const productIndex = favorito.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            favorito.splice(productIndex, 1);
            req.session.favorito = favorito;
            req.flash('success_msg', 'Producto quitado de favoritos.');
            
        }else{
            req.flash('El Producto no está entre tus favoritos')
        }

        res.redirect('/productos/favorito');
    } catch (error) {
        console.error('Error al quitar producto de favoritos:', error.message);
        req.flash('error_msg', 'Error al quitar producto de favoritos.');
        res.redirect('/productos');
    }

    
};




module.exports={
    obtenerTodosProductos,
    detalleProducto, 
    verCarrito,
    agregarProductoCarrito,
    quitarProductoCarrito, 
    compraExitosa,
    homeProductos, 
    buscarPorTipoSalado,
    buscarPorTipoDulce,
    agregarProductoFavorito,
    verFavoritos,
    quitarProductoFavorito

}