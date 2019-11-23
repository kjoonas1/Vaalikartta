import React, { useContext } from "react"
import { YearContext, AreaContext } from "../contexts/Contexts"
import { Chart } from "react-google-charts"
import { useFetch } from "../hooks/UseFetch"
import { backendUrl } from "../constants"
import * as objectHelper from "../utils/objectHelper"

const KuntaStatisticsTable = () => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)

    const chartTitle = area.district + " " + year
    const url = `${backendUrl}/api/avainluvut/${year}/${area.district}`
    const kuntaDataHaku = useFetch(url)

    if (kuntaDataHaku.isLoading)
        return <div>Ladataan kuntadataa...</div>

    if (kuntaDataHaku.error === null) {
        const removeAttributes = ["_id", "Alue", "Vuosi"]
        const kuntaDataFilter = objectHelper.filterFromObject(kuntaDataHaku.data[0], a => a !== null)
        const kuntaData = objectHelper.extractArrayOfResponseData(kuntaDataFilter, removeAttributes, "name", "luku")
            .map(rivi => [rivi.name, rivi.luku])
        return (
            <>
                <Chart
                    width={"100%"}
                    height={"600px"}
                    chartType="Table"
                    loader={<div>Ladataan taulukkoa...</div>}
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
                    rootProps={{ "data-testid": "kuntadata-taulukko" }}
                />

            </>
        )
    }
    if (kuntaDataHaku.error) return <div>Tapahtui virhe</div>
}
export default KuntaStatisticsTable