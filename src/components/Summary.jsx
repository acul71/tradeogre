import React from 'react'
import {formatPrice} from '../lib/utils'
import Plot from 'react-plotly.js';
import { Container } from 'react-bootstrap';

const makePie = (coinData, coinPerc) => {
  const data = []
  const layout = {}

  //Plotly.newPlot()
}


function Summary(props) {
  let coinPercLine = ''
  let totValue = 0
  //const data = [{values: [], labels: [], type: "", hole: 0, overinfo: ""}]
  const data = [{values: [], labels: [] }]
  try {
    //const btc = await getBTC()
    //console.log('btc=', btc)
    const coinData = props.coinData
    totValue = coinData.reduce((acc,coinData) => acc + coinData.balance * coinData.price, 0)
    const coinPerc = coinData.map((coin) => formatPrice(coin.balance * coin.price / totValue * 100))
    coinPercLine = coinPerc.reduce((acc, perc) => acc + perc + '% ', '')
    console.log('Summary: coinPerc=', coinPerc, coinPercLine)
    
    

  } catch(err) {
    console.log(err)
  }
  //let [symbol, prec] = formatCurrency(props.currency)

  // Make Pie graph
  
  props.coinData.forEach( (coin,idx) => {
    //data[0].values.push(coin.balance * coin.price / totValue * 100)
    data[0].values.push(coin.balance * coin.price)
    data[0].labels.push(coin.ticker)
  })
  data[0].type = 'pie'
  data[0].hole = .8
  //data[0].name = formatPrice(coin.balance * coin.price, props.currency)
  //data[0].name = "name"
  data[0].hoverinfo = 'label+percent+name'
  data[0].hoverinfo = 'label+percent'
  /*
  const data = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie',
    hole: .7,
  }];
  */
  const layout = {
    title: "",
    //text: formatPrice(totValue, props.currency),
    text: "test",
    paper_bgcolor: "#222222",
    //paper_bgcolor: "#666666",
    height: 400,
    width: 500, 
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: formatPrice(totValue, props.currency),
        x: 0.5,
        y: 0.5
      }
    ]
  };

  return (
    <>
    <Container>
      <Plot  data={data} layout={layout}/>
    </Container>
    <Container>
      <p>Balance: {formatPrice(totValue, props.currency)}</p>
    </Container>
    </>
    
  )
}

export default Summary

