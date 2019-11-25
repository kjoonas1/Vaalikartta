const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const MongoClient = require("mongodb").MongoClient
const router = require("./routes/routes")
const path = require("path")

if (process.env.TEST)
    console.log = () => { } // Otetaan loggaus pois käytöstä jottei sotke testejä

// Käyttäjällä vaalikartta on vain lukuoikeus tietokantaan
const databaseUrl = `mongodb+srv://vaalikartta:${process.env.PASSWD}@klusteri-asaca.mongodb.net/test?retryWrites=true&w=majority`
const databaseName = "vaalikartta"
process.on("exit", () => {
    app.onExit()
})

// Tehdään promisena, jotta kutsuvassa koodissa voidaan sitten varmistua siitä, että yhteys tietokantaan on
// saatu
const createApp = new Promise((resolve, reject) => {
    MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
        app.mongoClient = client
        console.log("Connected to database")

        app.use(cors())
        process.env.NODE_ENV === "development" && app.use(morgan("tiny"))
        // Middleware, joka vie Db instanssin jokaisen pyynnön mukana
        app.use((req, res, next) => {
            req.db = app.mongoClient.db(databaseName)
            next()
        })

        app.use("/api", router)
        app.use("/", express.static(path.join(__dirname, "../build")))
        // Tämä vain jotta /favicon.ico hakeminen ei tuota 404
        app.get("/favicon.ico", (req, res) => res.sendStatus(204))
        resolve(app) // app valmis käyttöön
    }).catch(err => {
        console.log("Error connecting to database", err)
        process.exit(1)
        reject()
    })
})

app.onExit = () => {
    if (app.mongoClient)
        app.mongoClient.close()
}

module.exports = {
    createApp: createApp
}
