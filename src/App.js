//import logo from './logo.svg'
import React, { useState, useEffect } from 'react'
import './App.css'
//import 'bootstrap/dist/css/boostrap.min.css'
import 'bootswatch/dist/darkly/bootstrap.min.css'

//import '@fortawesome/fontawesome-free/js/all' 
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import axios from 'axios'


import Login from './components/Login'
import FirstTimePass from './components/FirstTimePass'
import Home from './components/Home'

import {getBTC} from './lib/utils'
import {walletData} from './wallet'

import { passwordExists } from './lib/utils'

const deepcopy = require('deepcopy')



// Refresh time in secs
let RefreshTimeSec = 30



function About() {
  return <h2>About</h2>;
}

function User() {
  return <h2>User</h2>;
}


function App() {
  const [authFlag, setAuthFlag] = useState(false)

  function enableAuth() {
    console.log("Logged in")
    setAuthFlag(true)
  }

  const [firstTime, setFirstTime] = useState(!passwordExists())
  const [coinData, setCoinData] = useState([])
  const [currency, setCurrency] = useState('USD')
  //const [refreshTime, setRefreshTime] = useState(RefreshTimeSec)
  

  async function getMarkets(coinData = []) {
    try {
      // Get BTC quote in currency
      const btc = await getBTC(currency)
      console.log('getMakets: btc=', btc)
      console.log('getMakets: coinData=', coinData)
      const response = await axios.get('https://tradeogre.com/api/v1/markets')
      console.log('getMakets: response.data=', response.data)
      const myCoinData = deepcopy(coinData)
      myCoinData.forEach( (coin,idx) => {
        if (coin.ticker === 'BTC') {
          coin.price = btc
        } else {
          const exchangeCoin = response.data.filter( exchangeCoin => exchangeCoin['BTC-' + coin.ticker] )
          //const exchangeCoin = response.data.filter( (exchangeCoin,idx) => idx === 0 )
          console.log("getMarkets: exchangeCoin=", exchangeCoin)
          try {
            //coin.price = parseFloat(exchangeCoin[0]['BTC-' + coin.ticker].price)
            coin.price = parseFloat(exchangeCoin[0]['BTC-' + coin.ticker].price) * btc
          } catch (error) {
            console.error(error);
          }
        }
        //console.log("getMarkets: coin=", coin)
      })
      console.log("getMarkets: myCoinData=", myCoinData)
      return myCoinData
      
            
    } catch (error) {
      console.error(error);
    }
  }


  const refreshPrice = async (coinData) => {
    console.log("Calling exchange API to refresh...")

    
    console.log("App: coinData=", coinData)
    
    const fromExchangeCoinData = await getMarkets(coinData)
    console.log("App: After getMarkets coinData=", coinData)
    
    console.log("In refreshPrice: fromExchangeCoinData=", fromExchangeCoinData)
    if (fromExchangeCoinData !== undefined) {
      setCoinData(fromExchangeCoinData)
    }
  }

  const componentDidMount = () => {
    const savedCoinData = walletData
    setCoinData(savedCoinData)
    refreshPrice(savedCoinData)
    setInterval( () => {
      refreshPrice(savedCoinData)
    }, RefreshTimeSec*1000)
    
  }

  /*
  const testSessionStorage = (n) => {
    const pack = "x".repeat(1024*100)
    for (let i = 0; i < n; i++) {
      sessionStorage.setItem('Z_' + i, pack)
      console.log("TESTEST.\r")
      
    }
  }
*/

  useEffect( () => {
    // try catch here: Error coinData is undefined!!!!
    if (coinData.length === 0) {
      // componentDidMount
      console.log("componentDidMount")
      componentDidMount()
      //testSessionStorage()
    } else {
      // componentDidUpdate
      console.log("componentDidUpdate")

    }
  })

  console.log('firstTime=', firstTime)
  if (firstTime) {
    return(
      <FirstTimePass setFirstTime={setFirstTime} />
    )
  }

  if (authFlag) {
    return (
      <div className="App">
        <Router>      
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
              <Navbar.Brand href="#home">TradeOgre</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to='/about'>
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/user'>
                  <Nav.Link href="#user">User</Nav.Link>
                </LinkContainer>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/">
              <Home coinData={coinData} currency={currency}/>
            </Route>
          </Switch>
          
        </Router>
      </div>
    )
  } else {
    return (
      <Login enableAuth={enableAuth}/>
    )
  }
}

export default App;
