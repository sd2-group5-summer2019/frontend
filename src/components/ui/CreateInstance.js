import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function apiCall(props){

    const response = "Api call error"


    return response;
}


class CreateInstance extends React.Component{
   
    // takes in a prop when you call the component <CreateInstance form_id={form_id} />
    constructor(props){
        super(props)
        this.state={
            form_id:this.props.form_id,
            start_date:'',
            end_date:'',
            code:'0',
            preview:[],
            list:[],
            data:[],
            loading:false,
            loadingButton:'load',
            dataLoaded:false
        }
            this.formHandler = this.formHandler.bind(this)
            this.selectTable = this.selectTable.bind(this)
            this.toggleList = this.toggleList.bind(this)
            this.loadSelectionData = this.loadSelectionData.bind(this)
            this.createPayload = this.createPayload.bind(this)
            this.changeCode = this.changeCode.bind(this)
       }

    // either adds or remove student/group from list to send to 
    // payload
    toggleList(e){

        const temp = this.state.list
        const id = e.target.id
        const index = e.target.value

    if(temp[index] === undefined || temp[index].id=== 'removed' ){
        temp[index]={'user_id':id}
    }else{
        temp[index] = {'id':"removed"}
    }
     

        this.setState({
            list:temp
        })
        console.log(temp)
        console.log(temp[index])

        this.selectTable()
    }

    

    selectTable(){
        const data = this.state.data

        const temp = <Table responsive="sm" bordered hover>
                    <thead>
                        <tr>
                         <th>Name</th>
                        <th>Assign</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {data.map((data, i) =>
                                        <tr value={data.user_id} key={data.user_id}>
                                            <td>{data.first_name + " " + data.last_name}</td>
                                            <td>
                                                {this.state.list[i] === undefined || this.state.list[i].id ==='removed' ? 
                                                    <Button size="lg" id={data.user_id} value={i} variant="success" onClick={this.toggleList} > Select</Button>
                                                    :
                                                    <Button size="lg" id={data.user_id} value={i} variant="danger" onClick={this.toggleList} > Deselect</Button>
                                                }
                                                
                                                </td> 
                                        </tr>
                                    )}
                        
                    </tbody>
                </Table>

       

     
            this.setState({
            preview:temp,
            dataLoaded:true
        })
        
        return true;
    }

    changeCode(e){
        const temp = e.target.value
        console.log(temp)
        this.setState({
            code:temp
        })
    }

    loadSelectionData(e){
        e.preventDefault()
        const code_val = parseInt(this.state.code)
        
        let apiCall = 'getAllStudents'

        const testing = `http${apiCall}`
        
        

        if(code_val === 4){
            apiCall  = 'getAllStudents'
        }else if(code_val === 5){
            apiCall = 'getAllStudents'
        }
      
      
        
        this.setState({
            loading:true,
            loadingButton:'loading...'
        })
        
        axios.post(`http://localhost:3001/api/${apiCall}`)
        .then(res => {
            console.log(res.data)
            this.setState({
              data:res.data,
              code:code_val,
          })})
          .then( (flag = this.selectTable()) =>{
                
            this.setState({
                    loading:false,
                    loadingButton:'done'
                })
          }).catch(function (error){console.log(error + "createInstance loadSelectiondata()")})

    }

    createPayload(code_value){

        const code = parseInt(code_value)
        const current_term ='summer'
        const current_year = '2019'
        const payload = {form_id:parseInt(this.state.form_id)}

        const list = this.state.list.filter(function(item){
            return item.id !== 'removed';
        })

        switch(code){
            case 1:
                payload.code = 1
                payload.sd1_term = current_term
                payload.sd1_year = current_year
                payload.sd2_term = current_term
                payload.sd2_year = current_year
            break;
            case 2:
                payload.sd1_term = current_term
                payload.sd1_year = current_year
                payload.code = 1
            break;
            case 3:
                    payload.sd2_term = current_term
                    payload.sd2_year = current_year
                    payload.code = 1
            break;
            case 4:
                payload.code = 2
                payload.teams = list

            break;
            case 5:
                payload.code = 3
                payload.students = list;
            break;
            default:
                console.error("payload unable to be created in assignment");
            break;
        }

        return payload;
    }

    formHandler(e){
      
        const payload = this.createPayload(this.state.code)
        payload.end_date = e.target.end_date.value
        payload.start_date = e.target.start_date.value
        console.log(payload.end_date)

        axios.post('http://localhost:3001/api/assignForm', payload).then(res=>{

            console.log(res.data)
        })
         
        
    }
    
    
    render(){

        const selectTable = this.state.preview
        const tempCode = this.state.code
        const loadingButton = this.state.loadingButton
        const loaded = this.state.dataLoaded
        return(
            <Form name="form" onSubmit={this.formHandler}>
                <Form.Row>
                    <Form.Group as={Col} controlId="start_date"required>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date"></Form.Control>
                    </ Form.Group>
                    <Form.Group as={Col} controlId="end_date" required>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date"></Form.Control>
                    </Form.Group>
                </ Form.Row >
                
                    <Form.Group controlId="assignTo">
                        <Form.Label>Assign To</Form.Label>
                        <Form.Control onChange={this.changeCode} as="select">
                                <option>Select</option>
                                <option  value={1}>All Current Classes</option>
                                <option  value={2}>SD1 Only</option>
                                <option  value={3}>SD2 Only</option>
                                <option  value={4}>Team(s)</option>
                                <option  value={5}>Student(s)</option>
                        </Form.Control>
                    </Form.Group>
                    { (tempCode === '4' || tempCode === '5') && !loaded ?
                        <section>
                            <Button size="lg" onClick={this.loadSelectionData}>{loadingButton}</Button>               
                        </section>
                        : <section>
                            <Button size="lg" variant="primary" type="submit"> Assign </Button>
                        </section>
                    }
                   
                   {selectTable}
                
            </Form>
        )
    }
}

export default CreateInstance;