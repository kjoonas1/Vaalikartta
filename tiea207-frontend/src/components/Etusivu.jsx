import React, { Fragment, useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { AreaContext, YearContext } from "../Contexts"
//import { ElectionMap } from "./ElectionMap"
import { ConstituencyMap } from "./ConstituencyMap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import {DataChart} from "./DataChart"
import {colors} from "../dataset/partyColors"
import {timelineData} from "../dataset/timelineData"

const Etusivu = () => {

    const { area, setArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)

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
        else if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area)) setArea(null)

        
        const luvut = puolueLuvut.map((party) => {
            const puolue = colors.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => { 
                if (puolue && puolue.color) return puolue.color
                else return "#bdbdbd" 
            };

            return (
                {  fill: color(),  name: party.name, vote: party.vote}
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

                        <DataChart luvut={luvut}/>
                    </Col>
                </Row>
            </Fragment>
        )
    } if (vaalipiiriKannatus.error) return (<div>Error</div>)
}

export default Etusivu
