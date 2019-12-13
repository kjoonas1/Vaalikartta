import React from "react"
import { Col } from "react-bootstrap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"
import BubbleChart from "./BubbleChart"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import StatisticsTable from "./StatisticsTable"
import { Tab, Tabs } from "react-bootstrap"
import "../styles/Charts.scss"
import { useQuery } from "react-fetching-library"
import Hallituskaudet from "./Hallituskaudet"

const Charts = () => {

    const { area, dispatchArea } = useArea()
    const { year } = useYear()
    const url = active => {
        switch (active) {
            case "Koko maa": return `/api/koko-maa/kannatus/${year}`
            case "Vaalipiirit": return `/api/vaalipiirit/kannatus/${area.constituency}/${year}`
            case "Kunnat": return `/api/kunnat/kannatus/${area.district}/${year}`
            default: return null
        }
    }

    const aanestystiedotUrl = active => {
        switch (active) {
            case "Koko maa": return `/api/muut-alueet/aanestystiedot/${area.country}/${year}`
            case "Vaalipiirit": return `/api/vaalipiirit/aanestystiedot/${area.constituency}/${year}`
            case "Kunnat": return `/api/kunnat/aanestystiedot/${area.district}/${year}`
            default: return null
        }
    }
    const bubbleChart = useQuery({
        method: "GET",
        endpoint: url(area.active),
    })

    const votingStatistics = useQuery({
        method: "GET",
        endpoint: aanestystiedotUrl(area.active),
    })

    const getYear = year === 2019 ? 2018 : year
    const kuntaStatistics = useQuery({
        method: "GET",
        endpoint: `/api/avainluvut/${getYear}/${area.district}`
    })

    const getBubbleChartData = (data) => {
        const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
        const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
        const colorArray = colors.default
        // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
        // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
        // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi", "Puolueiden äänet yhteensä"]
        const kannatus = objectHelper.filterFromObject(data[0], a => a !== null)
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
            .filter((item) => item.v > 0)
            .sort((a, b) => b.v - a.v)
        // Sorttauksella voidaan määrittää pallojen järjestyminen
        return chartData
    }

    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Vaalipiirit": return area.constituency !== undefined ? area.constituency : ""
            case "Koko maa": return area.country !== undefined ? area.country : ""
            case "Kunnat": return area.district !== undefined ? area.district : ""
            default: return ""
        }
    }
    const getVotingStatisticsData = (data) => {
        const removeAttributes = ["_id", "Alue", "Vuosi"]
        const aanestysFilter = objectHelper.filterFromObject(data, a => a !== null)
        const aanestys = objectHelper.extractArrayOfResponseData(aanestysFilter, removeAttributes, "name", "luku")
            .map(rivi => [rivi.name, rivi.luku]).sort(([a], [b]) => a.localeCompare(b))
        return aanestys
    }

    const getKuntaStatisticsData = (data) => {
        const removeAttributes = ["_id", "Alue", "Vuosi"]
        const kuntaDataFilter = objectHelper.filterFromObject(data, a => a !== null)
        const kuntaData = objectHelper.extractArrayOfResponseData(kuntaDataFilter, removeAttributes, "name", "luku")
            .map(rivi => [rivi.name, rivi.luku]).sort(([a], [b]) => a.localeCompare(b))
        return kuntaData
    }

    const chartTitle = getTitle(area.active, area) + " " + year

    const errorMessage = "Virhe, kokeile uudestaan."

    const noDataMessage = <>
        <h4>{chartTitle}</h4>
        <p>Ei dataa. Alue on todennäköisesti liitetty toiseen tai sitä ei ole vielä ollut olemassa</p>
    </>

    const hallitus = useQuery({
        method: "GET",
        endpoint: `/api/hallituskaudet/vuosittain/${year}`
    })

    return (
        <Col>
            <Tabs defaultActiveKey="kannatus" className="flex-row">
                <Tab eventKey="kannatus" title="Puoluekannatus" className="aanestys-tab">
                    {(!bubbleChart.error && bubbleChart.payload && bubbleChart.payload.length) ?
                        <BubbleChart
                            data={getBubbleChartData(bubbleChart.payload)}
                            title={chartTitle}
                            useLabels={true}
                            width={700}
                            height={700}
                            loading={bubbleChart.loading}
                        /> : bubbleChart.payload && !bubbleChart.payload.length
                            ? noDataMessage
                            : errorMessage
                    }
                </Tab>
                <Tab eventKey="Aanestystiedot" title="Äänestystiedot" className="aanestys-tab">
                    {(!votingStatistics.error && votingStatistics.payload !== undefined && Object.entries(votingStatistics.payload).length && bubbleChart.payload && bubbleChart.payload.length) ?
                        <StatisticsTable
                            title={chartTitle}
                            loading={votingStatistics.loading}
                            data={getVotingStatisticsData(votingStatistics.payload)} />
                        : bubbleChart.payload && !bubbleChart.payload.length
                            ? noDataMessage
                            : errorMessage}
                </Tab>
                {(area.active !== "Kunnat") ? null :
                    <Tab eventKey="Kuntatiedot" title="Kuntatiedot" className="aanestys-tab">
                        {(!kuntaStatistics.error && kuntaStatistics.payload && bubbleChart.payload && bubbleChart.payload.length) ?
                            <StatisticsTable data={getKuntaStatisticsData(kuntaStatistics.payload)} title={getYear} />
                            : bubbleChart.payload && !bubbleChart.payload.length
                                ? noDataMessage
                                : errorMessage}
                    </Tab>}
                <Tab eventKey="Hallitukset" title="Hallitukset">
                    {(!hallitus.error && hallitus.payload) ?
                        <Hallituskaudet
                            loading={hallitus.loading}
                            data={hallitus.payload} />
                        :  errorMessage}

                </Tab>
            </Tabs>
        </Col>
    )
}

export default Charts
