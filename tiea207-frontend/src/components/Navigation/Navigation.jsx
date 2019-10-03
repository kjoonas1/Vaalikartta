import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import NavbarLink from './NavbarLink';
import { IndexLinkContainer } from 'react-router-bootstrap'


/* 
Navigation bar that contains links.
 TODO: collapse when link is clicked. 
 check https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected
 Links are now hard-coded, they could also come with props fromm App.js
 */
const Navigation = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
            <Navbar.Brand>
                <Nav.Link>    
                    <IndexLinkContainer exact to="/">
                        <NavItem>TIEA207</NavItem>
                    </IndexLinkContainer>
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarLink name="Home" exact={true} path="/"></NavbarLink>
                    <NavbarLink name="Test" path="/test"></NavbarLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;