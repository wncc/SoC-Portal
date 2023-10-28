import React from "react";
import axios from "axios";
import { useState } from "react";
import MyComponent from "../components/MyComponent";
import MyComponent2 from "../components/MyComponent2";
import '../components/project_form.css'



export default function ProjectForm(){

    const [projectlist , setProjectlist] = useState({
        title: '',
        abc: '',
        categary: '',
        mentee_min: '',
        mentee_max: '',
        description: '',
        timeline: '',
        banner_image: '',

    })

    const detailsChange = (e) => {
        const {id,value} = e.target
        setProjectlist({
          ...projectlist,
            [id] :  value,
            // console.log(projectlist)
        })
        console.log('id:', id);
        console.log('value:', value);
    }

    const detailsSubmit = (e) => {
        console.log(projectlist)
        axios.post('/api/dashboard/mentor/submit/',projectlist)
        .then(res =>{
            console.log(res)
        }).catch(err =>
             console.log(err))
    }


    const handleRollNumberChange = (e) => {
        var roll = e.target.value ? e.target.value : null;
        if(roll === null) return;
        axios.get('/api/accounts/'+'?search='+roll)
        .then( function(roll_number){
            
            if(roll_number.data.length === 0){
                alert("No such user exists")
                e.target.style.backgroundColor = 'red';
            }
            else{
                e.target.style.backgroundColor = 'green';
            }
                
            })
        .catch( err =>{
            alert(err);
        })
        
    }

    const handleRollSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className="project_form">
            <h1>Project Form</h1>
            <form>
                <label>Project Title</label>
                <input type='text' id='title' onChange={detailsChange}/>
                <label>
                    Co Mentors 
                    <input type='text' placeholder="Co-Mentor-1 RollNumber" onBlur={handleRollNumberChange}/>
                    <input type='text' placeholder="Co-Mentor-2 RollNumber" onBlur={handleRollNumberChange}/>
                </label>
                <label>
                    Title your project idea   
                    <input  type='text' id='abc' requried onChange={detailsChange}/>
                </label>
                <label>
                    Project Category
                    <select id='categary' onChange={detailsChange}>
                        <option value={0}>Select Category</option>
                        <option value="WEB3">WEB3</option>
                        <option value="AIML">AIML</option>
                        <option value="DEV">DEV</option>
                        <option value="CP">CP</option>
                        <option value="MISC">MISC</option>
                    </select>
                </label>   
                <label>
                    Description of the project
                    <input type='text' id='description' onChange={detailsChange}/>
                </label>  
                <label>
                    minimum number of mentees
                    <input type='number' id='mentee_min' onChange={detailsChange}/>
                </label> 
                <label>
                    maximum number of mentees
                    <input type='number' id='mentee_max' onChange={detailsChange}/>
                </label> 
                <label>
                    Prereqisite of the mentees(if any)
                    <input type ='text' id='abstract' onChange={detailsChange}/>
                </label>
                <label>
                    Timeline(if any)
                    <input type ='text' id='timeline' onChange={detailsChange}/>
                </label>
                <label>
                    upload the banner of the project (as pdf)
                    <input type='file'id='banner_image' onChange={detailsChange}/>
                </label>
            </form>
            <button onClick={detailsSubmit}>
                Submit Project
            </button>
        </div>
    )
}
