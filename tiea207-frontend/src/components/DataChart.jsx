import React, { useContext } from "react"
import { AreaContext, YearContext } from "../Contexts"
import { Chart } from "react-google-charts"
import "../styles/DataChart.scss"
import { sumArray } from "../utils/arrayHelper"
export const DataChart = props => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const data = Object.keys(props.luvut).map(key => {
        const fillColor = props.luvut[key].fill
        const label = props.luvut[key].name
        const value = props.luvut[key].vote
        return [label, value, fillColor]
    })

    // 1% tai alle saaneet puolueet sijoitetaan omaan listaansa ja yli 1% saaneet omaansa
    const allValues = Object.entries(data)
        // eslint-disable-next-line
        .reduce(([small, big], [_, [puolue, kannatus, vari]]) => 
            kannatus > 1 ? [small,[...big, [puolue, kannatus, vari]]] : [[...small, kannatus], big], [[], []])

    // Yhdistetään yli 1% kannatuksen saaneet ja pienemmät niin, että pienemmät yhdistetään yhdeksi luvuksi pienpuolueiden alle.
    const reconstructedData = allValues[1].concat([["Pienpuolueet", sumArray(allValues[0]), "#ff0000"]])
        .sort((a, b) => b[1] - a[1]) // Järjestetään lista

    // Yhdistetään data otsikkokenttien kanssa samaan listaan
    const dataWithHeaders = [["Puolue", "Kannatusprosentti", { role: "style" }]].concat(reconstructedData)

    const options = {
        title: area + " " + year,
        animation: {
            duration: 250,
            startup: true
        },
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        hAxis: { viewWindow: { min: 0, max: 100 } }
    }

    const controls = [
        {
            controlType: "NumberRangeFilter",
            options: {
                filterColumnLabel: "Kannatusprosentti",
                ui: {
                    step: 0.1
                }
            },
            controlWrapperParams: {
                state: { lowValue: 0, highValue: 100 }
            }
        }
    ]

    return (
        <>
            {data.length > 0 && (
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={dataWithHeaders}
                    options={options}
                    controls={controls}
                    rootProps={{ "data-testid": "1" }}
                />
            )}
        </>
    )
}
