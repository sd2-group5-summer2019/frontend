import React from 'react';
import {Redirect} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {Card, Button, Container, Row , Col} from "react-bootstrap";
import axios from 'axios';

class ActivateAccount extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            username:'',
            code:'',
            newPassword:'',
            newPasswordVerify:'',
            emailSent:false,
            newPasswordSent:false,
            codeSent:false,
            usernameError:'',
            codeError:'',
            passwordError:'',
            loading:false,
            token:''
        }

        this.checkUsername = this.checkUsername.bind(this);
        this.checkCode = this.checkCode.bind(this)
        this.changePassword = this.changePassword.bind(this);
    }

    checkUsername(e){
        e.preventDefault()
        const username = e.target.username.value

        const payload ={"username": e.target.username.value}
        this.setState({username:username, loading:true})

        axios.post(`http://` + this.props.ip_address + `:3001/api/verifyStudentEmail`, payload)
        .then(response => {
                if(response.data.status !== undefined){
                   this.setState({
                       usernameError:response.data.status
                   })
                }else{
                    console.log(response.data.token)
                    this.setState({
                        token:response.data.token,
                        emailSent:true
                    })
                }
        })
        .catch(function (error){console.log(error)})

        this.setState({loading:false})
        console.log(this.props.ip_address)

        console.log(e.target.username.value)
        console.log(this.state.username)
    }

    checkCode(e){
        e.preventDefault()
        const code = e.target.code.value
        console.log(code)
        const payload = {"username": this.state.username, "auth_code": code}
        console.log(payload)
        this.setState({code:code, loading:true})

        axios.post(`http://` + this.props.ip_address + `:3001/api/verifyCode`, payload, {headers:{authorization:this.state.token}})
        .then(response => {
            console.log(response.data)
                if(response.data.status !== undefined && response.data.status === 'Success'){
                 
                    this.setState({
                        loading:false,
                        codeSent:true
                    })
                }
        })
        .catch(function (error){console.log(error)})
    }

    changePassword(e){
        e.preventDefault()
        const password = e.target.password.value
        const passwordCheck = e.target.passwordCheck.value

        this.setState({ loading:true})

        if(password === passwordCheck){
            const payload = {"username": this.state.username, "new_password":password}    
            axios.post(`http://` + this.props.ip_address + `:3001/api/setNewPassword`, payload, {headers:{authorization:this.state.token}})
            .then(response => {
                    if(response.data.status !== undefined && response.data.status === 'Success'){
                        this.setState({
                            loading:false,
                            newPasswordSent:true
                        })
                    }
            })
            .catch(function (error){console.log(error)})
        }else{
            this.setState({
                passwordError:"Passwords don't match",
                 loading:true
            })
        }
       
    }



    render(){
        const emailSent = this.state.emailSent
        const codeSent = this.state.codeSent
        const newPasswordSent = this.state.newPasswordSent

        if(emailSent === false){
            return(
                <Container>
                    <Row><Col><br></br></Col></Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <Card className="text-center">
                                <Card.Header as="h1">Activate Account</Card.Header>
                              <Card.Body>
                                    <Card.Text></Card.Text>
                                  <Form onSubmit={this.checkUsername}>
                                        <Form.Group controlId="username"> 
                                        <Form.Label>Username(NID):</Form.Label>
                                        <Form.Control type="text" size="lg"  ></Form.Control>
                                        </Form.Group>
                                        <p>{this.state.usernameError}</p>
                                        <Button size="lg" type="submit">Submit</Button>
                                  </Form>
                              </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }else if(emailSent && !codeSent){
            return(
                <Container>
                <Row><Col><br></br></Col></Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Header as="h1">Enter Code</Card.Header>
                          <Card.Body>
                                <Card.Text> A code should have been sent to your knights email, use this code to finish validating your account</Card.Text>
                              <Form onSubmit={this.checkCode}>
                                    <Form.Group controlId="code"> 
                                    <Form.Label>Validation Code:</Form.Label>
                                    <Form.Control type="text" size="lg"  ></Form.Control>
                                    </Form.Group>
                                    <Button size="lg" type="submit">Activate Account</Button>
                              </Form>
                          </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            )
        }else if(emailSent && codeSent && !newPasswordSent){
            return(
                <Container>
                <Row><Col><br></br></Col></Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Header as="h1">Change Password</Card.Header>
                          <Card.Body>
                                <Card.Text>Your account has been validated, to login first you must change your password</Card.Text>
                                <Form onSubmit={this.changePassword}>
                                    <Form.Group controlId="password"> 
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" size="lg"  ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="passwordCheck">
                                    <Form.Label>Retype Password:</Form.Label>
                                    <Form.Control type="password" size="lg" ></Form.Control>
                                    </Form.Group>
                                    <Button size="lg" type="submit">Change Password</Button>
                              </Form>
                          </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            )
        }else{
            return <Redirect to="/"/>
        }
        
    }
}

export default ActivateAccount;