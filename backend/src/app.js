const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const MongoClient = require("mongodb").MongoClient
const router = require("./routes/routes")

// Käyttäjällä vaalikartta on vain lukuoikeus tietokantaan
const databaseUrl = `mongodb+srv://vaalikartta:${process.env.PASSWD}@klusteri-asaca.mongodb.net/test?retryWrites=true&w=majority`
const databaseName = "vaalikartta"

var mongoClient = null
MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    mongoClient = client
    console.log("Connected to database")
}).catch(err => {
    console.log("Error connecting to database", err)
    process.exit(1)
})

app.use(cors())
app.use(morgan("tiny"))
app.use("/", router)
// Middleware, joka vie Db instanssin jokaisen pyynnön mukana
app.use((req, res, next) => {
    req.db = mongoClient.db(databaseName)
    next()
})

process.on("exit", () => {
    if (mongoClient)
        mongoClient.close()
})

module.exports = app