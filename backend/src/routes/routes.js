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

    app.get("/api/districts/district", async (req, res) => {
        res.send(
            { district: JSON.stringify(req.query.district), 
                constituency: "find this from db"
            })
    })

    app.get("/api/mongotesti", async (req, res) => {
        const collection = req.db.collection("leluesimerkki")
        const items = await collection.find({}).toArray()
        res.send(items)
    })

    // Tämä vain jotta /favicon.ico hakeminen ei tuota 404
    app.get("/favicon.ico", (req, res) => res.sendStatus(204))
}