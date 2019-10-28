import React, { useState, useMemo } from "react"
import { AreaContext } from "./Contexts"

const AreaContextProvider = props => {
    const [area, setArea] = useState(null)
    const areaProviderValue = useMemo(() => ({ area, setArea }), [area, setArea]) // Optimointi  kontekstin käytölle

    return <AreaContext.Provider value={areaProviderValue}>
        {props.children}
    </AreaContext.Provider>
}

export default AreaContextProvider