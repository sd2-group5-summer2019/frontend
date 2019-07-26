import React from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button, Card} from 'react-bootstrap';


class InstructorDash extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            alerts:[],
            alertsLoaded:true,
            loading:false,
            form_type:'',
            lastClicked:'',
            page:0,
            studentName:'',
            form_title:'',
            additionalDataLoaded:false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        const payload = {"user_id":this.props.user_id}
        console.log(payload)


        this.setState({
            loading:true
        })
        axios.post(`http://` + this.props.ip_address  + `:3001/api/getUserDashboardAlerts`, payload, {headers:{authorization:this.props.token}}).then(response => {
            
            if(response.data !== undefined && response.data.status === undefined){
                
                this.setState({
                    loading:false,
                    alertsLoaded:true,
                    alerts:response.data
                })

                console.log(response.data)
            }
           
           
        })
        .catch(function (error){console.log(error)})

    }

    // really more of gather information thing
    changePage(e){
        // get student name and stuff
        const temp = this.state.additional
        const index = e.target.name
        const payload  = {"user_id" : this.state.alerts[index].user_id}
        const payload2 = {"user_id":this.state.alerts[index].user_id, "form_id":this.state.alerts[index].form_id}
        console.log(this.state.alerts[index].form_id)
        
        this.setState({
            loading:true
        })
        axios.post(`http://` + this.props.ip_address  + `:3001/api/getStudentName`, payload, {headers:{authorization:this.props.token}}).then(response => {
            
            if(response.data !== undefined && response.data.status === undefined){
                this.setState({
                  studentName:response.data 
                })
                console.log(response.data)
            }
        })
        .catch(function (error){console.log(error)})

        axios.post(`http://` + this.props.ip_address  + `:3001/api/getForm`, payload2, {headers:{authorization:this.props.token}}).then(response => {
           
             if(response.data !== undefined && response.data.status === undefined){
                this.setState({
                  form_type:response.data.formType
                })
                if(response.data.quiz !== undefined){
                    this.setState({form_type:'Quiz'})
                }else if(response.data.survey !== undefined){
                    this.setState({form_type:'Survey'})
                }
                    console.log(response.data)
            }
        })
        .catch(function (error){console.log(error)})

        this.setState({
            loading:false,
            additionalDataLoaded:true
        })

    }

    render(){

        const temp = this.state.alerts
        
        if(this.state.alertsLoaded && temp.length > 0 && this.state.page === 0){
            
            return(
                <Container> 
                    <Row>
                        <Col>
                        <Card>
                            <Card.Body>
                            {this.state.additionalDataLoaded ? "Name: " + this.state.studentName.first_name + " "+ this.state.studentName.last_name  + " Form type: " + this.state.form_type
                            
                            : '' }
                            </Card.Body>
                        </Card>
                        <Table  responsive="sm" striped bordered hover>
		                        <thead>
		              		        <tr>
		              			        <th>Group Name</th>
		              			        <th>Alerts</th>
		              		        </tr>
		               	        </thead>
                                 <tbody>
                                     {temp.map((temp, i) =>
                                        <tr value={temp.team_id} key={i}>
                                            <td>{temp.project_title}</td>
                                            <td><Button size="lg" name={i} onClick={this.changePage} variant="outline-danger"> View More</Button> </td>
                                            
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                       
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}>You have no alerts!</Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default InstructorDash;