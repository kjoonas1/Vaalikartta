import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import NavbarLink from "./NavbarLink"
import { IndexLinkContainer } from "react-router-bootstrap"
import { useOhje } from "../../contexts/OhjeContextProvider"
/* 
Navigation bar that contains links.
Links are now hard-coded, they could also come with props fromm App.js
*/
const Navigation = () => {

    const { setShow } = useOhje()
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <IndexLinkContainer exact to="/">
                    <Nav.Link>Vaalikartta</Nav.Link>
                </IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarLink name="Tietoa" path="/tietoa"></NavbarLink>
                    <Nav.Link to="" onClick={() => setShow(true)}>
                        Ohje
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
