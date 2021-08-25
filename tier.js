import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import pluralize from 'pluralize'
import {
  Badge,
  Button,
  Form,
  FormGroup,
  Label,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

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

export { Tier, AddTierModal, UpdateTierModal }
