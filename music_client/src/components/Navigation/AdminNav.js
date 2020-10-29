import React from "react";

import { Nav, NavItem, NavLink } from "reactstrap";

function AdminNavigation() {
  return (
    <div className="admin-nav">
      <Nav className="navbar navbar-expand-md navbar-light">
        <NavItem>
          <NavLink href="/homepageupdate">Homepage Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/releaseupdate">Discography Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/newsupdate">News Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/connectupdate">Links Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/imagesupdate">Images Update</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default AdminNavigation;
