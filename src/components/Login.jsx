import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
const bcrypt = require('bcryptjs')

// Testing
//const PASSWORD = localStorage.getItem('password')
//const salt = bcrypt.genSaltSync(12)
//const passwordHash = bcrypt.hashSync(PASSWORD, salt)
//console.log("passwordHash=", passwordHash)

const passwordHash = localStorage.getItem('password')

function Login(props) {
   let password = React.createRef()
   let passwordMsg = React.createRef()

   function handleSubmit() {
      const passToCheck = password.current.value
      if ( bcrypt.compareSync(passToCheck, passwordHash) ) {
      //if (password.current.value === PASSWORD ) {
         passwordMsg.current.textContent = ''
         console.log('Password is right!')
         props.enableAuth()
         
      } else {
         passwordMsg.current.textContent = 'Wrong password!'
      }

   }
   

   return (
      <Container fluid="sm">
         <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className='ml-1 mt-3' controlId="password">
               <Col sm={3}>
                  <Form.Label className="text-center">Password</Form.Label>
               </Col>
               <Col sm={4}>
                  <Form.Control type="password" placeholder="Insert password" ref={password} />
               </Col>
               <Col sm={4}>
               <p className="text-danger" ref={passwordMsg}></p>
               </Col>
            </Form.Group>
            <Col sm={3}>
               <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Col>
         </Form>
      </Container>
   )
}

export default Login