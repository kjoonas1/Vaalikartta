import React from "react"
import { Col, Row } from "react-bootstrap"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"

import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"

import Charts from "./Charts"

const Etusivu = () => {


    //console.log(puolueLuvut)
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
                        <Charts />
                    </Row>
                </Col>
            </Row>
        </>
    )
}


export default Etusivu
