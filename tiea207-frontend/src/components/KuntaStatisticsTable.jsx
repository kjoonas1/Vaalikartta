import React, { useContext } from "react"
import { YearContext, AreaContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import { useFetch } from "../hooks/UseFetch"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"

const KuntaStatisticsTable = () => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const getTitle = (mapType, area) => {
        switch (mapType) {
            case "Kunnat": return area.district
            default: return ""
        }
    }
    const url = (active) => {
        switch (active) {
            case "Kunnat": return `${backendUrl}/api/kunnat/aanestystiedot/${area.district}/${year}`
            default: return null
        }
    }
    const chartTitle = getTitle(area.active, area)
    const kuntaDataHaku = useFetch(url(area.active))

    if (kuntaDataHaku.error === null) {
        const removeAttributes = ["_id", "Alue", "Vuosi"]
        const kuntaDataFilter = objectHelper.filterFromObject(kuntaDataHaku.data[0], a => a !== null)
        const kuntaData = objectHelper.extractArrayOfResponseData(kuntaDataFilter, removeAttributes, "name", "luku")
            .map(rivi => [rivi.name, rivi.luku])
        console.log(kuntaData)
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
                            { type: "number", label: "" }
                        ],
                        ...kuntaData
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
    if (kuntaDataHaku.error) return <div>Error</div>
}
export default KuntaStatisticsTable