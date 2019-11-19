import React from "react"
import { Chart } from "react-google-charts"
import "../styles/DataChart.scss"

export const DataChart = props => {

    const options = (title, max) => ({
        title: title,
        animation: {
            duration: 250,
            startup: true
        },
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        hAxis: { viewWindow: { min: 0, max: max } }
    })


    return (
        <>
            {props.data.length > 0 && (
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType={props.chartType}
                    loader={<div>Ladataan kaaviota...</div>}
                    data={props.data}
                    options={options(props.title, props.axisMax)}
                    rootProps={{ "data-testid": "1" }}
                />
            ) }
        </>
    )
}