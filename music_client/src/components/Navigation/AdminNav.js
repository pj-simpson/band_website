import React, {useState} from "react";

import { Nav, NavItem, NavLink,Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from "reactstrap";

function AdminNavigation() {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

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
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
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
          <NavItem>
          <NavLink href="/biogupdate">Biog Update</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default AdminNavigation;



