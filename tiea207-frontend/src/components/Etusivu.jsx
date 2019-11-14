import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import { backendUrl } from "../constants"
import { useYear } from "../contexts/YearContextProvider"
import { useArea } from "../contexts/AreaContextProvider"
import Charts from "./Charts"
import { useFetch } from "../hooks/UseFetch"

const Etusivu = () => {
    const { year } = useYear()
    const { area, dispatchArea } = useArea()

    const kuntaData = useFetch(`${backendUrl}/api/kunnat/koordinaatit/${year}`)


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
    const kannatusHaku = useFetch(url(area.active))

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
            map: <ElectionMap mapData={kuntaData.data} />,
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
                            {(!kannatusHaku.isLoading && kannatusHaku.error == null) &&
                                <Charts kannatusHaku={kannatusHaku} />}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}


export default Etusivu
