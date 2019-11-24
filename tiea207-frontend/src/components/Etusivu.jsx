import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import Charts from "./Charts"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import { backendUrl } from "../constants"
import { useFetch } from "../hooks/UseFetch"

const Etusivu = () => {

    const { area } = useArea()
    const { year } = useYear()

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

    const aanestystiedotUrl = active => {
        switch (active) {
            case "Koko maa": return `${backendUrl}/api/muut-alueet/aanestystiedot/${area.country}/${year}`
            case "Vaalipiirit": return `${backendUrl}/api/vaalipiirit/aanestystiedot/${area.constituency}/${year}`
            case "Kunnat": return `${backendUrl}/api/kunnat/aanestystiedot/${area.district}/${year}`
            default: return null
        }
    }

    const bubbleChart = useFetch(url(area.active))
    const votingStatistics = useFetch(aanestystiedotUrl(area.active))

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
            map: <ElectionMap />,
            name: "Kunnat"
        }
    ]

    return (
        <>
            <Row className="timeline">
                <Timeline data={timelineData} />
            </Row>
            <Row>
                <Col >
                    <Row>
                        <Col xs={12} xl={4} className="maps">
                            <ControlledTabs tabs={maps} />
                        </Col>
                        <Col xs={12} xl={8}>
                            {(bubbleChart.data.length && !bubbleChart.isLoading && !bubbleChart.error) &&
                                (votingStatistics.data.length && !votingStatistics.isLoading && !votingStatistics.error) ?
                                <Charts votingStatistics={votingStatistics.data} bubbleChartData={bubbleChart.data} />
                                :
                                null}
                            {!bubbleChart.data.length &&
                                <>
                                <h4>{area.active}</h4>
                                    <p>Ei dataa. Alue on todennäköisesti liitetty toiseen tai sitä ei ole vielä ollut olemassa</p>
                                </>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}


export default Etusivu
