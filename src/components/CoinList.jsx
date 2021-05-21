import React from 'react'
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table'

import Coin from './Coin'
import {formatPrice} from '../lib/utils'

function CoinList(props) {
  let totValue = 100
  try {
    const coinData = props.coinData
    totValue = coinData.reduce((acc,coinData) => acc + coinData.balance * coinData.price, 0)
  } catch(err) {
    console.log(err)
  }
  
  // try catch here: Error props.coinData.map is undefined!!!!
  // TypeError: Cannot read property 'map' of undefined when internet is offline
  return (
    
    <Table striped bordered hover>
        <thead className="">
          <tr>
            <th>Asset Name</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Value</th>
            <th>Portfolio %</th>
          </tr>
        </thead>
        <tbody>
          {
            props.coinData.map( 
               ({key, name, ticker, balance, price}) => 
                  <Coin 
                     key={key}
                     assetName = {name + ' (' + ticker + ')'}
                     name={name} 
                     ticker={ticker}
                     balance={balance}
                     price={formatPrice(price, props.currency)}
                     value={formatPrice(balance * price, props.currency)}
                     portafolioPerc={parseFloat(Number(balance * price / totValue * 100, props.currency).toFixed(2)) + '%'}
                  /> 
            )
          }
        </tbody>
      </Table>
      
    
  )
}

CoinList.propTypes = {

}

export default CoinList

