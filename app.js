import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import {
  Alert,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  FormGroup,
  Label,
  ListGroup,
  Navbar,
  NavbarBrand
} from 'reactstrap'

import {
  getURLState,
  setURLState,
  clearURLState,
  defaultState
} from './state.js'
import Summary from './summary.js'
import { Tier, AddTierModal, UpdateTierModal } from './tier.js'

class App extends Component {
  constructor (props) {
    super(props)

    const urlState = getURLState()

    if (urlState) {
      this.state = urlState
    } else {
      this.state = defaultState
      clearURLState()
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  updateMonthlyRent = monthlyRent => {
    this.setState({ monthlyRent }, () => setURLState(this.state))
  }
  updateMonthlyUtilities = monthlyUtilities => {
    this.setState({ monthlyUtilities }, () => setURLState(this.state))
  }
  updateBedSpots = bedSpots => {
    this.setState({ bedSpots }, () => setURLState(this.state))
  }
  addTier = tier => {
    const tiers = [...this.state.tiers, tier]
    tiers.sort((a, b) => b.monthlyRent - a.monthlyRent)
    this.setState({ tiers }, () => setURLState(this.state))
  }
  updateTier = (index, tier) => {
    const tiers = this.state.tiers
    tiers[index] = tier
    tiers.sort((a, b) => b.monthlyRent - a.monthlyRent)
    this.setState({ tiers }, () => setURLState(this.state))
  }
  removeTier = index => {
    const tiers = this.state.tiers
    tiers.splice(index, 1)
    this.setState({ tiers }, () => setURLState(this.state))
  }

  render () {
    return (
      <div>
        <Navbar dark className='bg-dark'>
          <NavbarBrand className='mx-auto'>Ski Haus Calculator</NavbarBrand>
        </Navbar>
        <Container>
          <Alert color='light' fade={false} className='pl-0 pr-0'>
            All state is stored in the search bar to support sharing by URL.
            Click
            <a href='/' className='alert-link pl-1 pr-1'>
              reset
            </a>
            to restore the default state.
          </Alert>
          <FormGroup>
            <Label htmlFor='monthlyRent'>Monthly Rent</Label>
            <NumberFormat
              name='monthlyRent'
              type='tel'
              value={this.state.monthlyRent}
              onValueChange={({ floatValue }) => {
                this.updateMonthlyRent(floatValue)
              }}
              decimalScale={2}
              thousandSeparator={true}
              prefix={'$'}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='monthlyUtilities'>Monthly Utilities</Label>
            <NumberFormat
              name='monthlyUtilities'
              type='tel'
              value={this.state.monthlyUtilities}
              onValueChange={({ floatValue }) => {
                this.updateMonthlyUtilities(floatValue)
              }}
              decimalScale={2}
              thousandSeparator={true}
              prefix={'$'}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='bedSpots'>Bed Spots</Label>
            <NumberFormat
              name='bedSpots'
              type='tel'
              value={this.state.bedSpots}
              onValueChange={({ floatValue }) => {
                this.updateBedSpots(floatValue)
              }}
              decimalScale={0}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
          <hr />
          <Summary
            monthlyRent={this.state.monthlyRent}
            monthlyUtilities={this.state.monthlyUtilities}
            bedSpots={this.state.bedSpots}
            tiers={this.state.tiers}
          />
          <hr />

          <Card className='mb-3'>
            <CardHeader>Tiers</CardHeader>
            <ListGroup flush>
              {this.state.tiers.map((tier, index) => (
                <Tier
                  key={index}
                  update={this.updateTier.bind(this, index)}
                  remove={this.removeTier.bind(this, index)}
                  {...tier}
                />
              ))}
            </ListGroup>
            <CardFooter>
              <Button block onClick={this.toggleModal} color='dark' block>
                <i className='fas fa-plus'></i> Add Tier
              </Button>
            </CardFooter>
          </Card>

          <AddTierModal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            add={this.addTier}
          ></AddTierModal>

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
