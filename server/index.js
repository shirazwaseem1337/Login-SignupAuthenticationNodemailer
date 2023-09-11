const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
require("./db/conn")
const morgan = require("morgan")
dotenv.config()
// agar kahin aur huta so dotenv.config({path:""}) and "" mein wo path ajata
const authRoute = require("./routes/authRoute")
const cors = require("cors")

const app = express()



// middlewares
app.use(express.json())  // req and res mein json data bhej skty phely bodyparser use krte thy
app.use(morgan('dev'))
app.use(cors())


// routes
app.use("/api/v1/auth", authRoute)

const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

app.listen(PORT, () => {
    console.log(`Server Running on mode on port ${PORT}`.black)
})