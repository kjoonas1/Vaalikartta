import React, { useContext, Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import {Link} from "react-router-dom"
import { YearContext, EventContext } from "../Contexts"

export const Timeline = (props) => {
    
    const { year, setYear } = useContext(YearContext)
    const { event, setEvent } = useContext(EventContext)

    const years = props.data.years
    const events = props.data.events

    const contextYear = year
    const contextEvent = event
    const padding = 10

    return (
        <Col md={{ span: 12 }}>
            <svg key={shortid.generate()} height="14em" viewBox={"0 0 2400 400"} width={"100%"} display= "block" margin="0, auto">
                <line key={shortid.generate()} x1={padding + "%"} y1="6em" x2={(100-padding) + "%"} y2="6em" style={ {stroke:"#404040", strokeWidth:"0.5em"} } />
                { years.map((year, index) => {
                    const x = ((100-2*padding)*(index/(years.length-1))) // Vaakaviivojen ja tekstin paikka, jossa ei vielä huomioida paddingia
                    const lineX = (padding + x).toString()
                    const bolding = contextYear === year ? "bold" : "normal"
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link key={shortid.generate()} to="/#" onClick={() => { setYear(year)} }>
                                <line key={shortid.generate()} x1={(lineX) + "%"} y1="6em" x2={(lineX) + "%"} y2="4em" style={ {stroke:"#404040", strokeLinecap:"round", strokeWidth:"0.5em"} } />
                                <text textAnchor="middle" fontSize="2.5em" key={shortid.generate()} x={lineX+ "%"} y="1em" fill="#404040" fontWeight={bolding}>{year}</text>
                            </Link>
                        </Fragment>
                    )
                })}
                { events.map((event) => {
                    const minYear = Math.min(...years)
                    const maxYear = Math.max(...years)
                    const x = padding+(100-2*padding)*(event.year-minYear)/(maxYear - minYear)
                    const isActive = JSON.stringify(event) === JSON.stringify(contextEvent)
                    const eventActiveness = {
                        fill: isActive ? "1" : "0.25",
                        size: isActive ? "1.5em" : "1em"
                    }
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link to="/#" onClick={() => { setEvent(event)} }>
                                <line key={shortid.generate()} x1={(x) + "%"} y1="6em" x2={(x) + "%"} y2="8em" style={ {stroke:"#404040", strokeLinecap:"round", strokeWidth:"0.25em"} } />
                                <circle stroke="black" fillOpacity={eventActiveness.fill} strokeWidth="2" fill="#fcb103" cx={x+ "%"} cy="9em" r={eventActiveness.size} ></circle>
                            </Link>
                        </Fragment>
                    )
                })}
            </svg>
        </Col>
    )
}