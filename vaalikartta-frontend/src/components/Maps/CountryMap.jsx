import React from "react"
import { suomiKartta } from "../../dataset/SVGMapParts"
import "../../styles/Constituency.scss"
import shortid from "shortid"
import { useYear } from "../../contexts/YearContextProvider"
import { useArea } from "../../contexts/AreaContextProvider"
import { Link } from "react-router-dom"


export const CountryMap = props => {
    const { year } = useYear()
    const { dispatchArea } = useArea()

    const mapType = () => (suomiKartta)

    const _map = mapType(year)
    return (
        <div className="constituency-map">
            <svg
                style={{ width: "100%", maxHeight: props.height }}
                version="1.1"
                viewBox="0 0 158.07 277.62"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Link
                    to=""
                    onClick={() => {
                        dispatchArea({type: "CHANGE_COUNTRY_TO", to: "Koko maa"})
                        props.chartsRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }}
                >
                    <g transform="translate(-21.222 -12.752)">
                        {/* eslint-disable-next-line */}
                        {Object.entries(_map).map(([key, val]) => {
                            const el = React.cloneElement(val.path, {
                                fill: "#0073e6",
                                opacity: "0.6",
                                outline: "0",
                                className: "map-part-active-no-animation"
                            })
                            return <g key={shortid.generate()}>{el}</g>
                        })}
                    </g>
                </Link>
            </svg>
        </div>
    )
}
