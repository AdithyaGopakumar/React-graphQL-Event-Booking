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
  Button,
} from 'reactstrap';

import AuthContext from '../context/auth.context';
import { Link } from 'react-router-dom';

const Header = (args) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div>
          <Navbar {...args} className='px-3' style={{ "backgroundColor": "#0077f7" }}>
            <NavbarBrand className='text-white'>MyGraphQLApp</NavbarBrand>
            <Nav className="me-auto" navbar>
              <Row className='align-items-center'>
                {!context.token &&
                  <Col>
                    <Link to="/auth" className='text-white text-decoration-none'>Authentication</Link>
                  </Col>
                }
                <Col>
                  <Link to="/events" className='text-white text-decoration-none'>Events</Link>
                </Col>
                {context.token &&
                  <Col>
                    <Link to="/bookings" className='text-white text-decoration-none'>Bookings</Link>
                  </Col>
                }
                {context.token &&
                  <Col>
                    <Button className='text-white btn btn-warning text-decoration-none'
                      onClick={context.logout}
                    >Logout</Button>
                  </Col>
                }
              </Row>
            </Nav>
            <NavbarText className='text-white'>Event Booking App</NavbarText>
          </Navbar>
        </div>
      )}
    </AuthContext.Consumer>
  );
}

export default Header;
