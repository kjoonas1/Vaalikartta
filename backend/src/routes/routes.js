const router = require("express").Router()

// Löytyy linkistä: https://raw.githubusercontent.com/tomimick/mapcolorizer/master/res-finland/res/kuntarajat-ok.geojson
const municipalityBorders = require("../../dataset/kuntarajat-ok.json")
const provinceBorders = require("../../dataset/maakunnat.json")

router.get("/api/maps/municipalityborders", async (req, res) => {
    res.send(JSON.stringify(municipalityBorders))
})

router.get("/api/maps/provinceborders", async (req, res) => {
    res.send(JSON.stringify(provinceBorders))
})

router.get("/api/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
    console.log(req.params)
    const vaalipiiri = req.params.vaalipiiri
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
    const items = await collection.find({ Alue: vaalipiiri, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/api/kunnat/kannatus/:kunta/:vuosi", async (req, res) => {
    console.log(req.params)
    const kunta = req.params.kunta
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-kunnittain")
    const items = await collection.find({ Alue: kunta, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/api/kunnat/koordinaatit/:vuosi", async (req, res) => {
    console.log(req.params)
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-kunnittain")
    // kunta collection vuosien mukaan
    const kunnat = await collection.find({ Vuosi: vuosi }, { projection: { Alue: 1 } }).toArray()
    const kuntienNimet = kunnat.map(kunta => kunta.Alue)
    const kokoelma = req.db.collection("kuntien-koordinaatit")
    const koordinaatit = await kokoelma.find({ "properties.name": { $in: kuntienNimet } }).toArray()
    const geoJSONKoordinaatit = {
        type: "FeatureCollection",
        features: koordinaatit
    }
    res.send(geoJSONKoordinaatit)
})

// Tämä vain jotta /favicon.ico hakeminen ei tuota 404
router.get("/favicon.ico", (req, res) => res.sendStatus(204))

module.exports = router