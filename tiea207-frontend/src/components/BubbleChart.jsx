/* eslint-disable */

import React, { useEffect, useState } from "react"
import * as d3 from "d3"

const BubbleChart = props => {

    var minValue = 0.95 * d3.min(props.data, item => item.v)

    var maxValue = 1.05 *d3.max(props.data, item => item.v)

    const [data, setData] = useState(props.data)

    useEffect(() => {
        if (data.length > 0) {
            simulatePositions(data)
        }
    }, [data])

    const simulatePositions = data => {
        d3
            .forceSimulation()
            .nodes(data)
            .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force("collide", d3.forceCollide(d => radiusScale(d.v) + 2))
            setData(data)
    }
    
    const radiusScale = value => {
        const fx = d3
            .scaleSqrt()
            .range([1, 100])
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
            const fontSize = radiusScale(item.v) / 2
            console.log(item)
            return (
                <g key={index} transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}>
                    <circle
                        r={radiusScale(item.v)}
                        fill={item.color}
                        stroke={d3.rgb(color(item.v)).brighter(2)}
                        strokeWidth="0"
                    />
                    <text dy="0%" fill="#fff" textAnchor="middle" fontSize={`${fontSize}px`} fontWeight="bold">
                        <tspan x="0" dy="0em">
                            {item.text}
                        </tspan>
                        <tspan x="0" dy="1em">
                            {item.v}
                        </tspan>
                    </text>
                </g>
            )
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
