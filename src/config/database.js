//IMPORTAMOS MOONGOSE Y HACEMOS LA CONEXCION CON LA BASE DE DATOS
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://lautaroiglesias:LI001cba@ecommerce.qqzcmwk.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error de conexion a la base de datos: "));
db.once('open', () => {
    console.log("Conectando a la base de datos");
});

export { mongoose, db };