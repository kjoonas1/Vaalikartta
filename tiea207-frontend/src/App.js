import React from 'react';
import './App.css';
import Home from './components/Home';
import TestContent from './components/TestContent'
import { Container } from "react-bootstrap";
import Navigation from './components/Navigation/Navigation';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Container>
              <Route exact path="/" component={Home} />
              <Route path="/test" component={TestContent} />
            </Container>
          </Switch>
        </Router>

    </div>
  );
}

export default App;
