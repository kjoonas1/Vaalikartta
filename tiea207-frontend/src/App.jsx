import React, { useMemo, useState } from "react"
import "./App.scss"
import Etusivu from "./components/Etusivu"
import Tietoa from "./components/Tietoa"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navigation/Navigation"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { AreaContext, YearContext, EventContext } from "./Contexts"

const App = () => {
    const [area, setArea] = useState(null)
    const areaProviderValue = useMemo(() => ({ area, setArea }), [area, setArea]) // Optimointi  kontekstin käytölle
    const [year, setYear] = useState(null)
    const yearProviderValue = useMemo(() => ({ year, setYear }), [year, setYear])
    const [event, setEvent] = useState(null)
    const eventProviderValue = useMemo(() => ({ event, setEvent }), [event, setEvent])

    return (
        <div className="App">
            <YearContext.Provider value={yearProviderValue}>
                <AreaContext.Provider value={areaProviderValue}>
                    <EventContext.Provider value={eventProviderValue}>
                        <Router>
                            <Navigation />
                            <Container>
                                <Switch>
                                    <Route exact path="/" component={Etusivu} />
                                    <Route path="/tietoa" component={Tietoa} />
                                </Switch>
                            </Container>
                        </Router>
                    </EventContext.Provider>
                </AreaContext.Provider>
            </YearContext.Provider>
        </div>
    )
}

export default App
