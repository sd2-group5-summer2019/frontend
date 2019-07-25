import React from 'react';
import axios from 'axios';


class StudentDashboard extends React.Component{

    constructor(props){
        super(props)
        this.state={
            assignments:[],
            meetings:[],
            tasks:[]
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        const assignments =[]
        const meetings = []
        const tasks = []
        const payload = {"user_id": this.props.user_id}
        
        axios.post(`http://` + this.props.ip_address  + `:3001/api/getInstances`, payload, {headers:{authorization:this.props.token}}).then(res =>{

            if(res.status=== 200){
                assignments = res.data.filter(function(item){
                    return (item.is_complete === 0 && (item.type === 'survey' || item.type === 'quiz'));
                })
                meetings = res.data.filter(function(item){
                    return (item.is_complete === 0 && (item.type === 'meeting'));
                })
                tasks = res.data.filter(function(item){
                    return (item.is_complete === 0 && (item.type === 'task'));
                })

                this.setState({
                    assignments:assignments,
                    meetings:meetings,
                    tasks:tasks
                })
                console.log(this.state)
            }
            
        }
        ).catch(
            error=>console.log(error)
        )
    }


    render(){
        return(
            <div>Student Dash</div>
        )
    }
}

export default StudentDashboard;