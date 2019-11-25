import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import Charts from "./Charts"
import { useYear } from "../contexts/YearContextProvider"
import { useQuery } from 'react-fetching-library';

const Etusivu = () => {
    const { year } = useYear()

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



    return (
        <>
            <Row className="timeline">
                <Timeline />
            </Row>
            <Row>
                <Col >
                    <Row className="animate-bottom">
                        <Col xs={12} xl={4} className="maps">
                            <ControlledTabs tabs={maps} loading={coordinates.loading} />
                        </Col>
                        <Col xs={12} xl={8}>
                            <Charts />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Etusivu
