import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
<<<<<<< HEAD
import { backendUrl } from "../constants"
import { VotingStatisticsTable } from "./VotingStatisticsTable"
import { Tabs, Tab } from "react-bootstrap"
import { KuntaStatisticsTable } from "./KuntaStatisticsTable"
=======
import Charts from "./Charts"
>>>>>>> 2e55b2a671c725421c93eb3323f4fced230ab513

const Etusivu = () => {
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
            map: <ElectionMap/>,
            name: "Kunnat"
        }
<<<<<<< HEAD
    }

    // TODO: Järkeistä kokonaisuus niin, että kannatusten datan käpistely tapahtuu jossain muualla
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
                                    <Tab eventKey="Kuntatiedot" title="Kuntatiedot">
                                        <KuntaStatisticsTable />
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
=======
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
                            <Charts />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
>>>>>>> 2e55b2a671c725421c93eb3323f4fced230ab513
}


export default Etusivu
