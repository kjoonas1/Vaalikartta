/* eslint-disable */

import React from "react"
import * as d3 from "d3"

class BubbleChart extends React.Component {
    constructor(props) {
        super(props)

        this.minValue = 1
        this.maxValue = 100
        this.mounted = false

        this.state = {
            data: []
        }

        this.radiusScale = this.radiusScale.bind(this)
        this.simulatePositions = this.simulatePositions.bind(this)
        this.renderBubbles = this.renderBubbles.bind(this)
    }

    componentWillMount() {
        this.mounted = true
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.minValue =
                0.95 *
                d3.min(this.props.data, item => {
                    return item.v
                })

            this.maxValue =
                1.05 *
                d3.max(this.props.data, item => {
                    return item.v
                })
            this.simulatePositions(this.props.data)
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    radiusScale = value => {
        const fx = d3
            .scaleSqrt()
            .range([10, 100])
            .domain([this.minValue, this.maxValue])

        return fx(value)
    }

    simulatePositions = data => {
        this.simulation = d3
            .forceSimulation()
            .nodes(data)
            .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force(
                "collide",
                d3.forceCollide(d => {
                    return this.radiusScale(d.v) + 2
                })
            )
            .on("tick", () => {
                if (this.mounted) {
                    this.setState({ data })
                }
            })
    }

    renderBubbles = data => {
        const minValue =
            0.95 *
            d3.min(data, item => {
                return item.v
            })

        const maxValue =
            1.05 *
            d3.max(data, item => {
                return item.v
            })

        const color = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .interpolate(d3.interpolateHcl)
            .range(["#eb001b", "#f79e1b"])

        // render circle and text elements inside a group
        const texts = data.map((item, index) => {
            const props = this.props
            const fontSize = this.radiusScale(item.v) / 2
            return (
                <g key={index} transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}>
                    <circle
                        r={this.radiusScale(item.v)}
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

    render() {
        if (this.state.data.length) {
            return (
                <svg width={this.props.width} height={this.props.height}>
                    {this.renderBubbles(this.state.data)}
                </svg>
            )
        }

        return <div>Loading</div>
    }
}

export default BubbleChart
