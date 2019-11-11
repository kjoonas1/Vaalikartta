import React, { useMemo, useReducer } from "react"
import { AreaContext } from "./Contexts"

const AreaContextProvider = props => {
    // Arean logiikkaa monimutkaistettu koska enää ei käpistellä pelkkiä vaalipiirejä.
    // Esimerkki käytöstä: dispatchArea({type: "CHANGE_CONSTITUENCY_TO", to: "Lapin vaalipiiri"})
    const reducer = (state, action) => {
        switch (action.type) {
        case "CHANGE_CONSTITUENCY_TO":
            return { ...state, constituency: action.to }
        case "CHANGE_COUNTRY_TO":
            return { ...state, country: action.to }
        case "CHANGE_ACTIVE_TO":
            return { ...state, active: action.to}
        case "CHANGE_DISTRICT_TO":
            return {...state, district: action.to }
        default:
            return { ...state}
        }
    }

    const [area, dispatchArea] = useReducer(reducer, { country: "Koko maa", active: "Koko maa" })
    const areaProviderValue = useMemo(() => ({ area, dispatchArea }), [area, dispatchArea]) // Optimointi  kontekstin käytölle

    return <AreaContext.Provider value={areaProviderValue}>{props.children}</AreaContext.Provider>
}

export default AreaContextProvider
