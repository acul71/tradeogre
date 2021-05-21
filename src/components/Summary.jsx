import React from 'react'
import {formatPrice} from '../lib/utils'


function Summary(props) {
  let coinPercLine = ''
  let totValue = 0
  try {
    //const btc = await getBTC()
    //console.log('btc=', btc)
    const coinData = props.coinData
    totValue = coinData.reduce((acc,coinData) => acc + coinData.balance * coinData.price, 0)
    const coinPerc = coinData.map((coin) => formatPrice(coin.balance * coin.price / totValue * 100))
    coinPercLine = coinPerc.reduce((acc, perc) => acc + perc + '% ', '')
    console.log('coinPerc=', coinPerc, coinPercLine)
  } catch(err) {
    console.log(err)
  }
  //let [symbol, prec] = formatCurrency(props.currency)
  return (
    
    <p>{formatPrice(totValue, props.currency)}</p>
    
  )
}

export default Summary

