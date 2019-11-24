import React from "react"
import { Chart } from "react-google-charts"
import * as objectHelper from "../utils/objectHelper"

const VotingStatisticsTable = (props) => {
    const removeAttributes = ["_id", "tyyppi", "Alue", "Vuosi"]
    const aanestysFilter = objectHelper.filterFromObject(props.data[0], a => a !== null)
    const aanestys = objectHelper.extractArrayOfResponseData(aanestysFilter, removeAttributes, "name", "luku")
        .map(rivi => [rivi.name, rivi.luku])

    return (
        <>
            <Chart
                width={"100%"}
                height={"600px"}
                chartType="Table"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        { type: "string", label: props.chartTitle },
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
export default VotingStatisticsTable