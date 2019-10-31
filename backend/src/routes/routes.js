const router = require("express").Router()

router.get("/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
    console.log(req.params)
    const vaalipiiri = req.params.vaalipiiri
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
    const items = await collection.find({ Alue: vaalipiiri, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/kunnat/kannatus/:kunta/:vuosi", async (req, res) => {
    console.log(req.params)
    const kunta = req.params.kunta
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-kunnittain")
    const items = await collection.find({ Alue: kunta, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
    const vaalipiiri = req.params.vaalipiiri
    const vuosi = parseInt(req.params.vuosi)
    if (vaalipiiri === "undefined" || vuosi === NaN)
        return res.status(204).send()
    console.log(vuosi)
    const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
    const items = await collection.find({ Alue: vaalipiiri, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/koko-maa/kannatus/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    if (vuosi === NaN)
        return res.status(204).send()
    const collection = req.db.collection("kannatusprosentit-koko-maa")
    const items = await collection.find({ Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/kunnat/koordinaatit/:vuosi", async (req, res) => {
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

module.exports = router
