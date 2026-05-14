const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto} = require('../controllers/productos.controller');
const express = require('express')
const router = express.Router();


router.get('/', getProductos);
router.post('/', createProducto);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
module.exports = router;