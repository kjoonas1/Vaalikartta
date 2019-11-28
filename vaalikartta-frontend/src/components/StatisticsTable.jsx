import React from "react"
import { Table } from "react-bootstrap"

const StatisticsTable = (props) => {
    const data = props.data.map((el, key) => el.length === 2 && 
    <tr key={key}>
        <td>{el[0]}</td>
        <td>{el[1] % 1 !== 0 ? el[1].toFixed(2) : el[1].toLocaleString("fi-FI")}</td>
    </tr>)

    console.log(props.data[0])

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