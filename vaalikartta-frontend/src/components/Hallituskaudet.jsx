import React from "react"
import "../styles/Hallitustiedot.scss"
import { useQuery } from "react-fetching-library"


const Hallituskaudet = ({data, loading}) => {

    if (loading) return <div>ladataan</div>

    const ministerit = useQuery({
        method: "GET",
        endpoint: `/api/ministerit/${2}`
    })


    
    console.log("data: ",data[0].ID)
    console.log("ministerit: ",ministerit.payload)

    return (
        <div>
            <div> 
                <div><strong>Hallitus: {data.map(arvo => arvo.Hallitus)}</strong></div>
                <div>Alku: {data.map(arvo => arvo.Alku)}</div>
                <div>Loppu: {data.map(arvo => arvo.Loppu)}</div>
                <div>Hallituspäivät: {data.map(arvo => arvo["Hallituspäivät"])}</div>
                <div>Pääministerin puolue: {data.map(arvo => arvo["Pääministerin puolue"])}</div>
                <img className="paaministerikuva" src="/vanhanen.jpg" alt="vanhanen vain nauroi"/>     
            </div>
        
        </div>
    )
}
export default Hallituskaudet