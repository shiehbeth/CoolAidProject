import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-nav">
      <Container>
      <Navbar.Brand href="/" >
            <img
              src="../cool_aid_logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Cool Aid logo"
            />
        </Navbar.Brand>
        <Navbar.Brand href="./" className='cool-aid-logo'>Cool Aid</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link href="/" className='custom-nav'>Home</Nav.Link>
            <Nav.Link href="/about" className='custom-nav'>About</Nav.Link>
            <Nav.Link href="/offer-aid" className='custom-nav'>Offer Aid</Nav.Link>
            <Nav.Link href="/find-aid" className='custom-nav'>Find Aid</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
