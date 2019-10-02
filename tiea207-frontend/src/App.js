import React from 'react';
import './App.css';
import Home from './components/Home';
import TestContent from './components/TestContent'
import { Container } from "react-bootstrap";
import Navigation from './components/Navigation/Navigation';
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>

        <Router>
        <Navigation />
            <Route exact path="/" component={Home} />
            <Route path="/test" component={TestContent} />
        </Router>
      </Container>
    </div>
  );
}

export default App;
