/* eslint-disable */

import React, { useEffect, useState } from "react"
import * as d3 from "d3"

const BubbleChart = props => {

    const minValue = 0.95 * d3.min(props.data, item => item.v)
    const maxValue = 1.05 * d3.max(props.data, item => item.v)
    const [data, setData] = useState(props.data)
    const padding = 8

    let mounted = true

    // Tähän pitäisi tehdä cleanup funktio. Heittää virheilmoituksen konsoliin kun vaihdetaan esim. koko maasta vaalipiireihin ellei aluetta ole valittu.
    useEffect(() => {
        if (data.length && mounted) simulatePositions(props.data, mounted)
    }, [props.data])

    const simulatePositions = (data, mounted) => {
        if (mounted) {
            d3
                .forceSimulation()
                .nodes(data)
                .velocityDecay(0.5)
                .force("x", d3.forceX().strength(0.000125))
                .force("y", d3.forceY().strength(0.000125))
                .force("collide", d3.forceCollide(d => radiusScale(d.v) + padding))
                .on("tick", () => {
                    if (data.length) {
                        setData(data)
                    }
                })
        }
    }

    const radiusScale = value => {
        const fx = d3
            .scalePow().exponent(0.4)
            .range([6, 90])
            .domain([minValue, maxValue])

        return fx(value)
    }

    const renderBubbles = data => {
        const color = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .interpolate(d3.interpolateHcl)
            .range(["#eb001b", "#f79e1b"])

        // render circle and text elements inside a group
        const texts = data.map((item, index) => {
            const fontSize = radiusScale(item.v) / 32
            {
                if (item.x && item.y && item.v)
                    return (
                        <g key={index} transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}>
                            {item.v > 0 && <>
                                <circle
                                    r={radiusScale(item.v)+5}
                                    fill={item.color}
                                    stroke={d3.rgb(color(item.v)).brighter(2)}
                                    strokeWidth="1"
                                />
                                <text dy="0%" fill="#fff" textAnchor="middle" fontSize={`${fontSize}em`} fontWeight="bold">
                                    <tspan x="0" dy="0em">
                                        {item.text}
                                    </tspan>
                                    <tspan x="0" dy="1em">
                                        {item.v}
                                    </tspan>
                                </text> </>}
                        </g>
                    )
            }
        })

        return texts
    }

    if (data.length) {

        return (
            <svg width={props.width} height={props.height}>
                {renderBubbles(data)}
            </svg>
        )
    }
    return <div>Loading</div>
}

export default BubbleChart
