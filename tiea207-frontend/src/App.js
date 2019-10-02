import React from 'react';
import './App.css';
import Home from './components/Home';
import { Container } from "react-bootstrap";
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Container>
        <Navigation />
        <Home />
      </Container>
    </div>
  );
}

export default App;
