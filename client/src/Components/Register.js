import React, { useState } from "react" 
import { Container, Row, Col } from 'react-bootstrap' 
import { URL } from './EnvVars'
import fetch from 'isomorphic-fetch'
          
export default function Register(props){
    const fetchURL = `${URL}/register`
    const [ email, setEmail ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setconfirmPassword ] = useState('')
    const [ passwordMessage, setpasswordMessage ] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        if(password === confirmPassword){
            const userObj = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            }
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userObj)
            }
            fetch(fetchURL, configObj)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    props.history.push('/')
                })
                .catch(err => console.log(err))
        }
        else {
            setpasswordMessage('Passwords in both fields must match')
        }
        
    }
    const handleSwitch = event => {
        event.preventDefault()
        props.history.push('/login')
    }
    const handleChangeFirstName = event => {setFirstName(event.target.value)}
    const handleChangeLastName = event => {setLastName(event.target.value)}
    const handleChangeUserName = event => {setUserName(event.target.value)}
    const handleChangePassword = event => {setPassword(event.target.value)}
    const handleChangeConfirmPassword = event => {setconfirmPassword(event.target.value)}
    const handleChangeEmail = event => {setEmail(event.target.value)}
   
    return (
        <Container>
            <Row d-flex="justify-content-center">
                <Col>
                </Col>
                <Col xs={12} sm={4} lg={3} d-flex="justify-content-center">
                <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" 
                    value={ firstName } onChange={ handleChangeFirstName }/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" 
                    value={ lastName } onChange={ handleChangeLastName }/>
                </div>

                <div className="form-group">
                    <label>username</label>
                    <input type="text" className="form-control" placeholder="User Name" 
                    value={ userName } onChange={ handleChangeUserName }/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    value={ email } onChange={ handleChangeEmail }/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                    value={ password } onChange = { handleChangePassword }/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" 
                    value={ confirmPassword } onChange = { handleChangeConfirmPassword }/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a onClick={handleSwitch}>sign in?</a>
                </p>
            </form>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row d-flex="justify-content-center">
                {passwordMessage}
            </Row>
        </Container>
        
    )
}        
            