module.exports = app => {
    // Löytyy linkistä: https://raw.githubusercontent.com/tomimick/mapcolorizer/master/res-finland/res/kuntarajat-ok.geojson
    const municipalityBorders = require("../../dataset/kuntarajat-ok.json")
    const provinceBorders = require("../../dataset/maakunnat.json")

    app.get("/api/maps/municipalityborders", async (req, res) => {
        res.send(JSON.stringify(municipalityBorders))
    })

    app.get("/api/maps/provinceborders", async (req, res) => {
        res.send(JSON.stringify(provinceBorders))
    })

    app.get("/api/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
        console.log(req.params)
        const vaalipiiri=req.params.vaalipiiri
        const vuosi=parseInt(req.params.vuosi)
        const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
        const items = await collection.find({Alue: vaalipiiri, Vuosi: vuosi}).toArray()
        res.send(items)
    })

    app.get("/api/koko-maa/kannatus/:vuosi", async (req, res) => {
        console.log(req.params)
        const vuosi=parseInt(req.params.vuosi)
        const collection = req.db.collection("kannatusprosentit-koko-maa")
        const items = await collection.find({ Vuosi: vuosi }).toArray()
        res.send(items)
    })

    // Tämä vain jotta /favicon.ico hakeminen ei tuota 404
    app.get("/favicon.ico", (req, res) => res.sendStatus(204))
}