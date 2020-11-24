import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            {/* Move two links to the right */}
                            <Nav.Link href='/cart'>Cart</Nav.Link>
                            <Nav.Link href='/login'>Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
