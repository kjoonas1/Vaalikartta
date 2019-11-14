import React, { useContext } from "react"
import { AreaContext } from "../contexts/Contexts"
//import { Tabs, Tab } from "react-bootstrap"
import { Chart } from "react-google-charts"

export const Tables = props => {
    const { area } = useContext(AreaContext)
    //const { year } = useContext(YearContext)
    console.log(props)
    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Vaalipiirit": return area.constituency
            case "Koko maa": return area.country
            default: return ""
        }
    }

    const chartTitle = getTitle(area.active, area)
    const data = "testi"

    return (
        <>
            <Chart
                width={"100%"}
                height={"600px"}
                chartType="Table"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        { type: "string", label: chartTitle },
                        { type: "string", label: "Otsikko2" }
                    ],
                    [data, { v: chartTitle }]
                ]}
                options={{ showRowNumber: true, }}
                rootProps={{ "data-testid": "1" }}
            />

        </>
    )

}