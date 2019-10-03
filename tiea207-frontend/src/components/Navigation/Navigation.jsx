import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import NavbarLink from './NavbarLink';

/* 
Navigation bar that contains links.
 TODO: collapse when link is clicked. 
 check https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected
 Links are now hard-coded, they could also come with props fromm App.js
 */
const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavbarLink name="Home" exact={true} path="/"></NavbarLink>
            <NavbarLink name="Test" path="/test"></NavbarLink> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default Navigation; 