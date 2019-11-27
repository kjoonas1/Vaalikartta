import React from "react"
import { Chart } from "react-google-charts"
import * as objectHelper from "../utils/objectHelper"

const VotingStatisticsTable = (props) => {
    const removeAttributes = ["_id", "tyyppi", "Alue", "Vuosi"]
    const aanestysFilter = objectHelper.filterFromObject(props.data[0], a => a !== null)
    const aanestys = objectHelper.extractArrayOfResponseData(aanestysFilter, removeAttributes, "name", "luku")
        .map(rivi => [rivi.name, rivi.luku])
    const data = !props.loading ? [
        [
            { type: "string", label: props.title },
            { type: "number", label: "" }
        ],
        ...aanestys
    ] : []
    return (
        <>
            {!props.loading &&
                < Chart
                    width={"100%"}
                    height={"700px"}
                    chartType="Table"
                    loader={<div>Loading Chart</div>}
                    data={data}
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
                />}
        </>
    )
}
export default VotingStatisticsTable