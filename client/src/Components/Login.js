import React, { useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { URL } from './EnvVars'
import fetch from 'isomorphic-fetch'

export default function Login(props) {
        const [ userName, setuserName ] = useState('')
        const [ password, setPassword ] = useState('')

        const fetchURL = `${URL}/login`
        const handleSubmit = event => {
            event.preventDefault()
            const userObj = {
                userName: userName,
                password: password
            }
            console.log('userObj', userObj)
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
                    console.log(data.json())
                    props.history.push('/')
                })
                .catch(err => console.log(err))
        }
        const handleSwitch = event => {
            event.preventDefault()
            props.history.push('/register')
        }
        const handleChangeUserName = event => {setuserName(event.target.value)}
        const handleChangePassword = event => {setPassword(event.target.value)}

        return (
            <Container>
                <Row d-flex="justify-content-center">
                    <Col>
                    </Col>
                    <Col xs={12} sm={4} lg={3} d-flex="justify-content-center">
                    <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                      value={userName} onChange={handleChangeUserName}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                        value={password} onChange={handleChangePassword} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a onClick={handleSwitch}>password?</a>
                </p>
            </form>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        )
}