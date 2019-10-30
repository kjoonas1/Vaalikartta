import React, { useState, useMemo } from "react"
import { YearContext } from "./Contexts"
import { timelineData } from "../dataset/timelineData"

const YearContextProvider = props => {
    const [year, setYear] = useState(Math.max(...timelineData.years))
    const yearProviderValue = useMemo(() => ({ year, setYear }), [year, setYear])

    return <YearContext.Provider value={yearProviderValue}>{props.children}</YearContext.Provider>
}

export default YearContextProvider