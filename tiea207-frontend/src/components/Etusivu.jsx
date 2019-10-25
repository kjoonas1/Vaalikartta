import React, { useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { AreaContext, YearContext } from "../Contexts"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import { DataChart } from "./DataChart"
import * as colors from "../dataset/partyColors.json"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"

const Etusivu = () => {
    const { area, setArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
    const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
    const colorArray = colors.default

    const vaalipiiriKannatus = useFetch(`http://localhost:8000/api/vaalipiirit/kannatus/${area}/${year}`)
    // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
    // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
    // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
    if (vaalipiiriKannatus.error === null) {
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi"]
        const kannatus = objectHelper.filterFromObject(vaalipiiriKannatus.data[0], a => a !== null)
        const puolueLuvut = objectHelper
            .extractArrayOfResponseData(kannatus, removeAttributes, "name", "vote")
            
        if (year > 2011 && vanhatVaalipiirit.includes(area) && !uudetVaalipiirit.includes(area)) setArea(null)
        else if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area)) setArea(null)

        const chartData = puolueLuvut.map(party => {
            const puolue = colorArray.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => {
                return puolue && puolue.color ? puolue.color : "#bdbdbd"
            }
            return { fill: color(), name: party.name, vote: party.vote }
        })

        const maps = [
            {
                map: <ConstituencyMap height="35em" />,
                name: "Vaalipiirit"
            },
            {
                map:  <ElectionMap mapData={{data: []}}/>,
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
                                <DataChart luvut={chartData} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
    if (vaalipiiriKannatus.error) return <div>Error</div>
}

export default Etusivu
