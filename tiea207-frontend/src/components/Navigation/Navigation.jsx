import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import NavbarLink from './NavbarLink';

const Navigation = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
            <Navbar.Brand href="#home">TIEA207</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarLink name="Home" exact={true} path="/"></NavbarLink>
                    <NavbarLink name="Test" exact={true} path="/test"></NavbarLink>
                </Nav>
            </Navbar.Collapse>
            <NavItem></NavItem>

        </Navbar>
    );
}

export default Navigation;