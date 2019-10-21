import React, { useContext } from "react"
import {Link} from "react-router-dom"
import {AreaContext, YearContext} from "../Contexts"
import {uudetVaalipiirit, vanhatVaalipiirit} from "./SVGMapParts"

export const ConstituencyMap = (props) => {
    const { setArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const constituencyMap = (year) => {
        return (year > 2015) ? uudetVaalipiirit : vanhatVaalipiirit
    }
    const _map = constituencyMap(year)

    return (
        <div >
            <svg style={{ width:"100%", maxHeight:props.height }} version="1.1" viewBox="0 0 158.07 277.62" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-21.222 -12.752)">
                    { Object.keys(_map).map((key, index) => {
                        return (<Link key={index} to="" onClick={() => {
                            setArea(_map[key].name)
                        }}>{_map[key].path}
                        </Link>)
                    })}
                </g>
            </svg>
        </div>
    )
}