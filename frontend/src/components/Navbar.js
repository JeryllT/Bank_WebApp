import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser, setAccounts } from '../store/account-slice';
import { setToViewTran, setTransactions } from '../store/transaction-slice';

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('loggedInUser');
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(setAccounts([]))
    dispatch(setToViewTran(null))
    dispatch(setTransactions([]))
    navigate("/login")
  }
    
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>SBD Bank</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/view-accounts">
              <Nav.Link>View Accounts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/make-transactions">
              <Nav.Link>Make Transactions</Nav.Link>
            </LinkContainer>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
          <LinkContainer to="/" onClick={logout}>
            <Nav.Link>Log Out</Nav.Link>
          </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;