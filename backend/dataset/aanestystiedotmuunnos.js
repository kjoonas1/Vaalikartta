/* 
 * Tämä skripti jakaa aanestystiedot.json tiedoston datan uusiin tiedostoihin: kunnittain, vaalipiireittäin, muut alueet.
 * Muut alueet sisältää koko maan äänestystiedot.
 */
const fs = require("fs")

let aanestystiedot = JSON.parse(fs.readFileSync("aanestystiedot.json", "utf-8"))

let muokattuData = aanestystiedot.map(alue => {
    // Koko maalla ei ole aluekoodia
    if (alue.Alue.match(/^\D/) !== null) {
        alue.tyyppi = "muu alue"
        return alue
    }
    else {
        // Selvitetään aluekoodit
        let aluekoodi = alue.Alue.substring(0, 3)
        if (aluekoodi.trim().length === 3) alue.tyyppi = "kunta"              // kunnilla on aina kolme numeroinen koodi
        else if (aluekoodi.trim().length === 2) alue.tyyppi = "vaalipiiri"    // vaalipiireillä kahden
        else {
            alue.tyyppi = "undefined"
        }
        alue.aluekoodi = parseInt(aluekoodi)

        // Poistetaan alueen nimestä ylimääräiset numero-osat
        alue.Alue = alue.Alue.replace(/\d+\s|-\d+/gi, "").trim()
    }
    return alue
})

let vainVaalipiirit = muokattuData.filter(alue => alue.tyyppi === "vaalipiiri")
let vainKunnat = muokattuData.filter(alue => alue.tyyppi === "kunta")
let muuAlue = muokattuData.filter(alue => alue.tyyppi === "muu alue")
let vainUndefined = muokattuData.filter(alue => alue.tyyppi === "undefined")

fs.writeFileSync("aanestystiedot-vaalipiirit.json", JSON.stringify(vainVaalipiirit), "utf-8")
fs.writeFileSync("aanestystiedot-kunnat.json", JSON.stringify(vainKunnat), "utf-8")
fs.writeFileSync("aanestystiedot-muut-alueet.json", JSON.stringify(muuAlue), "utf-8")
if (vainUndefined.length !== 0)
    fs.writeFileSync("aanestystiedot-undefined.json", JSON.stringify(vainUndefined), "utf-8")