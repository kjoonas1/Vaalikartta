/**
 * Tämä skripti jakaa kannatusprosentti.json tiedoston sisältämän datan kolmeen eri tiedostoon:
 * kunnittain, vaalipiireittäin ja undefined, johon luokittelematon data menee. Jokaisesta alueesta
 * otetaan myös aluekoodi ja tyyppi erillisiksi kentikseen ja poistetaan ylimääräiset merkinnät alueiden
 * nimistä.
 */
const fs = require("fs")

let kannatusdata = JSON.parse(fs.readFileSync("kannatusprosentti.json", "utf-8"))

let muokattuData = kannatusdata.map(alue => {
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
    // Muutetaan kenttien nimiä
    alue.PP = alue["Piraattip."]
    delete alue["Piraattip."]
    return alue
})

let vainVaalipiirit = muokattuData.filter(alue => alue.tyyppi === "vaalipiiri")
let vainKunnat = muokattuData.filter(alue => alue.tyyppi === "kunta")
let vainUndefined = muokattuData.filter(alue => alue.tyyppi === "undefined")

fs.writeFileSync("kannatus-vaalipiirit.json", JSON.stringify(vainVaalipiirit), "utf-8")
fs.writeFileSync("kannatus-kunnat.json", JSON.stringify(vainKunnat), "utf-8")
if (vainUndefined.length !== 0)
    fs.writeFileSync("undefined.json", JSON.stringify(vainUndefined), "utf-8")