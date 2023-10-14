import React from "react";
import axios from "axios";
import { useState } from "react";
import MyComponent from "../components/MyComponent";
import MyComponent2 from "../components/MyComponent2";



export default function ProjectForm(){

    const [projectlist , setProjectlist] = useState({
        title : '',
        cateogary : '',
        mentee_min : '',
        mentee_max : '',
        description : '',
        timeline : '',
        banner_image : '',

    })


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
        <>
            <h1>Project Form</h1>
            <form>
                <label>Project Title</label>
                <input type='text' id='title'/>
                <br></br>
                <label>
                    Co Mentors 
                    <input type='text' placeholder="Co-Mentor-1 RollNumber" onBlur={handleRollNumberChange}/>
                    <input type='text' placeholder="Co-Mentor-2 RollNumber" onBlur={handleRollNumberChange}/>

                </label>

                <br></br>
                <label>
                    Title your project idea   
                    <input  type='text' requried/>
                </label>
                <br></br>
                <div>
                        <h3>Project Cateogary</h3>
                            <label>
                                Select an option:
                                <select name="option" id='cateogary'>
                                <option value="WEB3">WEB3</option>
                                <option value="AIML">AIML</option>
                                <option value="DEV">DEV</option>
                                <option value="CP">CP</option>
                                <option value="MISC">MISC</option>
                                </select>
                            </label>
                        <br></br>
                        <br></br>
                </div>   
                <label>
                    <input type='text' id='description'/>
                    Description of the project
                </label>  
                <br></br>
                <label>
                    <input type='number' id='mentee_min'/>
                    minimum number of mentees
                </label> 
                <br></br>
                <label>
                    <input type='number' id='mentee_max'/>
                    maximum number of mentees
                </label> 
                <br></br>
                <label>
                    Prereqisite of the mentees(if any)
                    <input type ='text' id='abstract'/>
                </label>
                <br></br>
                <label>
                    timeline(if any)
                    <input type ='text' id='timeline'/>
                </label>
                <br></br>
                <label>
                    upload the banner of the project (as pdf)
                    <input type='file'id='banner_image'/>
                </label>
            </form>
        </>
    )
}
