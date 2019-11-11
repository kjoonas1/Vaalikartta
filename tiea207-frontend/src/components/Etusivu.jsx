import React from "react"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { Timeline } from "./Timeline"
import { ConstituencyMap } from "./Maps/ConstituencyMap"
import * as objectHelper from "../utils/objectHelper"
import * as MapParts from "../dataset/SVGMapParts"
import * as colors from "../dataset/partyColors.json"
import { timelineData } from "../dataset/timelineData"
import { ControlledTabs } from "./ControlledTabs"
import { ElectionMap } from "./Maps/ElectionMap"
import { CountryMap } from "./Maps/CountryMap"
import { backendUrl } from "../constants"
import { useArea } from "../contexts/AreaContextProvider"
import { useYear } from "../contexts/YearContextProvider"
import Charts from "./Charts"

const Etusivu = () => {
    const { area, dispatchArea } = useArea()
    const { year } = useYear()

    const uudetVaalipiirit = MapParts.uudetVaalipiirit.map(key => key.name)
    const vanhatVaalipiirit = MapParts.vanhatVaalipiirit.map(key => key.name)
    const colorArray = colors.default
    const kuntaData = useFetch(`${backendUrl}/api/kunnat/koordinaatit/${year}`)

    const url = (active) => {
        switch (active) {
        case "Koko maa": return `${backendUrl}/api/koko-maa/kannatus/${year}`
        case "Vaalipiirit": return `${backendUrl}/api/vaalipiirit/kannatus/${area.constituency}/${year}`
        case "Kunnat": return `${backendUrl}/api/kunnat/kannatus/${area.district}/${year}`
        default: return null
        }
    }

    // TODO: Järkeistä kokonaisuus niin, että kannatusten datan käpistely tapahtuu jossain muualla
    const kannatusHaku = useFetch(url(area.active))
    // Tehdään taulukko, jossa on kukin puolue ja sen kannatus.
    // Jätetään pois kentät joiden nimi on removeAttributesissa (eivät ole puolueita):
    // Järjestetään äänestysprosentin mukaan laskevaan järjestykseen
    if (kannatusHaku.error === null) {
        const removeAttributes = ["Alue", "_id", "Vuosi", "tyyppi", "aluekoodi", "Puolueiden äänet yhteensä"]
        const kannatus = objectHelper.filterFromObject(kannatusHaku.data[0], a => a !== null)
        const puolueLuvut = objectHelper
            .extractArrayOfResponseData(kannatus, removeAttributes, "name", "vote")
            
        // Jos valittua aluetta ei enää vuoden vaihdon jälkeen ole, poistetaan aluevalinta
        if (year > 2011 && vanhatVaalipiirit.includes(area) && !uudetVaalipiirit.includes(area)) dispatchArea({type: "CHANGE_CONSTITUENCY_TO", to:null})
        else if (year <= 2011 && !vanhatVaalipiirit.includes(area) && uudetVaalipiirit.includes(area)) dispatchArea({type: "CHANGE_CONSTITUENCY_TO", to:null})

        // Haetaan puolueen luvut, nimet sekä tunnusvärit
        // eslint-disable-next-line
        const chartData = puolueLuvut.map(party => {
            const puolue = colorArray.find(col => col.name.toUpperCase() === party.name.toUpperCase())
            const color = () => {
                return puolue && puolue.color ? puolue.color : "#bdbdbd"
            }
            return { fill: color(), name: party.name, vote: party.vote }
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
                map:  <ElectionMap mapData={kuntaData.data}/>,
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
                                <Charts />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
    if (kannatusHaku.error) return <div>Error</div>
}

export default Etusivu
