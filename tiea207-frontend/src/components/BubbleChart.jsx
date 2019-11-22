import React, { useEffect } from "react"
import * as d3 from "d3"

const BubbleChart = props => {
    const padding = 8
    const container = React.useRef(null)

    // React valittaa dependency arraysta, mutta tässä on tarkoituksella "tehty väärin"
    // jotta useEffect ajetaan vain "mountatessa". Jos propsit lisätään taulukkoon, niin d3 aiemmin piirtämä
    // chartti jää näkyviin.
    useEffect(
        () => {
            if (props.data && container.current) {
                
                const minValue = 0.95 * d3.min(props.data, item => item.v)
                const maxValue = 1.05 * d3.max(props.data, item => item.v)

                const simulation = d3.forceSimulation()
                    .alphaDecay(0.05)
                    .force("x", d3.forceX().strength(0.025))
                    .force("y", d3.forceY().strength(0.025))
                    .force("collide", d3.forceCollide(d => radiusScale(d.v) + padding))

                const radiusScale = value => {
                    const fx = d3
                        .scaleLinear()
                        .range([10, props.width / 6])
                        .domain([minValue, maxValue])
                    return fx(value)
                }

                const svg = d3.select(container.current)
                    .append("g")
                    .attr("transform", `translate(${props.width / 2},${props.height / 2})`)

                const data = svg.selectAll(".bubble")
                    .data(props.data)

                data
                    .exit()
                    .remove()

                const bubbles = data.enter()
                    .append("g")
                    .attr("class", "bubble")

                bubbles.append("circle")
                    .attr("r", (d) => radiusScale(d.v) + 5)
                    .attr("fill", (d) => d.color)
                    .attr("stroke", (d) => d3.color(d.color).darker(0.5))
                    .attr("stroke-width", 3)

                const fontSize = (d) => radiusScale(d.v) / 4 + 10
                const texts = bubbles.append("text")
                    .text((d) => d.text)
                    .attr("text-anchor", "middle")
                    .attr("font-size", fontSize)
                    .attr("font-weight", "bold")
                    .attr("fill", (d) => d3.hsl(d3.color(d.color)).l > 0.7 ? "#555" : "#fff")

                const percents = bubbles.append("text")
                    .text((d) => d.v)
                    .attr("text-anchor", "middle")
                    .attr("font-size", fontSize)
                    .attr("font-weight", "bold")
                    .attr("fill", (d) => d3.hsl(d3.color(d.color)).l > 0.7 ? "#555" : "#fff")

                simulation.nodes(props.data)
                    .on("tick", () => {
                        bubbles
                            .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
                        texts
                            .attr("y", (d) => (radiusScale(d.v) / 4 + 10))
                    })
            } 
            // Tää on ihan sen takia ettei komponenttia päivitetä muuta kuin mountatessa.
            // Muuten d3 piirtää päällekäin monta svg:tä
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
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
