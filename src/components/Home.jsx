import React from 'react'
import CoinList from './CoinList'
import Summary from './Summary'

function Home(props) {
  return (
    <div>
      <h2>HOME</h2>
      <Summary coinData={props.coinData} currency={props.currency}/>
      <CoinList coinData={props.coinData} currency={props.currency}/>
    </div>
  )
}


export default Home

