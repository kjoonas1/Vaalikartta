import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import Charts from "./Charts"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import { useQuery } from 'react-fetching-library';

const Etusivu = () => {

    const { area } = useArea()
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

    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Vaalipiirit": return area.constituency !== undefined ? area.constituency : ""
            case "Koko maa": return area.country !== undefined ? area.country : ""
            case "Kunnat": return area.district !== undefined ? area.district : ""
            default: return ""
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

    const coordinates = useQuery({
        method: "GET",
        endpoint: `/api/kunnat/koordinaatit/${year}`
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
            map: <ElectionMap coordinates={coordinates} />,
            name: "Kunnat"
        }
    ]

    const chartTitle = getTitle(area.active, area) + " " + year

    return (
        <>
            <Row className="timeline">
                <Timeline />
            </Row>
            <Row>
                <Col >
                    <Row className="animate-bottom">
                        <Col xs={12} xl={4} className="maps">
                            <ControlledTabs tabs={maps} />
                        </Col>
                        <Col xs={12} xl={8}>
                            <Charts chartTitle={chartTitle} votingStatistics={votingStatistics} bubbleChartData={bubbleChart} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Etusivu
