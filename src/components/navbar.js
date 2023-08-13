import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Row,
  Col,
} from 'reactstrap';

const Header = (args) => {
  return (
    <div>
      <Navbar {...args} className='px-3' style={{"backgroundColor":"#0077f7"}}>
        <NavbarBrand className='text-white'>My graphQL App</NavbarBrand>
        <Nav className="me-auto" navbar>
          <Row>
            <Col>
              <NavItem>
                <NavLink href="/events" className='text-white'>Events</NavLink>
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <NavLink href="/bookings" className='text-white'>Bookings</NavLink>
              </NavItem>
            </Col>
          </Row>
        </Nav>
        <NavbarText className='text-white'>Event Booking App</NavbarText>
      </Navbar>
    </div>
  );
}

export default Header;