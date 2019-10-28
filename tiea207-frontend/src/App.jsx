import React from "react"
import "./styles/App.scss"
import Etusivu from "./components/Etusivu"
import Tietoa from "./components/Tietoa"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navigation/Navigation"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import AreaContextProvider from "./contexts/AreaContextProvider"
import YearContextProvider from "./contexts/YearContextProvider"
import EventContextProvider from "./contexts/EventContextProvider"

const App = () => {
    return (
        <div className="App">
            <YearContextProvider>
                <AreaContextProvider>
                    <EventContextProvider>
                        <Router>
                            <Navigation />
                            <Container>
                                <Switch>
                                    <Route exact path="/" component={Etusivu} />
                                    <Route path="/tietoa" component={Tietoa} />
                                </Switch>
                            </Container>
                            <footer className="text-muted">
                                Footer text
                            </footer>
                        </Router>
                    </EventContextProvider>
                </AreaContextProvider>
            </YearContextProvider>
        </div>
    )
}

export default App
