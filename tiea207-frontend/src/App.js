import React from "react"
import "./App.scss"
import Etusivu from "./components/Etusivu"
import Tietoa from "./components/Tietoa"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navigation/Navigation"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"

const App = () => {
    return (
        <div className="App">
            <Router>
                <Navigation />
                <Container>
                    <Switch>
                        <Route exact path="/" component={Etusivu} />
                        <Route path="/tietoa" component={Tietoa} />
                    </Switch>
                </Container>
            </Router>
        </div>
    )
}

export default App
