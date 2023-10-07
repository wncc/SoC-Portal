import React from "react";
import "./textstyle.css"
import "./scrollable.css"

export default function Textform(){
    return(
    <>
        <div >
            <h2 class="forSOC">
                What is SOC?
            </h2>
            <p class ="text" >
                SOC is one of the flagship events organised by WnCC, IIT Bombay. In this event a number of project are provided
                to the students and they have to apply for the project according to their interest. if selected they are provided
                mentors who are expert in their respective fields and help the students complete their project.
            </p>
        </div>
        <div>
            <h2>
                Past Year Stats
            </h2>
        </div>
        <div class="containerscrollable">
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
                <div class="container1">
                </div>
        </div>
        <div>
            <h2>
                Reviews
            </h2>
        </div>
    </>
    )
}
