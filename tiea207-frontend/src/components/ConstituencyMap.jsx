import React, { useContext } from "react"
import {Link} from "react-router-dom"
import {AreaContext} from "../Contexts"
import {UudetVaalipiirit} from "./SVGMapParts"

export const ConstituencyMap = (props) => {
    const { setArea } = useContext(AreaContext)
    return (
        <div >
            <svg style={{ width:"100%", maxHeight:props.height }} version="1.1" viewBox="0 0 158.07 277.62" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-21.222 -12.752)">
                    { Object.keys(UudetVaalipiirit).map((key, index) => {
                        return (<Link key={index} to="" onClick={() => {
                            setArea(UudetVaalipiirit[key].name)
                        }}>{UudetVaalipiirit[key].path}
                        </Link>)
                    })}
                </g>
            </svg>
        </div>
    )
}