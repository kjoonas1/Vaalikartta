import React, { useContext, Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import {Link} from "react-router-dom"
import { YearContext } from "../Contexts"

export const Timeline = (props) => {
    
    const { year, setYear } = useContext(YearContext)
    const years = props.data.years
    const events = props.data.events
    const contextYear = year;

    return (
        <Col md={{ span: 12 }}>
            <svg key={shortid.generate()} height="14em" viewBox={"0 0 2400 400"} width={"100%"} display= "block" margin="0, auto">
                <line key={shortid.generate()} x1="10%" y1="6em" x2={"90%"} y2="6em" style={ {stroke:"#404040", strokeWidth:"0.5em"} } />
                { years.map((year, index) => {
                    const x = (80*(index/(years.length-1)))
                    const lineX = (10 + x).toString()
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
                { events.map((event, index) => {
                    const minYear = Math.min(...years)
                    const maxYear = Math.max(...years)
                    const x = 10+(80*(event.year-minYear)/(maxYear - minYear))
                    return (
                    <Fragment key={shortid.generate()}>
                        <Link to="/#">
                            <line key={shortid.generate()} x1={(x) + "%"} y1="6em" x2={(x) + "%"} y2="8em" style={ {stroke:"#404040", strokeLinecap:"round", strokeWidth:"0.25em"} } />
                            <circle stroke="black" fillOpacity="0.25" strokeWidth="2" fill="#fcb103" cx={x+ "%"} cy="9em" r="1em" ></circle>
                        </Link>
                    </Fragment>)
                })}
            </svg>
        </Col>
    )
}