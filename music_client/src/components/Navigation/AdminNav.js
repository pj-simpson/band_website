import React, { useState } from "react";

import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

function AdminNavigation() {
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);
  const imageToggle = () => setImageDropdownOpen(!imageDropdownOpen);

  const [biogDropdownOpen, setBiogDropdownOpen] = useState(false);
  const biogToggle = () => setBiogDropdownOpen(!biogDropdownOpen);

  return (
    <div className="admin-nav">
      <Nav className="navbar navbar-expand-md navbar-light">
        <Dropdown nav isOpen={biogDropdownOpen} toggle={biogToggle}>
          <DropdownToggle nav caret>
            Biography
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <NavItem>
                <NavLink href="/biogupdate">New Biog</NavLink>
              </NavItem>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <NavItem>
                <NavLink href="/biogeditor">Biog History</NavLink>
              </NavItem>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink href="/releaseupdate">Discography Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/newsupdate">News Update</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/connectupdate">Links Update</NavLink>
        </NavItem>
        <Dropdown nav isOpen={imageDropdownOpen} toggle={imageToggle}>
          <DropdownToggle nav caret>
            Image Management
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <NavItem>
                <NavLink href="/imagesupdate">Images Update</NavLink>
              </NavItem>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <NavItem>
                <NavLink href="/imagesedit">Images Edit</NavLink>
              </NavItem>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </div>
  );
}

export default AdminNavigation;
