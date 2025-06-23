import { connect } from "mongoose";
import dotenv from 'dotenv';

//Configuracion de las variables de entorno
dotenv.config();

const connection = async() => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log('Successful connection to the database');
    } catch (error) {
        console.log("Error connecting the database", error);
        throw new Error("¡Unable to connect to the database!");
    }
};

export default connection;