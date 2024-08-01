import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

export const Header = () => {
  return (
    <Container>
        <Navbar fixed= "top" expand="lg" className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="#">E manager</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  )
}
