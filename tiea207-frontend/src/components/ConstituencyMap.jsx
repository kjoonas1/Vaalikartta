import React, { useContext } from "react"
import { AreaContext, YearContext } from "../Contexts"
import { uudetVaalipiirit, vanhatVaalipiirit } from "./SVGMapParts"
import { Link } from "react-router-dom"

export const ConstituencyMap = (props) => {
    const { area, setArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const mapType = (year) => (year > 2011) ? uudetVaalipiirit : vanhatVaalipiirit

    const _map = mapType(year)

    return (
        <div >
            <svg style={{ width:"100%", maxHeight:props.height }} version="1.1" viewBox="0 0 158.07 277.62" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-21.222 -12.752)">
                    { Object.keys(_map).map((key, index) => {
                        const getMapPart = (area, globalArea, path) => {
                            if (globalArea === area) {
                                return React.cloneElement(path, {fill: "#fcb103", className:"map-part-active"})
                            }
                            return React.cloneElement(_map[key].path, {fill: "#000"})
                        }
                        const mapPart = getMapPart(area, _map[key].name, _map[key].path)
                        return (<Link key={index} to="" onClick={() => {
                            setArea(_map[key].name)
                        }}>{mapPart}
                        </Link>)
                    })}
                </g>
            </svg>
        </div>
    )
}