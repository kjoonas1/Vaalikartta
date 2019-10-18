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

    app.get("/api/mongotesti/:id", async (req, res) => {
        console.log(req.params)
        const collection = req.db.collection("leluesimerkki")
        const items = await collection.find({}).toArray()
        res.send(items)
    })
    /* Esimerkki tietokannasta hakemiseen
    app.get("/api/hallitukset/:vuosi", async (req, res) => {
        const vuosi = req.params.vuosi
        const hallituksenTiedot = req.db.collection("hallitukset").find({vuosi: 2002}).toArray()
        res.send(hallituksenTiedot)
    })*/
}