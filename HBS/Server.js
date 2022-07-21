const express = require('express');
const Contenedor = require('./Contenedor.js');
const { Router } = express;
const handlebars = require('express-handlebars');

const app = express();
const router = Router();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("Error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended : true }))

app.engine(
    "handlebars",
    handlebars.engine()
);

app.set('views', './views');
app.set('view engine', 'handlebars');

const productos = new Contenedor("productos.txt");
const mensaje = { error : 'Producto no encontrado.' };

app.use("/api/productos", router)

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
    return res.redirect('/listadoProductos');
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

app.get("/", (req, res) => {
    res.render('indexForm');
});

app.get("/listadoProductos", (req, res) => {
    let productosAll = productos.getAll();
    res.render('indexList', {
        productos: productosAll
    });
});