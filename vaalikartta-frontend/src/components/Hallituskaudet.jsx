import React, { useContext } from "react"
import { YearContext } from "../contexts/Contexts"
import "../styles/Hallitustiedot.scss"
import { useQuery } from "react-fetching-library"


const Hallituskaudet = () => {

    const { year } = useContext(YearContext)
    const data = useQuery({
        method: "GET",
        endpoint: `/api/hallituskaudet/vuosittain/${year}`
    })


    console.log(data.payload)

    return (
        <div>
               
    <div>terve</div>
      
        </div>
    )
}
export default Hallituskaudet