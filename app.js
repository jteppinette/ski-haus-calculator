import React, { Component } from 'react'
import Dinero from 'dinero.js'

import { Container, Navbar, NavbarBrand } from 'reactstrap'

class App extends Component {
  state = {}

  render () {
    const {} = this.state

    return (
      <div>
        <Navbar dark className='bg-dark'>
          <NavbarBrand className='mx-auto'>Ski Haus Calculator</NavbarBrand>
        </Navbar>
        <Container></Container>
      </div>
    )
  }
}

export default App
