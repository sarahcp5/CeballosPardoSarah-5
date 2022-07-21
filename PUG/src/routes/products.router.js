import { Router } from 'express';
import Contenedor from '../models/Contenedor.js';
 
const router = Router();
const file = "./files/productos.txt"
const productos = new Contenedor(file);
const mensaje = { error : 'Producto no encontrado.' };

router.get('/', (req, res) => {
    let listaProductos = productos.getAll();
    return res.json(listaProductos);
});

router.get('/:id', (req, res) => {
    let producto = productos.getById(req.params.id);
    if(producto != null) {
        return res.json(producto);
    }
    return res.json(mensaje);
});

router.post('/', (req, res) => {
    let idProducto = productos.save(req.body);
    let producto = productos.getById(idProducto)
    return res.json(producto);
});

router.put('/:id', (req, res) => {
    let producto = productos.getById(req.params.id);
    if(producto != null) {
        let producto = productos.updateById(req.params.id, req.body);
        return res.json(producto);
    }
    return res.json(mensaje);
});

router.delete('/:id', (req, res) => {
    let producto = productos.getById(req.params.id)
    if(producto != null) {
        productos.deleteById(req.params.id);
        return res.json({mensaje: `Se elimino el Objeto con el Id ${req.params.id}`});
    }
    return res.json(mensaje);
});

router.get('/productoRandom', (req, res) => {
    let listaProductos = productos.getAll();
    let posicion = parseInt(Math.random() * listaProductos.length);
    res.send(listaProductos[posicion]);
});

export default router;