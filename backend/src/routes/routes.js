const router = require("express").Router()

router.get("/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
    const vaalipiiri = req.params.vaalipiiri
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
    const items = await collection.find({ Alue: vaalipiiri, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/kunnat/kannatus/:kunta/:vuosi", async (req, res) => {
    const kunta = req.params.kunta
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-kunnittain")
    const items = await collection.find({ Alue: kunta, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/vaalipiirit/kannatus/:vaalipiiri/:vuosi", async (req, res) => {
    const vaalipiiri = req.params.vaalipiiri
    const vuosi = parseInt(req.params.vuosi)
    if (vaalipiiri === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    console.log(vuosi)
    const collection = req.db.collection("kannatusprosentit-vaalipiireittäin")
    const items = await collection.find({ Alue: vaalipiiri, Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/koko-maa/kannatus/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    if (isNaN(vuosi))
        return res.status(204).send()
    const collection = req.db.collection("kannatusprosentit-koko-maa")
    const items = await collection.find({ Vuosi: vuosi }).toArray()
    res.send(items)
})

router.get("/kunnat/koordinaatit/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const collection = req.db.collection("kannatusprosentit-kunnittain")
    // kunta collection vuosien mukaan
    const kunnat = await collection.find({ Vuosi: vuosi }, { projection: { Alue: 1 } }).toArray()
    const kuntienNimet = kunnat.map(kunta => kunta.Alue)
    const kokoelma = req.db.collection("kuntien-koordinaatit")
    const koordinaatit = await kokoelma.find({ "properties.name": { $in: kuntienNimet } }).toArray()
    if (koordinaatit.length === 0)
        return res.sendStatus(404)
    const geoJSONKoordinaatit = {
        type: "FeatureCollection",
        features: koordinaatit
    }
    res.send(geoJSONKoordinaatit)
})

router.get("/avainluvut/:vuosi/:kunta", async (req, res) => {
    const vuosi = req.params.vuosi
    const kunta = req.params.kunta
    const avainluvut = req.db.collection("kuntien-avainluvut")
    const halututKentat = [
        "Alle 15-vuotiaiden osuus väestöstä, %", "15-64 -vuotiaiden osuus väestöstä, %", "Yli 64-vuotiaiden osuus väestöstä, %",
        "Väkiluku", "Ruotsinkielisten osuus väestöstä, %", "Työllisyysaste, %", "Ulkomaan kansalaisten osuus väestöstä, %",
        "Taajama-aste, %",
    ]
    const tiedotKannasta = await avainluvut.find({ Alue: kunta, Tiedot: { $in: halututKentat } }, { projection: { [vuosi]: 1, Tiedot: 1, Alue: 1 } })
        .toArray()
    console.log(tiedotKannasta)
    if (tiedotKannasta.length === 0)
        return res.sendStatus(404)
    if (tiedotKannasta[0][vuosi] === undefined) // varmistetaan että on dataa eikä vain undefined
        return res.sendStatus(404)
    const sievennettyData = tiedotKannasta.filter(kentta => kentta[vuosi] !== null).reduce((acc, kentta) => {
        return { ...acc, [kentta.Tiedot]: (kentta[vuosi]) }
    }, {})
    res.send(sievennettyData)
})

router.get("/kunnat/aanestystiedot/:kunta/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const kunta = req.params.kunta
    if (kunta === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const aanestystiedot = req.db.collection("aanestystiedot-kunnat")
    const items = await aanestystiedot.find({ Alue: kunta, Vuosi: vuosi }, {
        projection: {
            Alue: 1, Vuosi: 1,
            "Äänestysprosentti Sukupuolet yhteensä": 1, "Äänestysprosentti Miehet": 1,
            "Äänestysprosentti Naiset": 1, "Hylätyt äänet Sukupuolet yhteensä": 1
        }
    }).toArray()
    if (items.length === 0)
        return res.sendStatus(404)
    res.send(items)
})

router.get("/vaalipiirit/aanestystiedot/:vaalipiiri/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const vaalipiiri = req.params.vaalipiiri
    if (vaalipiiri === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const aanestystiedot = req.db.collection("aanestystiedot-vaalipiirit")
    const items = await aanestystiedot.find({ Alue: vaalipiiri, Vuosi: vuosi }, {
        projection: {
            Alue: 1, Vuosi: 1,
            "Äänestysprosentti Sukupuolet yhteensä": 1, "Äänestysprosentti Miehet": 1,
            "Äänestysprosentti Naiset": 1, "Hylätyt äänet Sukupuolet yhteensä": 1
        }
    }).toArray()
    if (items.length === 0)
        return res.sendStatus(404)
    res.send(items)
})

router.get("/muut-alueet/aanestystiedot/:muuAlue/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const muuAlue = req.params.muuAlue
    if (muuAlue === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const aanestystiedot = req.db.collection("aanestystiedot-muut-alueet")
    const items = await aanestystiedot.find({ Alue: muuAlue, Vuosi: vuosi }, {
        projection: {
            Alue: 1, Vuosi: 1,
            "Äänestysprosentti Sukupuolet yhteensä": 1, "Äänestysprosentti Miehet": 1,
            "Äänestysprosentti Naiset": 1, "Hylätyt äänet Sukupuolet yhteensä": 1
        }
    }).toArray()
    if (items.length === 0)
        return res.sendStatus(404)
    res.send(items)
})

module.exports = router
