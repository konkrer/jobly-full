import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import TokenContext from '../../utils/tokenContext';
import './Navbar.css';

const NavbarJobly = () => {
  const { token } = useContext(TokenContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to={`${token ? '/companies' : '/login'}`}>
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${token ? '/jobs' : '/login'}`}>Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${token ? '/profile' : '/login'}`}>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">{token ? 'Log out' : 'Login'}</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarJobly;
