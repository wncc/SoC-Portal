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

    const [roll_number,setRoll_number] = useState()


    const handleRollNumberChange = (e) => {
        setRoll_number(e.target.value);
    }

    // const [toggle,setToggle] = useState(false)
    // const [anyone,setAnyone] = useState(false)

    const handleSubmit = (e) => {
        // console.log(roll_number)
        e.preventDefault();
        console.log(roll_number)
        axios.get('/api/accounts/'+'?search='+roll_number)
        .then( function(roll_number){
            console.log(roll_number.data)
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
                <input type='text' id='title'/>
                <br></br>
                <label>
                    <input id='roll_number'  type='search' onChange={handleRollNumberChange}/>
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
