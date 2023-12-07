import fs from "fs"
import {JSON} from 'stream/consumers';

class ProductManager {
    constructor () {
        this.id = 0;
        this.products = [];
        this.path = "products.json"
    }

    addProduct(product){
        if(!this.productFind(product.code) && product.ValidProduct()){
            this.id = this.id + 1;
            this.products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
        } else {
            console.log(`El producto ${product.title} ya fue ingresado a la lista de productos.`)
        }
    }

    getProductsFromFiles() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const array = JSON.parse(data);
            console.log("Estos items ya están cargados en el sistema");
            for (let i = 0; i < array.length; i++) {
                const currentProduct = array[i];
                console.log(`Item ${i + 1}`);
                for (const key in currentProduct) {
                    console.log(`${key}: ${currentProduct[key]}`);
                }
            }
            return array;
        } catch (error) {
            return 'No puedo ver el archivo';
        }
      }
      
    updateProductById(id,new_product){
        
        const data =fs.readFileSync(this.path,'utf-8');
        const prods =JSON.parse(data);
        const index =prods.findIndex(x =>{return x.code === id});

        if(index<0){
            return console.log(`\nNo se ha podido actualizar el id: ${id} \nItem no encontrado\n`)
        }else{
        const product =prods[index];
        
        for(const new_key in new_product){
            if(product[new_key] !== undefined){
                product[new_key]= new_product[new_key] ;
            }
            else{
                console.log(`\nLa key : {${new_key}} no es parte de la direccion por esto no es posible actualizar.`)
            }
        }
        this.products[index]=product;
        fs.writeFileSync(this.path,JSON.stringify(this.products),'utf-8');
        }
    }

    deleteProductById(id){
        const data =fs.readFileSync(this.path,'utf-8');
        const prods =JSON.parse(data);
        const index =prods.findIndex(x =>{return x.code ===id});

        if(index<0){
            return console.log(`\nEl item con el id: ${id} no fue encontrado y no puede borrarse\n`);
        }else{
            console.log("Advertencia sobre eliminar un elemento ya que esto no se puede deshacer");
            this.products.splice(index,1);
            
            fs.writeFileSync(this.path,JSON.stringify(this.products),'utf-8');
          
            console.log(". . . . * BORRADO");
            }
        }

    getProductById(id){
        const data = fs.readFileSync(this.path,'utf-8');
        const prods = JSON.parse(data);
        const product_index = prods.findIndex(x =>{ return x.code === id });
      
        if(!product_index){
            return console.log(`\nEl item con el id: ${id} no fue encontrado`);
        }else{
            console.log(`\nEl item con el id: ${id}`);
            console.log(prods[product_index]);
            
        }
    }

    getProductsByCode(code) {
        return this.products.find((element) => element.code == code);
    } 

    productFind(code){
        return this.getProductsByCode(code) != undefined;
    }
}

// Aqui instanciamos la class ProductManager
const productManager = new ProductManager();

// La class Product es utilizada para simular unos productos y poder probar que funciona la clase y los metodos de ProductManager, ademas de definir
//los campos que debe de tener cada producto y poder luego realizar la validacion de los mismos.
class Product {
    constructor(title, description, price, thumbnail, code, stock, category, status) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.status = status
    }

    ValidProduct(){
        return(
            this.title &&
            this.description &&
            this.price &&
            this.thumbnail &&
            this.code &&
            this.stock &&
            this.category && 
            this.status
        )
    }
}

// Aqui instanciamos los productos que van a ser usados como simulacion para probar la class anterior
const producto1 = new Product('Celular Samsung', 'Celular Alta gama', '2000', 'samsung.img', 'code1', 8, "celular", true );
const producto2 = new Product('Celular Xiaomi', 'Celular Alta gama', '2500', 'xiaomi.img', 'code2', 10, "celular", true);
const producto3 = new Product('Celular Apple', 'Celular Alta gama', '3000', 'iphone.img', 'code3', 10, "celular", true);
const producto4 = new Product("Celular BlackBerry", "Celular Baja Gama", "1000", "blackberry.img", "code4", 4, "celular", true);

// console.log("--------------------ITEM LIST------------------")
// productManager.getProductsFromFiles();

// console.log("---------------ITEM POR ID----------------")
// productManager.getProductById(2);

// Probamos meter productos en el array products 
// productManager.addProduct(producto1);
// productManager.addProduct(producto2);
// productManager.addProduct(producto3);

// const item_update ={
//     "title": "Item de prueba",
//     "description": "item de prueba",
//     "price": "242424",
//     "thumbnail": "prueba.img",
//     "code": "code45",
//     "stock": "1"
// }

// console.log("--------------ACTUALIZACION DE ITEM-----------------")
// productManager.updateProductById(2,item_update)
// productManager.updateProductById(4,item_update)
// productManager.getProductsFromFiles();

// console.log("----------------------NUEVO ITEM AÑADIDO---------------------")
// productManager.addProduct(producto4);
// productManager.getProductsFromFiles();

// console.log("--------------------------BORRADO DE ITEM--------------------------")
// productManager.deleteProductById(5);
// productManager.deleteProductById(3);

// productManager.getProductsFromFiles();

export { productManager };