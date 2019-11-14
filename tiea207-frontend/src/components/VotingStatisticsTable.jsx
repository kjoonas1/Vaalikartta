import React, { useContext } from "react"
import { AreaContext, YearContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import { useFetch } from "../hooks/UseFetch"
import { backendUrl } from "../constants"

export const VotingStatisticsTable = () => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const getTitle = (mapType, area) => {
        switch (mapType) {
        case "Vaalipiirit": return area.constituency
        case "Koko maa": return area.country
        default: return ""
        }
    }

    const url = (active) => {
        switch (active) {
            case "Koko maa": return `${backendUrl}/api/muut-alueet/aanestystiedot/${area.country}/${year}`
            case "Vaalipiirit": return `${backendUrl}/api/vaalipiirit/aanestystiedot/${area.constituency}/${year}`
            case "Kunnat": return `${backendUrl}/api/kunnat/aanestystiedot/${area.district}/${year}` // FIXME: placeholder
            default: return null
        }
    }
    const chartTitle = getTitle(area.active, area)
    const aanestysHaku = useFetch(url(area.active))

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
                    [aanestysHaku, { v: chartTitle }]
                ]}
                options={{ showRowNumber: true, }}
                rootProps={{ "data-testid": "1" }}
            />

        </>
    )

}