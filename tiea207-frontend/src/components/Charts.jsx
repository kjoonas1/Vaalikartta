import React from "react"
import { useFetch } from "../hooks/UseFetch"
import { Col } from "react-bootstrap"
import { DataChart } from "./DataChart"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"
import { sumArray, partition } from "../utils/arrayHelper"
import BubbleChart from "./BubbleChart"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"

const Charts = () => {
    const { area, dispatchArea } = useArea()
    const { year } = useYear()

    const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
    const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
    const colorArray = colors.default

    const url = active => {
        switch (active) {
        case "Koko maa":
            return `${backendUrl}/api/koko-maa/kannatus/${year}`
        case "Vaalipiirit":
            return `${backendUrl}/api/vaalipiirit/kannatus/${area.constituency}/${year}`
        case "Kunnat":
            return `${backendUrl}/api/vaalipiirit/kannatus/${area.district}/${year}` // FIXME: placeholder
        default:
            return null
        }
    }

    const kannatusHaku = useFetch(url(area.active))

    // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
    // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
    // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
    if (kannatusHaku.error === null) {
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi", "Puolueiden äänet yhteensä"]
        const kannatus = objectHelper.filterFromObject(kannatusHaku.data[0], a => a !== null)
        const puolueLuvut = objectHelper.extractArrayOfResponseData(kannatus, removeAttributes, "name", "vote")

        // Jos valittua aluetta ei enää vuoden vaihdon jälkeen ole, poistetaan aluevalinta
        if (year > 2011 && vanhatVaalipiirit.includes(area) && !uudetVaalipiirit.includes(area))
            dispatchArea({ type: "CHANGE_CONSTITUENCY_TO", to: null })
        else if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area))
            dispatchArea({ type: "CHANGE_CONSTITUENCY_TO", to: null })

        // Haetaan puolueen luvut, nimet sekä tunnusvärit
        const chartData = puolueLuvut.map(party => {
            const puolue = colorArray.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => {
                return puolue && puolue.color ? puolue.color : "#bdbdbd"
            }
            return { text: party.name, v: party.vote, color: color() }
        })

        // Sorttauksella voidaan määrittää pallojen järjestyminen
        const bubbleChartData = () => chartData.sort((a, b) => b.v - a.v)

        const data = Object.keys(chartData).map(key => {
            const color = chartData[key].color
            const text = chartData[key].label
            const v = chartData[key].value
            return [text, v, color]
        })

        // eslint-disable-next-line
        const suuretPuolueet = partition(data, ([puolue, kannatus, vari]) => kannatus < 1.0)
        //const pienpuolueet = suuretPuolueet[0].sort((a, b) => b[1] - a[1])
        // Yhdistetään yli 1% kannatuksen saaneet ja pienemmät niin, että pienemmät yhdistetään yhdeksi luvuksi pienpuolueiden alle.
        const suuretPuolueetChart = suuretPuolueet[1]
            .concat([["Pienpuolueet", sumArray(suuretPuolueet[0].map(p => p[1])), "#ff0000"]])
            .sort((a, b) => b[1] - a[1]) // Järjestetään lista

        // Yhdistetään data otsikkokenttien kanssa samaan listaan
        const addChartHeader = data => [["Puolue", "Kannatusprosentti", { role: "style" }]].concat(data)
        const dataWithHeaders = addChartHeader(suuretPuolueetChart)

        // Otsikko chartille sen mukaan mikä välilehti on aktiivinen kartalla
        const getTitle = (mapType, area) => {
            switch (mapType) {
            case "Vaalipiirit":
                return area.constituency !== undefined ? area.constituency : ""
            case "Koko maa":
                return area.country !== undefined ? area.country : ""
            default:
                return ""
            }
        }

        const chartTitle = getTitle(area.active, area)

        if (chartData.length) {
        return (
            <Col xs={12} xl={8}>
                <BubbleChart
                    data={bubbleChartData()}
                    useLabels={true}
                    width={1000}
                    height={800}
                />
                <DataChart data={dataWithHeaders} chartType="BarChart" title={chartTitle + " " + year} axisMax={100} />
            </Col>
        )
    }
    return <div>loading</div>
    }
}
export default Charts
