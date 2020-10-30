import React, { Fragment, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  Button,
  NavLink,
} from "reactstrap";

function Navigation({ loggerOuter, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">ELS</NavbarBrand>{" "}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" activeClassName="active" exact tag={RRNavLink}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/news" activeClassName="active" tag={RRNavLink}>
                News
              </NavLink>
            </NavItem>{" "}
            <NavItem>
              <NavLink to="/discog" activeClassName="active" tag={RRNavLink}>
                Discography
              </NavLink>
            </NavItem>
              <NavItem>
              <NavLink to="/biog" activeClassName="active" tag={RRNavLink}>
                Biog
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/images" activeClassName="active" tag={RRNavLink}>
                Images
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/connect" activeClassName="active" tag={RRNavLink}>
                Connect
              </NavLink>
            </NavItem>
          </Nav>
          {isLoggedIn && (
            <Button
              color="primary"
              onClick={() => loggerOuter()}
              className="logout-button"
            >
              Log out
            </Button>
          )}
        </Collapse>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
