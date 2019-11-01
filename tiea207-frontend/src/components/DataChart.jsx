import React, { useContext } from "react"
import { AreaContext, YearContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import "../styles/DataChart.scss"
import { sumArray, partition } from "../utils/arrayHelper"
 
export const DataChart = props => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    // Otsikko chartille sen mukaan mikä välilehti on aktiivinen kartalla
    const getTitle = (mapType, area) => {
        switch (mapType) {
        case "Vaalipiirit": return area.constituency
        case "Koko maa": return area.country
        default: return ""
        }
    }

    const chartTitle = getTitle(area.active, area)
    const data = Object.keys(props.luvut).map(key => {
        const fillColor = props.luvut[key].fill
        const label = props.luvut[key].name
        const value = props.luvut[key].vote
        return [label, value, fillColor]
    })
    
    // eslint-disable-next-line
    const allValues = partition(data, ([puolue, kannatus, vari]) => kannatus < 1.0)
    const pienpuolueet = allValues[0].sort((a, b) => b[1] - a[1])
    // Yhdistetään yli 1% kannatuksen saaneet ja pienemmät niin, että pienemmät yhdistetään yhdeksi luvuksi pienpuolueiden alle.
    const reconstructedData = allValues[1].concat([["Pienpuolueet", sumArray(allValues[0].map(p => p[1])), "#ff0000"]])
        .slice().sort((a, b) => b[1] - a[1]) // Järjestetään lista
    

    // Yhdistetään data otsikkokenttien kanssa samaan listaan
    const addChartHeader = data => [["Puolue", "Kannatusprosentti", { role: "style" }]].concat(data)
    const dataWithHeaders = addChartHeader(reconstructedData)
    const pienpuolueetWithHeaders = addChartHeader(pienpuolueet)

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
            {data.length > 0 && (<>
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={dataWithHeaders}
                    options={options(chartTitle + " " + year,100)}
                    rootProps={{ "data-testid": "1" }}
                />
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={pienpuolueetWithHeaders}
                    options={options(chartTitle + " " + year,1)}
                    rootProps={{ "data-testid": "1" }}
                /> </>
            ) }
        </>
    )
}
