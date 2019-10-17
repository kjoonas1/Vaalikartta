const express = require("express")
const app = express()
var cors = require("cors")
const morgan = require("morgan")
const routes = require("./routes/routes")
const MongoClient = require("mongodb").MongoClient

// Käyttäjällä vaalikartta on vain lukuoikeus tietokantaan
const databaseUrl = `mongodb+srv://vaalikartta:${process.env.PASSWD}@klusteri-asaca.mongodb.net/test?retryWrites=true&w=majority`
const databaseName = "testidb"

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
// Middleware, joka vie Db instanssin jokaisen pyynnön mukana
app.use((req, res, next) => {
    req.db = mongoClient.db(databaseName)
    next()
})

const PORT = 8000

routes(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

process.on("exit", () => {
    if (mongoClient)
        mongoClient.close()
})