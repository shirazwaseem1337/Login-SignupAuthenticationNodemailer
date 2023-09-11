const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connection is successful")
}).catch((e) => { console.log(e) })