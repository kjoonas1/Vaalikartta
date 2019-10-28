import React, { useState, useMemo } from "react"
import { YearContext } from "./Contexts"

const YearContextProvider = props => {
    const [year, setYear] = useState(null)
    const yearProviderValue = useMemo(() => ({ year, setYear }), [year, setYear])

    return <YearContext.Provider value={yearProviderValue}>{props.children}</YearContext.Provider>
}

export default YearContextProvider