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

const addTypes = (types, fields) => {
    return fields.reduce(
        (acc, field, i) => {
            return {
                ...acc,
                [field[0]]: {
                    value: field[1] || null,
                    type: types[i]
                }
            }
        }
        , {})
}

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
    if (tiedotKannasta.length === 0)
        return res.sendStatus(204)
    if (tiedotKannasta[0][vuosi] === undefined) // varmistetaan että on dataa eikä vain undefined
        return res.sendStatus(204)
    const sievennettyData = tiedotKannasta.reduce((acc, kentta) => {
        return { ...acc, [kentta.Tiedot]: (kentta[vuosi]) }
    }, {})
    const tyypitetty = addTypes(["float", "float", "int", "float", "float", "float", "float", "float"], Object.entries(sievennettyData))
    //console.log(tyypitetty)
    const tyypitettyIlmanNull = Object.entries(tyypitetty).filter(([key, val]) => val.value !== null).reduce((acc, kentta) => ({ ...acc, [kentta[0]]: kentta[1] }), {})
    res.send(tyypitettyIlmanNull)
})

const haeAanestysTiedot = async (alue, vuosi, aanestystiedot) => {
    const tiedotKannasta = await aanestystiedot.find({ Alue: alue, Vuosi: vuosi }, {
        projection: {
            _id: 0, Alue: 1, Vuosi: 1,
            "Äänestysprosentti Sukupuolet yhteensä": 1, "Äänestysprosentti Miehet": 1,
            "Äänestysprosentti Naiset": 1, "Hylätyt äänet Sukupuolet yhteensä": 1
        }
    }).toArray()
    const kentat = Object.entries(tiedotKannasta[0])
    const types = ["string", "int", "float", "float", "float", "int"]
    return addTypes(types, kentat)
}

router.get("/kunnat/aanestystiedot/:kunta/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const kunta = req.params.kunta
    if (kunta === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const collectionNimi = "aanestystiedot-kunnat"
    const aanestystiedot = req.db.collection(collectionNimi)
    const filtteroituData = await haeAanestysTiedot(kunta, vuosi, aanestystiedot)
    if (filtteroituData.length === 0)
        return res.sendStatus(404)
    res.send(filtteroituData)
})

router.get("/vaalipiirit/aanestystiedot/:vaalipiiri/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const vaalipiiri = req.params.vaalipiiri
    if (vaalipiiri === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const collectionNimi = "aanestystiedot-vaalipiirit"
    const aanestystiedot = req.db.collection(collectionNimi)
    const filtteroituData = await haeAanestysTiedot(vaalipiiri, vuosi, aanestystiedot)
    if (filtteroituData.length === 0)
        return res.sendStatus(404)
    res.send(filtteroituData)
})

router.get("/muut-alueet/aanestystiedot/:muuAlue/:vuosi", async (req, res) => {
    const vuosi = parseInt(req.params.vuosi)
    const muuAlue = req.params.muuAlue
    if (muuAlue === "undefined" || isNaN(vuosi))
        return res.status(204).send()
    const collectionNimi = "aanestystiedot-muut-alueet"
    const aanestystiedot = req.db.collection(collectionNimi)
    const filtteroituData = await haeAanestysTiedot(muuAlue, vuosi, aanestystiedot)
    if (filtteroituData.length === 0)
        return res.sendStatus(404)
    res.send(filtteroituData)
})

router.get("/hallituskaudet/vuosittain/:vuosi", async (req, res) => {
    const vuositunniste = req.params.vuosi
    if (vuositunniste === undefined)
        return res.status(204).send()
    const collection = req.db.collection("hallituskaudet")
    const hallitukset = await collection.find({ Vuositunniste: vuositunniste }).toArray()
    // Haetaan ministerit kullekin hallitukselle
    const ministeritCollection = req.db.collection("ministerit-hallituskausittain")
    const hallituksetMinistereineen = await hallitukset.map(async hallitus => {
        const ministerit = await ministeritCollection.find({ ID: hallitus.ID }).toArray()
        
          const sortatutMinisterit = ministerit.sort( (a, b) =>  {
                if (a.Rooli < b.Rooli) {
                    return -1
                }
                if (a.Rooli > b.Rooli) {
                    return 1
                }
                else return 0
            })
        return {...hallitus, ministerit: sortatutMinisterit}
    })
    
    Promise.all(hallituksetMinistereineen).then(h => res.send(h))
    
})

router.get("/ministerit/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id))
        return res.status(204).send()
    const collection = req.db.collection("ministerit-hallituskausittain")
    const items = await collection.find({ id: id }).toArray()
    res.send(items)
})

module.exports = router
