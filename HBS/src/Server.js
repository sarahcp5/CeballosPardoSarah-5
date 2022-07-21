import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productosRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("Error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(express.static(__dirname+'/public'))

app.engine(
    "handlebars",
    handlebars.engine()
);

app.set('views', './views');
app.set('view engine', 'handlebars');

app.use("/api/productos", productosRouter)
app.use("/", viewsRouter)

