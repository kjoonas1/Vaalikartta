import React, { useContext } from "react"
import { AreaContext, YearContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import { useFetch } from "../hooks/UseFetch"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"

const VotingStatisticsTable = () => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Vaalipiirit": return area.constituency
            case "Koko maa": return area.country
            case "Kunnat": return area.district
            default: return ""
        }
    }

    const url = (active) => {
        switch (active) {
            case "Koko maa": return `${backendUrl}/api/muut-alueet/aanestystiedot/${area.country}/${year}`
            case "Vaalipiirit": return `${backendUrl}/api/vaalipiirit/aanestystiedot/${area.constituency}/${year}`
            case "Kunnat": return `${backendUrl}/api/kunnat/aanestystiedot/${area.district}/${year}`
            default: return null
        }
    }
    const chartTitle = getTitle(area.active, area)
    const aanestysHaku = useFetch(url(area.active))

    if (aanestysHaku.error === null) {
        const removeAttributes = ["_id", "tyyppi", "Alue", "Vuosi"]
        const aanestysFilter = objectHelper.filterFromObject(aanestysHaku.data[0], a => a !== null)
        const aanestys = objectHelper.extractArrayOfResponseData(aanestysFilter, removeAttributes, "name", "luku")
            .map(rivi => [rivi.name, rivi.luku])

<<<<<<< HEAD

=======
>>>>>>> 2e55b2a671c725421c93eb3323f4fced230ab513
        return (
            <>
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="Table"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            { type: "string", label: chartTitle + " " + year },
                            { type: "number", label: "" }
                        ],
                        ...aanestys
                    ]}
                    formatters={[
                        {
                            type: "NumberFormat",
                            column: 1,
                            options: {
                                groupingSymbol: " ",
                                decimalSymbol: ","
                            },
                        },
                    ]}
                    options={{ showRowNumber: false }}
                    rootProps={{ "data-testid": "1" }}
                />

            </>
        )
    }
    if (aanestysHaku.error) return <div>Error</div>
}
export default VotingStatisticsTable