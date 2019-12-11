import React from "react"
import "./styles/App.scss"
import Etusivu from "./components/Etusivu"
import Tietoa from "./components/Tietoa"
import AlertOhje from "./components/AlertOhje"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navigation/Navigation"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import AreaContextProvider from "./contexts/AreaContextProvider"
import YearContextProvider from "./contexts/YearContextProvider"
import EventContextProvider from "./contexts/EventContextProvider"
import { ClientContextProvider } from "react-fetching-library"
import { Client } from "./api/Client"

const App = () => {
    return (
        <div className="App">
            <ClientContextProvider client={Client}>
                <YearContextProvider>
                    <AreaContextProvider>
                        <EventContextProvider>
                            <Router>
                                <Navigation />
                                <Container>
                                    <Switch>
                                        <Route exact path="/" component={Etusivu} />
                                        <Route path="/tietoa" component={Tietoa} />
                                        <Route part="/ohje" component={AlertOhje} />
                                    </Switch>
                                </Container>
                            </Router>
                        </EventContextProvider>
                    </AreaContextProvider>
                </YearContextProvider>
            </ClientContextProvider>

        </div>
    )
}

export default App
