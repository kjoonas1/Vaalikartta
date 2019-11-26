import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import Charts from "./Charts"

const Etusivu = () => {
    // Karttatyypit valtiolle, vaalipiireille ja kunnille
    const chartsRef = React.createRef();

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
            map: <ElectionMap chartsRef={chartsRef}/>,
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
                            <ControlledTabs tabs={maps} />
                        </Col>
                        <Col xs={12} xl={8}>
                            <Charts chartsRef={chartsRef}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Etusivu
