import React from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href="/">MyShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i> Кошик</Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={ userInfo.name } id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Профіль</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={ logoutHandler }>
                    Вийти
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Увійти</Nav.Link>
                </LinkContainer>
              ) }
              { userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Користувачі</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Продукти</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Замовлення</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
