import Dinero from 'dinero.js'
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { dollarsToCents } from './utils.js'

function Summary (props) {
  const residentsCount = props.tiers.reduce(
    (sum, tier) => sum + tier.residentsCount,
    0
  )
  const monthlyRent = Dinero({
    amount: dollarsToCents(props.monthlyRent || 0)
  })
  const monthlyIncome = props.tiers.reduce(
    (sum, tier) =>
      sum.add(
        Dinero({ amount: dollarsToCents(tier.monthlyRent) }).multiply(
          tier.residentsCount
        )
      ),
    Dinero()
  )
  const monthlyDelta = monthlyIncome.subtract(monthlyRent)
  const requiredBedSpots = Math.ceil(
    props.tiers.reduce(
      (sum, tier) => (sum += tier.reservedCount * tier.residentsCount),
      0
    ) / 4
  )
  const bedSpotsDelta = (props.bedSpots || 0) - requiredBedSpots

  return (
    <Row className='text-center'>
      <Col xs={4} className='mb-3'>
        <strong>Monthly Income</strong>
        <br />
        {monthlyIncome.toFormat()}{' '}
        {monthlyDelta.isZero() ? null : (
          <span
            className={`mb-3 ${
              monthlyDelta.isNegative() ? 'text-danger' : 'text-success'
            }`}
          >
            ({monthlyDelta.isPositive() ? '+' : null}
            {monthlyDelta.toFormat()})
          </span>
        )}
      </Col>
      <Col xs={4}>
        <strong>Residents</strong>
        <br />
        {residentsCount}
      </Col>
      <Col xs={4}>
        <strong>Required Bed Spots</strong>
        <br />
        {requiredBedSpots}
        {bedSpotsDelta == 0 ? null : (
          <span
            className={`mb-3 ${
              bedSpotsDelta < 0 ? 'text-danger' : 'text-success'
            }`}
          >
            {' '}
            ({bedSpotsDelta > 0 ? '+' : null}
            {bedSpotsDelta})
          </span>
        )}
      </Col>
    </Row>
  )
}

export default Summary
