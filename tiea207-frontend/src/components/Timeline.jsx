import React, { useContext, Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import {Link} from "react-router-dom"
import { YearContext } from "../Contexts"

export const Timeline = (props) => {
    
    const SVG_WIDTH = 50 // kerroin
    const { setYear } = useContext(YearContext)
    const years = props.data.years

    return (
        <Col md={{ span: 10, offset: 1 }}>
            <svg key={shortid.generate()} height="10rem" width={"65vw"} display= "block" margin="0, auto">
                <line key={shortid.generate()} x1="2vw" y1="1rem" x2={"52vw"} y2="1rem" style={ {stroke:"#404040", strokeWidth:"0.25rem"} } />
                { years.map((year, index) => {
                    const x = 2+(SVG_WIDTH*(index/(years.length-1)))
                    const lineX = x.toString() + "vw"
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link to="/#" onClick={() => { setYear(year)} }>
                                <line key={shortid.generate()} x1={lineX} y1="0.5rem" x2={lineX} y2="2rem" style={ {stroke:"#404040", strokeLinecap:"round", strokeWidth:"0.25rem"} } />
                                <text textAnchor="middle"  key={shortid.generate()} x={lineX} y="3rem" fill="#404040">{year}</text>
                            </Link>
                        </Fragment>
                    )
                })}
            </svg>
        </Col>
    )
}