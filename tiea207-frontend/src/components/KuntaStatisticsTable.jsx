import React from "react"
import { Chart } from "react-google-charts"
import * as objectHelper from "../utils/objectHelper"

const KuntaStatisticsTable = (props) => {
    console.log(props)
        if (props.data.length === 0) return <div>Ei dataa.</div>
        const removeAttributes = ["_id", "Alue", "Vuosi"]
        const kuntaDataFilter = objectHelper.filterFromObject(props.data, a => a !== null)
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
                            { type: "string", label: props.title },
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

export default KuntaStatisticsTable