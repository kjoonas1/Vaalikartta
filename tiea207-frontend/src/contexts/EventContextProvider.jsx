import React, { useState, useContext, useMemo } from "react"
import { EventContext } from "./Contexts"

const EventContextProvider = props => {
    const [event, setEvent] = useState(null)
    const eventProviderValue = useMemo(() => ({ event, setEvent }), [event, setEvent])

    return <EventContext.Provider value={eventProviderValue}>
        {props.children}
    </EventContext.Provider>
}

export default EventContextProvider

export const useEvent = () => useContext(EventContext)