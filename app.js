import React, { Component } from 'react'
import Dinero from 'dinero.js'
import { dollarsToCents } from './utils.js'
import { getURLState, setURLState, defaultState } from './state.js'
import NumberFormat from 'react-number-format'

import {
  Alert,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
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
  NavbarBrand,
  Row
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)

    const urlState = getURLState()

    if (urlState) {
      this.state = urlState
    } else {
      this.state = defaultState
      setURLState(defaultState)
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  updateMonthlyRent = monthlyRent => {
    this.setState({ monthlyRent }, () => setURLState(this.state))
  }
  addTier = tier => {
    this.setState({ tiers: [...this.state.tiers, tier] }, () =>
      setURLState(this.state)
    )
  }
  updateTier = (index, tier) => {
    const tiers = this.state.tiers
    tiers[index] = tier
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
            <a href='#' className='alert-link pl-1 pr-1'>
              reset
            </a>
            to restore the default state.
          </Alert>
          <FormGroup>
            <Label htmlFor='monthlyRent'>Monthly Rent</Label>
            <NumberFormat
              name='monthlyRent'
              value={this.state.monthlyRent}
              onValueChange={({ value }) => {
                this.updateMonthlyRent(parseFloat(value))
              }}
              decimalScale={2}
              thousandSeparator={true}
              prefix={'$'}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
          <hr />
          <Summary
            monthlyRent={this.state.monthlyRent}
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

        <small>{this.props.description}</small>

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
    description: this.props.description,
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
                value={this.state.monthlyRent}
                onValueChange={({ value }) =>
                  this.setState({ monthlyRent: parseFloat(value) })
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
                value={this.state.residentsCount}
                onValueChange={({ value }) => {
                  this.setState({ residentsCount: parseInt(value) })
                }}
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='description'>Description</Label>
              <Input
                name='description'
                type='textarea'
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='light' onClick={this.props.toggle}>
            Cancel
          </Button>
          <Button color='dark' onClick={this.update}>
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
    description: '',
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
                value={this.state.monthlyRent}
                onValueChange={({ value }) =>
                  this.setState({ monthlyRent: parseFloat(value) })
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
                value={this.state.residentsCount}
                onValueChange={({ value }) =>
                  this.setState({ residentsCount: parseInt(value) })
                }
                decimalScale={0}
                allowNegative={false}
                className='form-control'
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='description'>Description</Label>
              <Input
                name='description'
                type='textarea'
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='light' onClick={this.cancel}>
            Cancel
          </Button>
          <Button color='dark' onClick={this.add}>
            Add Tier
          </Button>{' '}
        </ModalFooter>
      </Modal>
    )
  }
}

class Summary extends Component {
  render () {
    const residentsCount = this.props.tiers.reduce(
      (sum, tier) => sum + tier.residentsCount,
      0
    )
    const monthlyRent = Dinero({
      amount: dollarsToCents(this.props.monthlyRent || 0)
    })
    const monthlyIncome = this.props.tiers.reduce(
      (sum, tier) =>
        sum.add(
          Dinero({ amount: dollarsToCents(tier.monthlyRent) }).multiply(
            tier.residentsCount
          )
        ),
      Dinero()
    )
    const monthlyDelta = monthlyIncome.subtract(monthlyRent)

    return (
      <Row className='text-center'>
        <Col xs={4} className='mb-3'>
          <strong>Monthly Income</strong>
          <br />
          {monthlyIncome.toFormat()}
        </Col>
        <Col
          xs={4}
          className={`mb-3 ${
            monthlyDelta.isNegative() ? 'text-danger' : 'text-success'
          }`}
        >
          <strong>Monthly Delta</strong>
          <br />
          {monthlyDelta.toFormat()}
        </Col>
        <Col xs={4}>
          <strong>Number of Residents</strong>
          <br />
          {residentsCount}
        </Col>
      </Row>
    )
  }
}

export default App
