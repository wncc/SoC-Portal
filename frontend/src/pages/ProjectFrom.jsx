import React from "react";
import axios from "axios";
import { useState } from "react";
import MyComponent from "../components/MyComponent";
import MyComponent2 from "../components/MyComponent2";



export default function ProjectForm(){

    const [projectdata , setProjectdata] = useState({

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
                <input type='text' required/>
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
                            <input type='radio' name="item" />
                            App Development
                        </label> 
                        <br></br>
                        <label>
                            <input type='radio' name="item" />
                            Web Development
                        </label> 
                        <br></br>
                        <label>
                            <input type='radio' name="item"/>
                            Game Development
                        </label> 
                        <br></br>
                        <label>
                            <input type='radio' name="item"/>
                            Blockchain Development
                        </label>
                        <br></br>
                        <label>
                            <input type='radio' name="item"/>
                            Machine Learning
                        </label>
                        <br></br>
                        <br></br>
                </div>   
                <label>
                    <input type='text'/>
                    Description of the project
                </label>  
                <br></br>
                <label>
                    <input type='number'/>
                    number of mentees you need
                </label> 
                <br></br>
                <label>
                    Prereqisite of the mentees(if any)
                    <input type ='text'/>
                </label>
                <br></br>
                <label>
                    upload the banner of the project (as pdf)
                    <input type='pdffile'/>
                </label>
            </form>
        </>
    )
}