import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';


class InstructorDash extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            alerts:[],
            alertsLoaded:true
        }

    }

    componentDidMount(){
        

    }

    render(){
        if(this.state.alertsLoaded){
            return(
                <Container> 
                    <Row>
                        <Col>
                        <Table>

                        </Table>
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <div>loading</div>
            )
        }
    }
}

export default InstructorDash;