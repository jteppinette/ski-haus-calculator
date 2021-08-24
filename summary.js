import Dinero from 'dinero.js'
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { dollarsToCents } from './utils.js'

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

export default Summary
