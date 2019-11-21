import React from "react"
import { useFetch } from "../hooks/UseFetch"
import { Col } from "react-bootstrap"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"
import BubbleChart from "./BubbleChart"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import VotingStatisticsTable from "../components/VotingStatisticsTable"
import KuntaStatisticsTable from "../components/KuntaStatisticsTable"
import { Tab, Tabs } from "react-bootstrap"

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
                return `${backendUrl}/api/kunnat/kannatus/${area.district}/${year}`
            default:
                return null
        }
    }
    const { data, error, isLoading } = useFetch(url(area.active))

    if (isLoading) return <>Ladataan</>
    if (error) return <>Virhe</>

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
    }).sort((a, b) => b.v - a.v)
    // Sorttauksella voidaan määrittää pallojen järjestyminen

    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Vaalipiirit":
                return area.constituency !== undefined ? area.constituency : ""
            case "Koko maa":
                return area.country !== undefined ? area.country : ""
            case "Kunnat":
                return area.district !== undefined ? area.district : ""
            default:
                return ""
        }
    }
    const chartTitle = getTitle(area.active, area)
    if (chartData.length && !isLoading) {
        return (
            <Col xs={12} xl={8}>
                <Tabs defaultActiveKey="kannatus" mountOnEnter={true} >
                    <Tab eventKey="kannatus" title="Puoluekannatus">
                        <BubbleChart
                            data={chartData}
                            title={chartTitle + " " + year}
                            useLabels={true}
                            width={700}
                            height={700}
                        />
                    </Tab>
                    <Tab eventKey="Aanestystiedot" title="Aanestystiedot">
                        <VotingStatisticsTable />
                    </Tab>
                    {(area.active !== "Kunnat") ? null :
                        <Tab eventKey="Kuntatiedot" title="Kuntatiedot">
                            <KuntaStatisticsTable />
                        </Tab>}
                </Tabs>
            </Col>
        )
    }
    return <div>Valitse aika ja paikka</div>
}

export default Charts
