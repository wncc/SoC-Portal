import React from "react";
import axios from "axios";
import { useState } from "react";
import MyComponent from "./MyComponent";
import MyComponent2 from "./MyComponent2";



export default function ProjectForm(){

    const [projectlist , setProjectlist] = useState({
        project_name : '',
        project_type : '',

    })

    const [roll_number,setRoll_number] = useState({
        roll_number : '',
    })


    const handleChange = (e) => {
        const {id,value} = e.target;
        // console.log(roll_number)
        setRoll_number((prevRoll_number) => ({
            ...prevRoll_number,
            [id]: value,
          }));
    }

    // const [toggle,setToggle] = useState(false)
    // const [anyone,setAnyone] = useState(false)

    const handleSubmit = (e) => {
        // console.log(roll_number)
        e.preventDefault();
        axios.get('/api/accounts/',roll_number)
        .then( function(roll_number){
            console.log(roll_number.data[0].roll_number)
        })
        .catch( err =>{
            alert(err);
        })
    }
    return (
        <>
            <h1>Project Form</h1>
            <form>
                <label>Project Title</label>
                <input type='text' />
                <br></br>
                <label>
                    <input id='roll_number'  type='search' placeholder="Enter Roll number"/>
                    <button onClick={handleSubmit}>
                        Search
                    </button>
                    {/* {toggle && <MyComponent text="roll_number"/>} */}
                    {/* {anyone && <MyComponent2 />} */}
                </label>

                <br></br>
                <label>
                    Title your project idea   
                    <input  type='text' />
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