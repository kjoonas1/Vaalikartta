import React, { useContext } from "react"
import { YearContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import { useFetch } from "../hooks/UseFetch"
//import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"

export const KuntaStatisticsTable = () => {
    //  const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    //const getTitle = (mapType, area) => {
    //    switch (mapType) {
    //        case "Kunnat": return area.district
    //        default: return ""
    //    }
    // }

    //    const url = (active) => {
    //       switch (active) {
    //           case "Kunnat": return `${backendUrl}/api/avainluvut/${year}/${area.district}` // FIXME: placeholder
    //           default: return null
    //       }

    //   const chartTitle = getTitle(area.active, area)

    const kuntaHaku = useFetch("http://localhost:8000/api/avainluvut/2018/Helsinki")
    console.log(kuntaHaku)
    if (kuntaHaku.error === null) {
        const removeAttributes = ["_id"]
        const kuntaFilter = objectHelper.filterFromObject(kuntaHaku.data, a => a !== null)
        console.log(kuntaFilter)
        const kuntaData = objectHelper.extractArrayOfResponseData(kuntaFilter, removeAttributes, "name", "luku")
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
                            { type: "string", label: "Kunta " + year },
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
                    options={{ showRowNumber: false, }}
                    rootProps={{ "data-testid": "1" }}
                />
            </>
        )
    }
    if (kuntaHaku.error) return <div>Error</div>
}