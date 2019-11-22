import React, { useEffect, useState, useCallback } from "react"
import { unmountComponentAtNode } from "react-dom"
import * as d3 from "d3"

const BubbleChart = props => {

    const minValue = 0.95 * d3.min(props.data, item => item.v)
    const maxValue = 1.05 * d3.max(props.data, item => item.v)
    const padding = 8
    const container = React.useRef(null)

    // Näitä useCallback-hommeleita 'pitää vaan käyttää' jotta React on tyytyväinen
    const radiusScale = value => {
        const fx = d3
            .scaleLinear()
            .range([10, props.width / 6])
            .domain([minValue, maxValue])

        return fx(value)
    }
    console.log(props.data)
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX().strength(0.05))
        .force("y", d3.forceY().strength(0.05))
        .force("collide", d3.forceCollide(d => radiusScale(d.v) + padding))

    useEffect(
        () => {
            if (props.data && container.current) {
                const svg = d3.select(container.current)
                    .append("g")
                    .attr("transform", `translate(${props.width / 2},${props.height / 2})`)

                const data = svg.selectAll(".bubble")
                    .data(props.data)
                data.
                    exit().
                    remove()
                const bubbles = data.enter()
                    .append("g")
                    .attr("class", "bubble")

                const circles = bubbles.append("circle")
                    .attr("r", (d) => radiusScale(d.v) + 5)
                    .attr("fill", (d) => d.color)
                    .attr("stroke", (d) => d3.color(d.color).darker(0.5))
                    .attr("stroke-width", 3)

                const texts = bubbles.append("text")
                    .text((d) => d.text)
                    .attr("text-anchor", "middle")
                //      .attr("")


                simulation.nodes(props.data)
                    .on("tick", () => {
                        bubbles
                            .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
                            //.attr("cx", (d) => d.x)
                            //.attr("cy", (d) => d.y)
                    //    texts
                  //          .attr("x", -5)

                    })
            }
        }, [])
    if (props.data.length) {
        return (
            <>
                <h4>{props.title}</h4>
                <svg ref={container} width={props.width} height={props.height}>
                </svg>
            </>
        )
    }
    else return <>Ladataan kuplakaaviota...</>
}

export default BubbleChart
