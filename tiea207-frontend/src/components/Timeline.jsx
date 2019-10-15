import React, { useContext, Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import {Link} from "react-router-dom"
import { YearContext } from "../Contexts"

export const Timeline = (props) => {
    
    const SVG_WIDTH = 50 // kerroin
    const { setYear } = useContext(YearContext)

    return (
        <Col md={{ span: 10, offset: 1 }}>
            <svg key={shortid.generate()} height="10rem" width={"65vw"} display= "block" margin="0, auto">
                <line key={shortid.generate()} x1="2vw" y1="1rem" x2={"52vw"} y2="1rem" style={ {stroke:"rgb(15,15,15)", strokeWidth:"5"} } />
                { props.years.map((year, index) => {
                    const x = 2+(SVG_WIDTH*(index/(props.years.length-1)))
                    const lineX = x.toString() + "vw"
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link to="/#" onClick={() => { setYear(year)} }>
                                <line key={shortid.generate()} x1={lineX} y1="-25" x2={lineX} y2="25" style={ {stroke:"rgb(15,15,15)", strokeWidth:"5"} } />
                                <text textAnchor="middle" key={shortid.generate()} x={lineX} y="3rem" fill="black">{year}</text>
                            </Link>
                        </Fragment>
                    )
                })}
            </svg>
        </Col>
    )
}