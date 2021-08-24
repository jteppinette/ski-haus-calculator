import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import pluralize from 'pluralize'
import {
  Alert,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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

class Tier extends Component {
  state = {
    modal: false
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  render () {
    return (
      <ListGroupItem>
        <div className='d-flex justify-content-between align-items-center mt-2 mb-2'>
          <h5 className='mb-0'>
            <NumberFormat
              value={this.props.monthlyRent}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </h5>
          <div className='d-flex justify-content-between align-items-center'>
            <Badge className='mr-3'>
              {this.props.residentsCount} Residents
            </Badge>
            <i onClick={this.toggleModal} className='fas fa-edit ml-1'></i>
            <i
              onClick={this.props.remove}
              className='fas fa-trash-alt ml-2'
            ></i>
          </div>
        </div>

        <small>
          Each resident has{' '}
          <strong>
            {pluralize(
              'reserved weekend bed spot',
              this.props.reservedCount,
              true
            )}
          </strong>{' '}
          per month.
        </small>

        <UpdateTierModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          update={this.props.update}
          {...this.props}
        ></UpdateTierModal>
      </ListGroupItem>
    )
  }
}

class UpdateTierModal extends Component {
  state = {
    monthlyRent: this.props.monthlyRent,
    reservedCount: this.props.reservedCount,
    residentsCount: this.props.residentsCount
  }

  update = event => {
    this.props.update({ ...this.state })
    this.props.toggle()
  }

  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} fade={false}>
        <ModalHeader toggle={this.props.toggle}>Update Tier</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor='monthlyRent'>Monthly Rent</Label>
              <NumberFormat
                name='monthlyRent'
                type='tel'
                value={this.state.monthlyRent}
                onValueChange={({ floatValue }) =>
                  this.setState({ monthlyRent: floatValue })
                }
                decimalScale={2}
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
                type='tel'
                value={this.state.residentsCount}
                onValueChange={({ floatValue }) => {
                  this.setState({ residentsCount: floatValue })
                }}
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='reservedCount'>
                Number of Reserved Weekend Bed Spots
              </Label>
              <NumberFormat
                name='reservedCount'
                type='tel'
                value={this.state.reservedCount}
                onValueChange={({ floatValue }) => {
                  this.setState({ reservedCount: floatValue })
                }}
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='light' onClick={this.props.toggle}>
            Cancel
          </Button>
          <Button
            color='dark'
            onClick={this.update}
            disabled={
              !this.state.monthlyRent ||
              !this.state.residentsCount ||
              !this.state.reservedCount
            }
          >
            Update Tier
          </Button>{' '}
        </ModalFooter>
      </Modal>
    )
  }
}

class AddTierModal extends Component {
  initial = {
    monthlyRent: 100,
    reservedCount: 0,
    residentsCount: 0
  }
  state = { ...this.initial }

  add = () => {
    this.props.add(this.state)
    this.props.toggle()
    this.clear()
  }

  cancel = () => {
    this.props.toggle()
    this.clear()
  }

  clear = () => {
    this.setState({ ...this.initial })
  }

  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.cancel} fade={false}>
        <ModalHeader toggle={this.cancel}>Add Tier</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.add}>
            <FormGroup>
              <Label htmlFor='monthlyRent'>Monthly Rent</Label>
              <NumberFormat
                name='monthlyRent'
                type='tel'
                value={this.state.monthlyRent}
                onValueChange={({ floatValue }) =>
                  this.setState({ monthlyRent: floatValue })
                }
                decimalScale={2}
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
                type='tel'
                value={this.state.residentsCount}
                onValueChange={({ floatValue }) =>
                  this.setState({ residentsCount: floatValue })
                }
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='reservedCount'>
                Number of Reserved Weekend Bed Spots
              </Label>
              <NumberFormat
                name='reservedCount'
                type='tel'
                value={this.state.reservedCount}
                onValueChange={({ floatValue }) =>
                  this.setState({ reservedCount: floatValue })
                }
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='light' onClick={this.cancel}>
            Cancel
          </Button>
          <Button
            color='dark'
            onClick={this.add}
            disabled={
              !this.state.monthlyRent ||
              !this.state.residentsCount ||
              !this.state.reservedCount
            }
          >
            Add Tier
          </Button>{' '}
        </ModalFooter>
      </Modal>
    )
  }
}

export default App
