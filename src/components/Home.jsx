import React from 'react'
import CoinList from './CoinList'
import Summary from './Summary'
//import { Container } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Home(props) {
  return (
    <>
    <Container>
      <Row>
        <Summary coinData={props.coinData} currency={props.currency}/>
      </Row>
    </Container>
    <Container>
    <Row>
        <CoinList coinData={props.coinData} currency={props.currency}/>
      </Row>
    </Container>
    </>
  )
  

}


export default Home

