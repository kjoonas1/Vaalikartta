import React, { useState, useContext, useMemo } from "react"
import { OhjeContext } from "./Contexts"

const OhjeContextProvider = props => {
    const [show, setShow] = useState(true)
    const ohjeProviderValue = useMemo(() => ({ show, setShow }), [show, setShow])

    return <OhjeContext.Provider value={ohjeProviderValue}>{props.children}</OhjeContext.Provider>
}

export default OhjeContextProvider

export const useOhje = () => useContext(OhjeContext)