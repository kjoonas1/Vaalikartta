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
const databaseUrl = `mongodb://vaalikartta:${process.env.PASSWD}@klusteri-shard-00-00-asaca.mongodb.net:27017,klusteri-shard-00-01-asaca.mongodb.net:27017,klusteri-shard-00-02-asaca.mongodb.net:27017/test?ssl=true&replicaSet=Klusteri-shard-0&authSource=admin&retryWrites=true&w=majority`
const databaseName = "vaalikartta"
process.on("exit", () => {
    app.onExit()
})

// Tehdään promisena, jotta kutsuvassa koodissa voidaan sitten varmistua siitä, että yhteys tietokantaan on
// saatu
const createApp = new Promise((resolve, reject) => {
    MongoClient.connect(databaseUrl, { useNewUrlParser: false, useUnifiedTopology: true }).then(client => {
        app.mongoClient = client
        console.log("Connected to database")

        app.use(cors())
        app.use(morgan("tiny"))
        // Middleware, joka vie Db instanssin jokaisen pyynnön mukana
        app.use((req, res, next) => {
            req.db = app.mongoClient.db(databaseName)
            next()
        })

        app.use("/api", router)
        app.use("/app", express.static(path.join(__dirname, "../../tiea207-frontend/build/")))
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
