import React, { useState, useEffect, useRef } from 'react'
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

import { getURLState, setURLState, defaultState } from './state.js'
import Summary from './summary.js'
import { Tier, AddTierModal } from './tier.js'

const urlState = getURLState()

function App () {
  const initial = urlState ? urlState : defaultState

  const [monthlyRent, setMonthlyRent] = useState(initial.monthlyRent)
  const [monthlyUtilities, setMonthlyUtilities] = useState(initial.monthlyRent)
  const [bedSpots, setBedSpots] = useState(initial.bedSpots)
  const [tiers, setTiers] = useState(initial.tiers)
  const [modal, setModal] = useState(false)

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setURLState({ monthlyRent, monthlyUtilities, bedSpots, tiers })
    }
  }, [monthlyRent, monthlyUtilities, bedSpots, tiers])

  function toggleModal () {
    setModal(!modal)
  }

  function updateMonthlyRent (monthlyRent) {
    setMonthlyRent(monthlyRent)
  }
  function updateMonthlyUtilities (monthlyUtilities) {
    setMonthlyUtilities(monthlyUtilities)
  }
  function updateBedSpots (bedSpots) {
    setBedSpots(bedSpots)
  }
  function addTier (tier) {
    const tmp = [...tiers, tier]
    tmp.sort((a, b) => b.monthlyRent - a.monthlyRent)
    setTiers(tmp)
  }
  function updateTier (index, tier) {
    const tmp = [...tiers]
    tmp[index] = tier
    tmp.sort((a, b) => b.monthlyRent - a.monthlyRent)
    setTiers(tmp)
  }
  function removeTier (index) {
    const tmp = [...tiers]
    tmp.splice(index, 1)
    setTiers(tmp)
  }

  return (
    <div>
      <Navbar dark className='bg-dark'>
        <NavbarBrand className='mx-auto'>Ski Haus Calculator</NavbarBrand>
      </Navbar>
      <Container>
        <Alert color='light' fade={false} className='pl-0 pr-0'>
          All state is stored in the search bar to support sharing by URL. Click
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
            value={monthlyRent}
            onValueChange={({ floatValue }) => {
              setMonthlyRent(floatValue)
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
            value={monthlyUtilities}
            onValueChange={({ floatValue }) => {
              setMonthlyUtilities(floatValue)
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
            value={bedSpots}
            onValueChange={({ floatValue }) => {
              setBedSpots(floatValue)
            }}
            decimalScale={0}
            allowNegative={false}
            className='form-control'
          />
        </FormGroup>
        <hr />
        <Summary
          monthlyRent={monthlyRent}
          monthlyUtilities={monthlyUtilities}
          bedSpots={bedSpots}
          tiers={tiers}
        />
        <hr />

        <Card className='mb-3'>
          <CardHeader>Tiers</CardHeader>
          <ListGroup flush>
            {tiers.map((tier, index) => (
              <Tier
                key={index}
                update={updateTier.bind(this, index)}
                remove={removeTier.bind(this, index)}
                {...tier}
              />
            ))}
          </ListGroup>
          <CardFooter>
            <Button block onClick={toggleModal} color='dark' block>
              <i className='fas fa-plus'></i> Add Tier
            </Button>
          </CardFooter>
        </Card>

        <AddTierModal
          isOpen={modal}
          toggle={toggleModal}
          add={addTier}
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

export default App
