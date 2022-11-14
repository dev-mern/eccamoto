import mongoose from "mongoose";
import { envInfo } from "./utils/envInitializer";

const connection = {};

async function connect() {
    try {
        if (connection.isConnected) {
            // console.log('already connected to DB: ',mongoose.connection.base.connections.length);
            return;
        }
    
        if (mongoose.connections.length > 0) {
            connection.isConnected = mongoose.connections[0].readyState;
            if (connection.isConnected === 1) {
                // console.log("Using previous connection!");
                return;
            }
    
            await mongoose.disconnect();
        }
    
        // process.env.MONGODB_CONNECT_URI
        const db = await mongoose.connect(envInfo.MONGODB_CONNECT_URI,{
            dbName: 'eccamoto',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true 
        })
    
        // console.log("New Connection count : ", mongoose.connection.base.connections.length);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
    }
}

async function disconnect() {
    try {
        if (connection.isConnected) {
            if (process.env.NODE_ENV === "production") {
                await mongoose.disconnect();
                connection.isConnected = false;
                // console.log("Disconnected, connection count: ",mongoose.connection.base.connections.length);
            }else{
                // console.log("Not connected to DB cout: ",mongoose.connection.base.connections.length);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function convertMongooseDocToObjForLean(doc) {
    doc.id = doc._id ? doc._id?.toString() : null;
    doc.createdAt = doc.createdAt ? doc.createdAt?.toString() : null;
    doc.updatedAt = doc.updatedAt ? doc.updatedAt?.toString() : null;
    return doc;
}

function errorFormatterMongoose(mongooseError) {

    if (mongooseError.name === "ValidationError") {
        let errors = {};
        Object.keys(mongooseError.errors).forEach((key) => {
            errors[key] = mongooseError.errors[key].message;
        });
        return errors;
    }else if (mongooseError.code === 11000) {
        return Object.entries(mongooseError.keyValue).reduce((pre,[k,v])=>(pre[k] = `${k} is already exist`,pre),{});
    }else{
        return mongooseError.errors;
    }
}



const db = {connect,disconnect,convertMongooseDocToObjForLean, errorFormatterMongoose};

export default db;