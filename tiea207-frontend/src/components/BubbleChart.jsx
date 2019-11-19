import React, { useEffect, useState, useCallback } from "react"
import * as d3 from "d3"

const BubbleChart = props => {

    const minValue = 0.95 * d3.min(props.data, item => item.v)
    const maxValue = 1.05 * d3.max(props.data, item => item.v)
    const [data, setData] = useState(props.data)
    const padding = 8
    const simulation = d3.forceSimulation()
    const isCancelled = React.useRef(false)

    // Näitä useCallback-hommeleita 'pitää vaan käyttää' jotta React on tyytyväinen
    const radiusScale = useCallback(value => {
        const fx = d3
            .scaleLinear()
            .range([10, props.width / 6])
            .domain([minValue, maxValue])

        return fx(value)
    }, [minValue, maxValue, props.width])

    const simulatePositions = useCallback(data => {
        simulation
            .nodes(data)
            .alphaDecay(0.1)
            .force("x", d3.forceX().strength(0.0025))
            .force("y", d3.forceY().strength(0.0025))
            .force("collide", d3.forceCollide(d => radiusScale(d.v) + padding))
            .on("tick", () => {
                if (!isCancelled.current) {
                    setData(data)
                }
            })
    }, [radiusScale, simulation])

    useEffect(() => {
        if (data.length) {
            isCancelled.current = false
            simulatePositions(props.data)
        }
        return () => {
            isCancelled.current = true
        }
    }, [props.data, data.length, simulatePositions])

    const renderBubbles = data => {
        const bubbles = data.map((item, index) => {
            const fontSize = radiusScale(item.v) / 40 + 0.35 // lisätään vakio, jotta pienissä palloissa oleva teksti näkyy
            if (item.x && item.y && item.v) {
                return (
                    <g key={index} transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}>
                        {item.v > 0 && <>
                            <circle
                                r={radiusScale(item.v) + 5}
                                fill={item.color}
                                stroke={d3.color(item.color).darker(0.5)}
                                strokeWidth="3"
                            />
                            <text dy="0%" fill={d3.hsl(d3.color(item.color)).l > 0.7 ? "#555" : "#fff"} textAnchor="middle" fontSize={`${fontSize}em`} fontWeight="bold">
                                {/* Muu puolueen takia säädetään rivitystä */}
                                {item.text.split(" ").map((word, i) => {
                                    let y = 0
                                    if (item.text.split(" ").length > 1) y = 0.5
                                    return (
                                        <tspan key={i} x="0" dy={i * 1.5 - y + "em"}>
                                            {word}
                                        </tspan>
                                    )
                                })}
                                <tspan x="0" dy={"1em"}>
                                    {item.v}
                                </tspan>
                            </text> </>}
                    </g>
                )
            }
            return null
        })
        return bubbles
    }

    if (data.length) {
        return (
            <>
                <h4>{props.title}</h4>
                <svg width={props.width} height={props.height}>
                    {renderBubbles(data)}
                </svg>
            </>
        )
    }
    else return <>Ladataan kuplakaaviota...</>
}

export default BubbleChart
