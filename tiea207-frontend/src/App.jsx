import React, { useMemo, useState } from "react"
import "./App.scss"
import Etusivu from "./components/Etusivu"
import Tietoa from "./components/Tietoa"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navigation/Navigation"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { AreaContext } from "./Contexts"

const App = () => {
    const [area, setArea] = useState(null)
    const providerValue = useMemo(() => ({ area, setArea }), [area, setArea]) // Optimointi  kontekstin käytölle

    return (
        <div className="App">
            <AreaContext.Provider value={providerValue}>
                <Router>
                    <Navigation />
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Etusivu} />
                            <Route path="/tietoa" component={Tietoa} />
                        </Switch>
                    </Container>
                </Router>
            </AreaContext.Provider>
        </div>
    )
}

export default App
