import React from "react"
import rd3 from "react-d3-library"

const Bubblechart = props => {
    const d3 = () => {
        const node = rd3.createElement("div")
        
        return node
    }

    return (
        <>
            <svg width={props.width} height={props.height} viewBox={"0 0 1000 1000"}>
                <g>{d3()}</g>
            </svg>
        </>
    )
}

export default Bubblechart
