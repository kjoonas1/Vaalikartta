import { createContext, useContext } from "react"

export const AreaContext = createContext(null)
export const YearContext = createContext(null)
export const EventContext = createContext(null)

export const useAreaContext = () => useContext(AreaContext)
