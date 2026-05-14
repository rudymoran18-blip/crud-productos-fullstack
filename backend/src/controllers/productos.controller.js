const Productos = require('../models/producto.model');


const getProductos = async (req, res) => {
    try {
        const productos = await Productos.findAll();
        
        if(!productos){
            return res.status(404).json({
                mensaje: 'No se encontraron Productos',
                productos: []
            })
        }
        return res.status(200).json({
            mensaje: 'Productos encontrados',
            productos
        })

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


const getProductoById = async (req, res) => {

    try {
        const {id} = req.params;
        const producto = await Productos.findByPk(id);
        if(!producto){
            return res.status(404).json({
                mensaje: 'Producto no encontrado',
                producto: null
            })
        }
        return res.status(200).json({
            mensaje: 'Producto encontrado',
            producto
        })
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

}


const createProducto = async (req, res) => {

    try {
        const {nombre, precio, descripcion, categoria} = req.body;
        console.log(req.body);
        const nuevoProducto = await Productos.create({
            nombre,
            precio,
            descripcion,
            categoria
        });
        console.log(nuevoProducto);
        return res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: nuevoProducto
        })
    
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


const updateProducto = async (req, res) => {
    try {
       const {id} = req.params;
        const {nombre, precio, descripcion, categoria} = req.body;
        const producto = await Productos.findByPk(id);
        if(!producto){
            return res.status(404).json({
                mensaje: 'Producto no encontrado',
                producto: null
            })
        }
        
        await producto.update({
            nombre:nombre ?? producto.nombre,
            precio:precio ?? producto.precio,
            descripcion:descripcion ?? producto.descripcion,
            categoria:categoria ?? producto.categoria
        });
        return res.status(200).json({
            mensaje: 'Producto actualizado exitosamente',
            producto
        })
        
    } catch (error) {
        
        res.status(500).json({ mensaje: error.message });
    }

}


const deleteProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await Productos.findByPk(id);
        if(!producto){
            return res.status(404).json({
                mensaje: 'Producto no encontrado',
                producto: null
            })
        }
        await producto.destroy();
        return res.status(200).json({
            mensaje: 'Producto eliminado exitosamente',
            producto
        })

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

}


module.exports = {
    getProductos,
    getProductoById,    
    createProducto,
    updateProducto,
    deleteProducto
}