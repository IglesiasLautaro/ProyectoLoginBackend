//IMPORTAMOS TODO LO QUE VAMOS A USAR EN EL ARCHIVO APP.JS
import express from 'express';
import { productRouter } from "../src/routes/products.routes.js";
import { cartRouter } from "../src/routes/carts.routes.js";
import path from 'path';

import __dirname from './utils/utils.js';
import handlebars from 'express-handlebars';

// import { Product } from './dao/models/products.model.js';
// import { Carts } from './dao/models/carts.model.js';

import { mongoose } from './config/database.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import MongoStore from 'connect-mongo'
import "dotenv/config.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import loginRouter from './routers/views/loging.js'
import registerRouter from './routers/views/register.js'
import sessionsApiRouter from './routers/api/sessions.js'
import profileRouter from "./routers/views/profile.js";
import recoveryPassword from "./routers/views/recoverypassword.js";

app.use(session({
    secret:process.env.hash,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.mongo,
        ttl: 4*60,
        autoRemove:"native"    
    }),
}));


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({
//     secret:"DemonSeeksKnowledge",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl:"mongodb+srv://lautaroiglesias:LI001cba@ecommerce.qqzcmwk.mongodb.net/?retryWrites=true&w=majority"
//         ,tls: 2*60    
//     }),
// }));

const db = async() => {
    await mongoose.connect(
        "mongodb+srv://lautaroiglesias:LI001cba@ecommerce.qqzcmwk.mongodb.net/?retryWrites=true&w=majority",
        {}
    );
}

function populate(){

}

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/api/sessions',sessionsApiRouter);
app.use("/recovery", recoveryPassword);
app.use("/profile", profileRouter);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use('/', viewRouter);

app.use(cookieParser());

app.listen(port, () => {
    console.log(`El servidor está escuchando por el puerto ${port}`);
});

const httpServer = app.listen(port, () => {
    console.log(`Puerto actual ${port}`)
});

const io = new Server(httpServer);
const pM = new productManager();


io.on('connection', (socket) => {
    console.log("Nuevo cliente en linea");
    socket.on('mensaje',(data)=>{
    })});



        socket.on('añadir_item',(data)=>{
            const newProduct = data;
            const newProductCode = newProduct.code;
            const array = pM.getProductFromFile();

            console.log("Intentando agregar un nuevo producto")
            const duplicar = array.findIndex(product =>product.code === newProductCode);
            
            if(duplicar === -1){
                if(data.thumbnail.length>0){
                    newProduct["thumbnail"]=`${data.thumbnail}`
                }
                pM.addProduct(newProduct) 
                const array = pM.getProductFromFile(); 
                console.log(`El nuevo producto es `);
                console.log(array[array.length-1])
                io.emit("confirmar",[true,0,array[array.length-2].id,array[array.length-1]])}
            else{
                console.log(`Error Item ${newProduct.title} por codigo ${newProductCode} ya en la base de datos\nItem similar`);
                console.log(array[duplicar])
                io.emit("confirmar",[false,array[duplicar],0,0])
            }
        })
       
        socket.on('borrar',(data)=>{
            console.log("Quiero eliminar ",data)
            const array = pM.getProductFromFile();
            const product = array.findIndex(product =>product.id === Number(data));
            
            if(product === -1){
                console.log(`El item con el ID ${data} no fue encontrado`);
                io.emit('confirmar_borrado',[false,data])
            }else{
                pM.deleteProductById(Number(data));
                const array = pM.getProductFromFile();
                io.emit('confirmar_borrado',[true,data]) 
            }
        })


export default io;