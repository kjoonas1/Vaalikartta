const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const MongoClient = require("mongodb").MongoClient
const router = require("./routes/routes")

if (process.env.TEST)
    console.log = () => { } // Otetaan loggaus pois käytöstä jottei sotke testejä

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
// app.use(morgan("tiny"))
// Middleware, joka vie Db instanssin jokaisen pyynnön mukana
app.use((req, res, next) => {
    req.db = mongoClient.db(databaseName)
    next()
})

// Tämä vain jotta /favicon.ico hakeminen ei tuota 404
app.use("/api", router)
app.get("/favicon.ico", (req, res) => res.sendStatus(204))

process.on("exit", () => {
    app.onExit()
})

app.onExit = () => {
    if (mongoClient)
        mongoClient.close()
}

module.exports = app