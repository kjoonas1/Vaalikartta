import React, { Fragment, useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { AreaContext, YearContext } from "../Contexts"
//import { ElectionMap } from "./ElectionMap"
import { ConstituencyMap } from "./ConstituencyMap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "./SVGMapParts"
import {DataChart} from "./DataChart"

const Etusivu = () => {

    const { area, setArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    // const mapData = useFetch("http://localhost:8000/api/maps/municipalityborders")
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

    const uudetVaalipiirit = (MapParts.uudetVaalipiirit.map((key) => key.name))
    const vanhatVaalipiirit = (MapParts.vanhatVaalipiirit.map((key) => key.name))

    const vaalipiiriKannatus = useFetch(`http://localhost:8000/api/vaalipiirit/kannatus/${area}/${year}`)
    // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
    // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
    // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen


    if (vaalipiiriKannatus.error === null) {
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi"]
        const kannatus = objectHelper.filterFromObject(vaalipiiriKannatus.data[0], a => a !== null)
        const puolueLuvut = objectHelper.extractArrayOfResponseData(kannatus, removeAttributes, "name", "vote")
            .sort((a, b) => b.vote - a.vote )

        if (year > 2011 && vanhatVaalipiirit.includes(area) && !uudetVaalipiirit.includes(area)) setArea(null)
        if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area)) setArea(null)

        const luvut = puolueLuvut.map((party) => {
            return (
                { name: party.name, vote: party.vote }
            )
        })


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
                        {area === null && <p>Aluetta ei valittu</p>}
                        <p> {area} - {year} </p>
                        <DataChart luvut={luvut}/>
                    </Col>
                </Row>
            </Fragment>
        )
    } if (vaalipiiriKannatus.error) return (<div>Error</div>)
}

export default Etusivu
