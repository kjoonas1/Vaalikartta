import React from "react"
import { Col } from "react-bootstrap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"
import BubbleChart from "./BubbleChart"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import VotingStatisticsTable from "../components/VotingStatisticsTable"
import { Tab, Tabs } from "react-bootstrap"
import "../styles/Charts.scss"

const Charts = props => {
    const { area, dispatchArea } = useArea()
    const { year } = useYear()

    const data = props.bubbleChartData
    const dataStatisticsTable = props.votingStatistics

    const getBubbleChartData = (data) => {
        const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
        const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
        const colorArray = colors.default
        // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
        // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
        // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi", "Puolueiden äänet yhteensä"]
        const kannatus = objectHelper.filterFromObject(data.payload[0], a => a !== null)
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

    const errorMessage = "Virhe, kokeile uudestaan."

    return (
        <Col id="charts">
            <Tabs defaultActiveKey="kannatus" className="flex-row">
                <Tab eventKey="kannatus" title="Puoluekannatus" className="aanestys-tab">
                    {(!data.error && data.payload) ?
                        <BubbleChart
                            data={getBubbleChartData(data)}
                            title={props.chartTitle}
                            useLabels={true}
                            width={700}
                            height={700}
                            loading={data.loading}
                        /> : errorMessage
                    }
                </Tab>
                <Tab eventKey="Aanestystiedot" title="Aanestystiedot" className="aanestys-tab">
                    {(!dataStatisticsTable.loading && !dataStatisticsTable.error && dataStatisticsTable.payload) ?
                        <VotingStatisticsTable title={props.chartTitle} data={props.votingStatistics.payload} />
                        : dataStatisticsTable.error ? errorMessage : data.loading && "Ladataan"}
                </Tab>
            </Tabs>
        </Col>
    )
}

export default Charts
