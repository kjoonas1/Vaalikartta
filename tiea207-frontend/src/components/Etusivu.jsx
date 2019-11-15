import React, { useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { AreaContext, YearContext } from "../contexts/Contexts"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import { DataChart } from "./DataChart"
import * as colors from "../dataset/partyColors.json"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import { backendUrl } from "../constants"
import { VotingStatisticsTable } from "./VotingStatisticsTable"
import { Tabs, Tab } from "react-bootstrap"

const Etusivu = () => {
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

    // TODO: Järkeistä kokonaisuus niin, että kannatusten datan käpistely tapahtuu jossain muualla
    const kannatusHaku = useFetch(url(area.active))
    console.log(kannatusHaku)
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
        const chartData = puolueLuvut.map(party => {
            const puolue = colorArray.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => {
                return puolue && puolue.color ? puolue.color : "#bdbdbd"
            }
            return { fill: color(), name: party.name, vote: party.vote }
        })
        // Karttatyypit valtiolle, vaalipiireille ja kunnille
        const maps = [
            {
                map: <CountryMap height="35em" />,
                name: "Koko maa"
            },
            {
                map: <ConstituencyMap height="35em" />,
                name: "Vaalipiirit"
            },
            {
                map: <ElectionMap mapData={{ data: [] }} />,
                name: "Kunnat"
            }
        ]

        return (
            <>
                <Row className="timeline">
                    <Timeline data={timelineData} />
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={12} xl={4}>
                                <ControlledTabs tabs={maps} />
                            </Col>
                            <Col xs={12} xl={8}>
                                <Tabs defaultActiveKey="kannatus">
                                    <Tab eventKey="kannatus" title="Puoluekannatus">
                                        <DataChart luvut={chartData} />
                                    </Tab>
                                    <Tab eventKey="Aanestystiedot" title="Aanestystiedot">
                                        <VotingStatisticsTable />
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
    if (kannatusHaku.error) return <div>Error</div>
}

export default Etusivu
