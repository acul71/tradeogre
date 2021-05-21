import React from 'react'
import PropTypes from 'prop-types'

import './Coin.css'

function Coin(props) {
  return (
    <tr>
      <td>{props.assetName}</td>
      <td>{props.price}</td>
      <td>{props.balance}</td>
      <td>{props.value}</td>
      <td>{props.portafolioPerc}</td>
    </tr>
  )
}

Coin.propTypes = {
  assetName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  portafolioPerc: PropTypes.string.isRequired
}

export default Coin

