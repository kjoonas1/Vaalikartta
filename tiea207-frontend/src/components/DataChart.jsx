import React, { useContext } from "react"
//import {BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, Bar} from "recharts"
import { AreaContext, YearContext } from "../Contexts"
import { Chart } from "react-google-charts"
import "../styles/DataChart.scss"

export const DataChart = props => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const data = Object.keys(props.luvut).map(key => {
        const fillColor = props.luvut[key].fill
        const label = props.luvut[key].name
        const value = props.luvut[key].vote
        return [label, value, fillColor]
    })

    const dataWithHeaders = [
        ["Puolue", "Kannatusprosentti", { role: "style" }]
    ].concat(data.slice(0, 11))

    return (
        <>
            {data.length > 0 && (
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={dataWithHeaders}
                    options={{
                        title: area + " " + year,
                        animation: {
                            duration: 1000,
                            easing: "out",
                            startup: true
                        },
                        bar: { groupWidth: "80%" },
                        legend: { position: "none" },
                        hAxis: { viewWindow: { min: 0, max: 100 } }
                    }}
                    controls={[
                        {
                            controlType: "NumberRangeFilter",
                            options: {
                                filterColumnLabel: "Kannatusprosentti"
                            },
                            controlWrapperParams: {
                                state: { lowValue: 0, highValue: 100 }
                            }
                        }
                    ]}
                    rootProps={{ "data-testid": "1" }}
                />
            )}
        </>
    )
}
