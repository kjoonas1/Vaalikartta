import React from "react"
import "../styles/Hallitustiedot.scss"
import { useQuery } from "react-fetching-library"


const Hallituskaudet = ({ data, loading }) => {
    const ministerit = useQuery({
        method: "GET",
        endpoint: `/api/ministerit/${2}`
    })

    // console.log("data: ", data)
    // console.log("ministerit: ", ministerit.payload)

    return (
        <>
        {
            data.map((hallitus, i) => {
                return (<div key={"hallitus" + i}>
                    <div>
                        <div><strong>Hallitus: {hallitus.Hallitus}</strong></div>
                        <div>Alku: {hallitus.Alku}</div>
                        <div>Loppu: {hallitus.Loppu}</div>
                        <div>Hallituspäivät: {hallitus["Hallituspäivät"]}</div>
                        <div>Pääministerin puolue: {hallitus["Pääministerin puolue"]}</div>
                        <img className="paaministerikuva" src="/vanhanen.jpg" alt="vanhanen vain nauroi" />
                    </div>

                </div>)
            }
            )
        }
        </>
    )
}
export default Hallituskaudet