import React from "react"
import { Table } from "react-bootstrap"

const StatisticsTable = (props) => {
    const data = props.data.map((field, key) =>
        <tr key={key}>
            <td>{field[0]}</td>
            <td>{field[1].type === "float" ? field[1].value.toFixed(2).replace(/\./, ",") : field[1].value.toLocaleString("fi-FI")}</td>
        </tr>)

    return (
        <>
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th colSpan="2">{props.title ? props.title : ""}</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        </>
    )
}
export default StatisticsTable