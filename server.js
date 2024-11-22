const express = require("express")
const cors = require("cors")
const app = express()
const { readdirSync } = require("fs")

const errorMiddleware = require('./middlewares/error-midlewares')
const notFound = require("./middlewares/notFound")
app.use(cors())
app.use(express.json())

// console.log(readdirSync("./routes"))
readdirSync("./routes").map((c) => app.use(require("./routes/" + c)))


app.use("*", notFound)
app.use(errorMiddleware)

app.listen(8888, () => console.log("server is running on port 8888"))