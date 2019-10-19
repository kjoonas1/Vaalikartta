import React, { Fragment, useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { AreaContext, YearContext } from "../Contexts"
//import { ElectionMap } from "./ElectionMap"
import { ConstituencyMap } from "./ConstituencyMap"
import shortid from "shortid"

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
    
    Object.filter = (obj, pred) => 
        Object.keys(obj)
            .filter(key => pred(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})

    const kannatus = {}
    if (vaalipiiriKannatus.data[0][0]) {
        // Poistetaan kentät joiden value on null
        kannatus.data = Object.filter(vaalipiiriKannatus.data[0][0], a => a !== null)
    }

    let puolueLuvut = []
    if (kannatus.data) {
        // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
        // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi"]
        puolueLuvut = Object.entries(kannatus.data)
            .reduce((acc, [key, val]) => {
                return removeAttributes.includes(key) ? acc : [...acc, { name: key, vote: val }]
            }, [])
            // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
            .sort((a, b) => b.vote - a.vote)
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
                        <p> {area} - {year} </p>
                        {puolueLuvut.length > 0 &&
                            puolueLuvut.map(party => {
                                return (
                                    <p key={shortid.generate()}>
                                        {party.name + ": " + party.vote}
                                    </p>
                                )
                            })}
                    </Col>
                </Row>
            </Fragment>
        )
    } else return (<div>Error</div>)
}

export default Etusivu
