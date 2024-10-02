const mongoose = require("mongoose");
const colors = require('colors');

const ConnectDB = async()=>{
    try{
        const conn =  await mongoose.connect(process.env.MONGODB_STRNG);
        console.log(`Server is Connected with ${conn.connection.db.databaseName} db`.cyan.underline);
    }
    catch(error){
        console.log(error)
    }
}


module.exports = ConnectDB;