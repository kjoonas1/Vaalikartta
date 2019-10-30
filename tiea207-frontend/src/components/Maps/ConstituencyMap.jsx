import React, { useContext } from "react"
import { AreaContext, YearContext } from "../../contexts/Contexts"
import { uudetVaalipiirit, vanhatVaalipiirit } from "../../dataset/SVGMapParts"
import { Link } from "react-router-dom"
import "../../styles/Constituency.scss"

export const ConstituencyMap = props => {
    const { area, dispatchArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const mapType = year => (year > 2011 ? uudetVaalipiirit : vanhatVaalipiirit)
    const _map = mapType(year)

    return (
        <div className="constituency-map">
            <svg
                style={{ width: "100%", maxHeight: props.height }}
                version="1.1"
                viewBox="0 0 158.07 277.62"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="translate(-21.222 -12.752)">
                    {Object.keys(_map).map((key, index) => {
                        const getMapPart = (area, globalArea, path) => {
                            if (globalArea === area) {
                                return React.cloneElement(path, {
                                    fill: "#fcb103",
                                    outline: "0",
                                    className: "map-part-active"
                                })
                            }
                            return React.cloneElement(_map[key].path, { fill: "#000" })
                        }
                        const mapPart = getMapPart(area.constituency, _map[key].name, _map[key].path)
                        return (
                            <Link
                                data-testid={"constituency-link-" + index}
                                key={index}
                                to=""
                                onClick={() => {
                                    dispatchArea({ type: "CHANGE_CONSTITUENCY_TO", to: _map[key].name })
                                }}
                            >
                                {mapPart}
                            </Link>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
