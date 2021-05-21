import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


function FirstTimePass() {
   
   let password = React.createRef()
   let passwordMsg = React.createRef()
   let passwordConfirm = React.createRef()
   let passwordConfirmMsg = React.createRef()
   let passwordErrorMsg = React.createRef()
   let passLength = false
   let passConf = false

   function handleChangePassword(e) {
      e.preventDefault()
      
      // Check password
      if (password.current.value.length >= 8) {
         password.current.className = password.current.className.replace('is-invalid', 'is-valid')
         passwordMsg.current.textContent = ''
         passwordErrorMsg.current.textContent = ''
         passLength = true
      } else {
         password.current.className = password.current.className.replace('is-valid', 'is-invalid')
         passwordMsg.current.textContent = 'Password has to be at least 8 chars'
         passLength = false
      }

      // Check confirm password
      if (password.current.value === passwordConfirm.current.value) {
         passwordConfirm.current.className = passwordConfirm.current.className.replace('is-invalid', 'is-valid')
         passwordConfirmMsg.current.textContent = ''
         passwordErrorMsg.current.textContent = ''
         passConf = true
      } else {
         passwordConfirm.current.className = passwordConfirm.current.className.replace('is-valid', 'is-invalid')
         passwordConfirmMsg.current.textContent = "Password don't match"
         passConf = false
      }
   }
   
   function handleSubmit(e) {
      if (passLength && passConf) {
         //passwordErrorMsg.current.textContent = ''
         console.log('Submit: Right!')
      } else {
         
         let msg = ''
         if (!passLength) msg = 'Password has to be at least 8 chars. '
         if (!passConf) msg += "Password don't match."
         //passwordErrorMsg.current.textContent = msg
         
         console.log('Submit: Wrong!:', msg)
      }   
   }

   
   return (
      
      <Container fluid="sm">
         <h4>Please create a password for system security</h4>
         <Form onSubmit={(e) => e.preventDefault()}>   
            <Form.Group className='ml-1 mt-3' controlId="password">
               <Col sm={3}>
                  <Form.Label className="text-center">Password</Form.Label>
               </Col>
               <Col sm={4}>
                  <Form.Control
                     //isValid = {passwordIsValid}
                     isInvalid = {true}
                     onChange={handleChangePassword}
                     type="password" 
                     placeholder="Insert password"
                     ref={password}
                  />
               </Col>
               <Col sm={4}><p className="text-danger" ref={passwordMsg}></p></Col>
            </Form.Group>
            <Form.Group className='ml-1 mt-3' controlId="passwordConfirm">
               <Col sm={3}>
                  <Form.Label className="text-center">Retype password</Form.Label>
               </Col>
               <Col sm={4}>
                  <Form.Control
                     //isValid = {passwordConfirmIsValid}
                     //isInvalid = {passwordConfirmIsInvalid}
                     isInvalid = {true}
                     onChange={handleChangePassword}
                     type="password"
                     placeholder="Confirm password"
                     ref={passwordConfirm}
                  />
               </Col>
               <Col sm={4}><p className="text-danger" ref={passwordConfirmMsg}></p></Col>
            </Form.Group>
            <Form.Label></Form.Label>
            <Col sm={3}>
               <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Col>
            <Col sm={4}><p className="text-danger" ref={passwordErrorMsg}></p></Col>
         </Form>
      </Container>
   )
}

export default FirstTimePass

