import React, { Fragment } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap'

/*
Item that communicates with DOM using react-router-bootstrap.
'exact to' choice is because every link contain as first char "/" and 
content wont be removed from DOM if main site does not use exact to property
*/
export const NavbarLink = (props) => {
    let navLink = <IndexLinkContainer to={props.path}>
                    <NavItem>{props.name}</NavItem>
                </IndexLinkContainer>;
    if (props.exact) navLink = <IndexLinkContainer exact to={props.path}>
                                    <NavItem>{props.name}</NavItem>
                                </IndexLinkContainer>;
return (
    <Fragment>
        <Nav.Link>
            { navLink }
        </Nav.Link>
    </Fragment>
    );
}

export default NavbarLink;