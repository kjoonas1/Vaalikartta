import React, { useContext, Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import {Link} from "react-router-dom"
import { YearContext } from "../Contexts"

export const Timeline = (props) => {
    
    const { setYear } = useContext(YearContext)
    const years = props.data.years
    const events = props.data.events


    return (
        <Col md={{ span: 12 }}>
            <svg key={shortid.generate()} height="10em" viewBox={"0 0 2400 400"} width={"100%"} display= "block" margin="0, auto">
                <line key={shortid.generate()} x1="10%" y1="1em" x2={"90%"} y2="1em" style={ {stroke:"#404040", strokeWidth:"0.5em"} } />
                { years.map((year, index) => {
                    const x = (80*(index/(years.length-1)))
                    const lineX = (10 + x).toString()
                    
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link key={shortid.generate()} to="/#" onClick={() => { setYear(year)} }>
                                <line key={shortid.generate()} x1={(lineX) + "%"} y1="1em" x2={(lineX) + "%"} y2="3em" style={ {stroke:"#404040", strokeLinecap:"round", strokeWidth:"0.5em"} } />
                                <text textAnchor="middle" fontSize="2.5em" key={shortid.generate()} x={lineX+ "%"} y="3em" fill="#404040">{year}</text>
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
                            <circle stroke="black" fillOpacity="0.4" strokeWidth="2" fill="#fcb103" cx={x+ "%"} cy="1em" r="15" ></circle>
                        </Link>
                    </Fragment>)
                })}
            </svg>
        </Col>
    )
}