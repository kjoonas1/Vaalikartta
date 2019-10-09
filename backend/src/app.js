const express = require("express")
const app = express()
var cors = require("cors")

app.use(cors())

const PORT = 8000

const message = {
    id: 1,
    content: "Hello world"
}

// Löytyy linkistä: https://raw.githubusercontent.com/tomimick/mapcolorizer/master/res-finland/res/kuntarajat-ok.geojson

const cityBorders = require("../kuntarajat-ok.json")
const stateBorders = require("../maakunnat.json")

app.get("/api/helloworld", (req, res) => {
    res.send(JSON.stringify(message))
})

app.get("/api/maps/cityborders", (req, res) => {
    res.send(JSON.stringify(cityBorders))
})

app.get("/api/maps/stateborders", (req, res) => {
    res.send(JSON.stringify(stateBorders))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})