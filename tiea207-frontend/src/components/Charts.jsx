import React, { useContext } from "react"
import { useFetch } from "../hooks/UseFetch"
import { Col } from "react-bootstrap"
import { DataChart } from "./DataChart"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"
import { AreaContext, YearContext } from "../contexts/Contexts"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"



const Charts = () => {

    const { area, dispatchArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
    const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
    const colorArray = colors.default

    const url = (active) => {
        switch (active) {
        case "Koko maa": return `${backendUrl}/api/koko-maa/kannatus/${year}`
        case "Vaalipiirit": return `${backendUrl}/api/vaalipiirit/kannatus/${area.constituency}/${year}`
        case "Kunnat": return `${backendUrl}/api/vaalipiirit/kannatus/${area.district}/${year}` // FIXME: placeholder
        default: return null
        }
    }

    let chartData = null
    const kannatusHaku = useFetch(url(area.active))
    // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
    // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
    // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
    if (kannatusHaku.error === null) {
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi", "Puolueiden äänet yhteensä"]
        const kannatus = objectHelper.filterFromObject(kannatusHaku.data[0], a => a !== null)
        const puolueLuvut = objectHelper
            .extractArrayOfResponseData(kannatus, removeAttributes, "name", "vote")

        // Jos valittua aluetta ei enää vuoden vaihdon jälkeen ole, poistetaan aluevalinta
        if (year > 2011 && vanhatVaalipiirit.includes(area) && !uudetVaalipiirit.includes(area)) dispatchArea({ type: "CHANGE_CONSTITUENCY_TO", to: null })
        else if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area)) dispatchArea({ type: "CHANGE_CONSTITUENCY_TO", to: null })

        // Haetaan puolueen luvut, nimet sekä tunnusvärit
        chartData = puolueLuvut.map(party => {
            const puolue = colorArray.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => {
                return puolue && puolue.color ? puolue.color : "#bdbdbd"
            }
            return { fill: color(), name: party.name, vote: party.vote }
        })
    }
    return (<Col xs={12} xl={8}>
        <DataChart luvut={chartData} />
    </Col>)

}
export default Charts