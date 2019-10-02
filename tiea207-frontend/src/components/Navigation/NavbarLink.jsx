import React, { Fragment } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap'

export const NavbarLink = (props) => {
return props.exact ? (
    <Fragment>
        <Nav.Link>
            <IndexLinkContainer exact to={props.path}>
                <NavItem>{props.name}</NavItem>
            </IndexLinkContainer>
        </Nav.Link>
    </Fragment>
    ) : (
        <Fragment>
            <Nav.Link>
                <IndexLinkContainer to={props.path}>
                    <NavItem>{props.name}</NavItem>
                </IndexLinkContainer>
            </Nav.Link>
        </Fragment>
    );
    
}

export default NavbarLink;