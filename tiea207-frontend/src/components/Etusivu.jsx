
import React, { useEffect, Fragment, useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import chart from "../chart.png"
import { AreaContext, YearContext } from "../Contexts"
//import { ElectionMap } from "./ElectionMap"
import { ConstituencyMap } from "./ConstituencyMap"

const Etusivu = () => {

    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const mapData = useFetch("http://localhost:8000/api/maps/municipalityborders")
    // const areaData = useFetch("http://localhost:8000/api/districts/district/", {district: area})
    const timelineData = {
        years: [1983, 1987, 1991, 1995, 1999, 2003, 2007, 2011, 2015, 2019],
        events: [
            {
                name: "Neuvostoliiton hajoaminen",
                year: 1991
            },
            {
                name: "Testitesti",
                year: 2006
            }
        ]
        
    }

    
    
    const vaalipiiriKannatus = useFetch(`http://localhost:8000/api/vaalipiirit/kannatus/${area}/${year}`)

    {!vaalipiiriKannatus.error && !vaalipiiriKannatus.isLoading && !vaalipiiriKannatus.isLoading
        && year && area && 
        Object.keys(vaalipiiriKannatus.data).map((key, index) => {
            vaalipiiriKannatus.data[key].map((value, index) => {
                Object.keys(value).map((key, index) => {
                    console.log(value[key])
                })
            })
        })
    }
    
    
    if (mapData.isLoading) 
        return <div>Loading map data...</div>
    
    if (!mapData.isLoading && mapData.error === null) {
        return (
            <Fragment>
                <Row className="timeline">
                    <Timeline data={timelineData} />
                </Row>
                <Row>
                    <Col xs={12} xl={4}>
                        {/* <ElectionMap map    Data={mapData}/> */ }
                        <ConstituencyMap height="35em"/>
                    </Col>
                    <Col xs={12} xl={8}>
                        <p>{area} - {year}</p>
                        
                    </Col>
                </Row>
            </Fragment>
        )
    } else return (<div>Error</div>)
}


export default Etusivu
