import React, { useEffect } from "react"
import * as d3 from "d3"
import "../styles/Charts.scss"

const BubbleChart = props => {
    const padding = 3
    const container = React.useRef(null)

    useEffect(() => {
        if (props.data && container.current) {
            // Poistetaan kaikki lapsisolmut ennen kuin tehdään mitään muuta
            d3.select(container.current)
                .selectAll("*")
                .remove()

            const simulation = d3
                .forceSimulation()
                .alphaDecay(0.05)
                .force("x", d3.forceX().strength(0.0125))
                .force("y", d3.forceY().strength(0.0125))
                .force(
                    "collide",
                    d3.forceCollide(d => radiusScale(d.v) + padding)
                )

            const minSize = 10
            const multiplier = 40
            const radiusScale = A =>
                minSize + multiplier * Math.sqrt(A / Math.PI)

            const svg = d3
                .select(container.current)
                .attr("class", "bubblechart")
                .attr("width", "100%")
                .attr("height", props.height)
                .attr(
                    "viewBox",
                    "0 0 " + Math.min(props.width, props.height) + " " + Math.min(props.width, props.height)
                )
                .attr("preserveAspectRatio", "xMinYMin")
                .append("g")
                .style("transform", "translate(52%,55%)")
                
            if (!props.loading) {
                const data = svg.selectAll(".bubble").data(props.data)

                data.exit().remove()

                const bubbles = data
                    .enter()
                    .append("g")
                    .attr("class", "bubble")

                bubbles
                    .append("circle")
                    .attr("r", d => radiusScale(d.v))
                    .attr("fill", d => d.color)
                    .attr("stroke", d => d3.color(d.color).darker(0.5))
                    .attr("stroke-width", 3)
                    .style("opacity", "0.5")
                    .transition()
                    .style("opacity", "1").duration(250)


                const fontSize = d => radiusScale(d.v) / 4 + 10
                const fontColor = color => (d3.hsl(d3.color(color)).l > 0.7 ? "#555" : "#fff")
                const texts = bubbles
                    .append("text")
                    .text(d => d.text)
                    .attr("text-anchor", "middle")
                    .attr("font-size", fontSize)
                    .attr("font-weight", "bold")
                    .attr("fill", d => fontColor(d.color))

                bubbles
                    .append("text")
                    .text(d => d.v)
                    .attr("text-anchor", "middle")
                    .attr("font-size", fontSize)
                    .attr("font-weight", "bold")
                    .attr("fill", d => fontColor(d.color))

                simulation.nodes(props.data).on("tick", () => {
                    bubbles.attr("transform", d => `translate(${d.x}, ${d.y})`)
                    texts.attr("y", d => radiusScale(d.v) / 4 + 10)
                })
            }
        }
    }, [props])

    if (props.data.length) {
        return (
            <>
                <h4>{props.title}</h4>
                <svg ref={container} width={props.width} height={props.height} />
            </>
        )
    }
    return null
}

export default BubbleChart
