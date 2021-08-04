import React, { Component } from 'react'
import Dinero from 'dinero.js'
import { dollarsToCents } from './utils.js'
import NumberFormat from 'react-number-format'

import {
  Label,
  Container,
  Navbar,
  NavbarBrand,
  Form,
  FormGroup,
  Col,
  Row
} from 'reactstrap'

class App extends Component {
  state = {
    monthlyRent: 6000,
    residentsCount: 20,
    monthsCount: 6
  }

  render () {
    return (
      <div>
        <Navbar dark className='bg-dark'>
          <NavbarBrand className='mx-auto'>Ski Haus Calculator</NavbarBrand>
        </Navbar>
        <Container>
          <Form>
            <FormGroup>
              <Label htmlFor='monthlyRent'>Monthly Rent</Label>
              <NumberFormat
                name='monthlyRent'
                value={this.state.monthlyRent}
                onValueChange={({ value }) =>
                  this.setState({ monthlyRent: value })
                }
                thousandSeparator={true}
                prefix={'$'}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='residentsCount'>Number of Residents</Label>
              <NumberFormat
                name='residentsCount'
                value={this.state.residentsCount}
                onValueChange={({ value }) =>
                  this.setState({ residentsCount: value })
                }
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='monthsCount'>Number of Months</Label>
              <NumberFormat
                name='monthsCount'
                value={this.state.monthsCount}
                onValueChange={({ value }) =>
                  this.setState({ monthsCount: value })
                }
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
          </Form>
          <hr />
          <Row className='text-center'>
            <Col xs='4' className='mb-3'>
              <strong>Per Person Monthly Rent</strong>
              <br />
              {this.state.residentsCount >= 1
                ? Dinero({
                    amount: dollarsToCents(this.state.monthlyRent)
                  })
                    .divide(this.state.residentsCount)
                    .toFormat()
                : null}
            </Col>
            <Col xs='4' className='mb-3'>
              <strong>Per Person Total Rent</strong>
              <br />
              {this.state.residentsCount >= 1
                ? Dinero({
                    amount: dollarsToCents(this.state.monthlyRent)
                  })
                    .divide(this.state.residentsCount)
                    .multiply(this.state.monthsCount)
                    .toFormat()
                : null}{' '}
            </Col>
            <Col xs='4' className='mb-3'>
              <strong>Overall Total Rent</strong>
              <br />
              {Dinero({
                amount: dollarsToCents(this.state.monthlyRent)
              })
                .multiply(this.state.monthsCount)
                .toFormat()}
            </Col>
          </Row>
          <hr />
          <div className='text-center mb-3'>
            <small className='text-muted'>
              If you have any questions or feedback, please reach out at{' '}
              <a href='mailto:jteppinette@jteppinette.com'>
                jteppinette@jteppinette.com
              </a>
              . All code is open sourced and available for audit or modification
              at{' '}
              <a href='https://github.com/jteppinette/ski-haus-calculator'>
                GitHub
              </a>
              .
            </small>
          </div>
        </Container>
      </div>
    )
  }
}

export default App
