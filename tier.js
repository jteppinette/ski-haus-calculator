import React, { useState } from 'react'
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

function Tier (props) {
  const [modal, setModal] = useState(false)

  function toggleModal () {
    setModal(!modal)
  }

  return (
    <ListGroupItem>
      <div className='d-flex justify-content-between align-items-center mt-2 mb-2'>
        <h5 className='mb-0'>
          <NumberFormat
            value={props.monthlyRent}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </h5>
        <div className='d-flex justify-content-between align-items-center'>
          <Badge className='mr-3'>{props.residentsCount} Residents</Badge>
          <i onClick={toggleModal} className='fas fa-edit ml-1'></i>
          <i onClick={props.remove} className='fas fa-trash-alt ml-2'></i>
        </div>
      </div>

      <small>
        Each resident has{' '}
        <strong>
          {pluralize('reserved weekend bed spot', props.reservedCount, true)}
        </strong>{' '}
        per month.
      </small>

      <UpdateTierModal
        isOpen={modal}
        toggle={toggleModal}
        update={props.update}
        {...props}
      ></UpdateTierModal>
    </ListGroupItem>
  )
}

function UpdateTierModal (props) {
  const [monthlyRent, setMonthlyRent] = useState(props.monthlyRent)
  const [reservedCount, setReservedCount] = useState(props.reservedCount)
  const [residentsCount, setResidentsCount] = useState(props.residentsCount)

  function update (event) {
    props.update({ monthlyRent, reservedCount, residentsCount })
    props.toggle()
  }

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} fade={false}>
      <ModalHeader toggle={props.toggle}>Update Tier</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor='monthlyRent'>Monthly Rent</Label>
            <NumberFormat
              name='monthlyRent'
              type='tel'
              value={monthlyRent}
              onValueChange={({ floatValue }) => setMonthlyRent(floatValue)}
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
              value={residentsCount}
              onValueChange={({ floatValue }) => {
                setResidentsCount(floatValue)
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
              value={reservedCount}
              onValueChange={({ floatValue }) => {
                setReservedCount(floatValue)
              }}
              decimalScale={0}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='light' onClick={props.toggle}>
          Cancel
        </Button>
        <Button
          color='dark'
          onClick={update}
          disabled={!monthlyRent || !residentsCount || !reservedCount}
        >
          Update Tier
        </Button>{' '}
      </ModalFooter>
    </Modal>
  )
}

function AddTierModal (props) {
  const initial = {
    monthlyRent: 100,
    reservedCount: 0,
    residentsCount: 0
  }

  const [monthlyRent, setMonthlyRent] = useState(initial.monthlyRent)
  const [reservedCount, setReservedCount] = useState(initial.reservedCount)
  const [residentsCount, setResidentsCount] = useState(initial.residentsCount)

  function add () {
    props.add({ monthlyRent, reservedCount, residentsCount })
    props.toggle()
    clear()
  }

  function cancel () {
    props.toggle()
    clear()
  }

  function clear () {
    setMonthlyRent(initial.monthlyRent)
    setReservedCount(initial.reservedCount)
    setResidentsCount(initial.residentsCount)
  }

  return (
    <Modal isOpen={props.isOpen} toggle={cancel} fade={false}>
      <ModalHeader toggle={cancel}>Add Tier</ModalHeader>
      <ModalBody>
        <Form onSubmit={add}>
          <FormGroup>
            <Label htmlFor='monthlyRent'>Monthly Rent</Label>
            <NumberFormat
              name='monthlyRent'
              type='tel'
              value={monthlyRent}
              onValueChange={({ floatValue }) => setMonthlyRent(floatValue)}
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
              value={residentsCount}
              onValueChange={({ floatValue }) => setResidentsCount(floatValue)}
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
              value={reservedCount}
              onValueChange={({ floatValue }) => setReservedCount(floatValue)}
              decimalScale={0}
              allowNegative={false}
              className='form-control'
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='light' onClick={cancel}>
          Cancel
        </Button>
        <Button
          color='dark'
          onClick={add}
          disabled={!monthlyRent || !residentsCount || !reservedCount}
        >
          Add Tier
        </Button>{' '}
      </ModalFooter>
    </Modal>
  )
}

export { Tier, AddTierModal, UpdateTierModal }
