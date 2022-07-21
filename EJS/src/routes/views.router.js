import { Router } from 'express';
import Contenedor from '../models/Contenedor.js';
 
const router = Router();
const file = "./files/productos.txt"
const productos = new Contenedor(file);

router.get("/", (req, res) => {
    res.render('indexForm');
});

router.get("/productos", (req, res) => {
    let productosAll = productos.getAll();
    res.render('indexList', {
        productos: productosAll
    });
});

router.post('/productos', (req, res) => {
    let idProducto = productos.save(req.body);
    return res.redirect('/');
});

export default router;