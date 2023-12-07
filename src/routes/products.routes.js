import express, { Router } from 'express';
const app = express();
// Importamos e inicializamos Router
const productRouter = express.Router();
// Declaramos el puerto
const port = 8080;
// Importamos e inicializamos la class productManager
import { productManager } from '../index.js';
import { Product } from '../dao/models/products.model.js';

app.use(express.urlencoded({ extended: true }));


//ENDPOINTS

// Defino el endpoint /products que lee el archivo de productos y devuelve los productos dentro de un objeto
productRouter.get("/", async (req, res) => {
    try {
        const productos = productManager.getProductsFromFiles();
        res.json(productos);
    } catch (err) {
        res.status(500).send("Error al leer el archivo");
    }
 });

 // Ruta '/products' con soporte para query param ?limit=
 productRouter.get("/params/", async (req, res) => { 
    const { limit } = req.query;
    try {
        const productos = productManager.getProductsFromFiles();
        if (limit) {
            const limite = parseInt(limit, 10);
            const productosLimitados = productos.slice(0, limite);
            res.json(productosLimitados);
        } else {
            res.json(productos);
        }
    } catch (err) {
        res.status(500).send("Error al leer el archivo");
    }
 });
 
 // Ruta '/products/:pid' para obtener un producto por su ID
 productRouter.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
        const producto = productManager.getProductById(pid);
        if (producto) {
            res.status(201).send(producto);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (err) {
        res.status(500).send("Error al buscar el producto");
    }
 });

//  Hardcodeo un producto para luego hacer el push en el metodo post y sumarlo al array de productos que se encuentra en el products.json
 let newProduct = {
    title: 'productoDePrueba',
    description: 'Este producto es usado como prueba del metodo post',
    code: 'codigoDePrueba',
    price: 1000,
    status: true,
    stock: 1,
    category: 'prueba',
    thumbnails: []
 }

function generarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
   }

// Endpoint con el metodo post para meter un nuevo producto en el array de products 
 productRouter.post('/add', (req, res) => {
    newProduct = req.body;
    if(newProduct && newProduct.ValidProduct()){
        newProduct.id = generarId();
        productManager.addProduct(newProduct);
        res.status(201).json(newProduct);
    } else {
        res.status(404).send("Error al añadir el producto");
    }
 });

// Endpoint para actualizar producto segun su ID
 productRouter.put('/:pid/update', (req, res) => {
    const pid = req.params.pid;
    const updatedProductData = req.body;
    const updatedProduct = productManager.updateProductById(pid, updatedProductData);
   
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send("Producto no encontrado");
    }
   });

//  Endpoint para borrar producto segun su id
 productRouter.delete('/:pid/delete', (req, res) => {
    const pid = req.params.pid;
    const deletedProduct = productManager.deleteProductById(pid);

    if(deletedProduct){
        res.send({status: "Operacion realizada con exito", message: "Producto borrado"})
    } else{
        return res.status(404).send({status: "Error", error: "Producto no encontrado"})
    }
 });

 app.listen(port, () => {
    console.log(`El servidor está escuchando por el puerto ${port}`);
 });


export { productRouter };