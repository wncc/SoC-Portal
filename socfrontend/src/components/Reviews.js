import React from "react";
import "./comments.css"

export default function Reviews(props){
    return(
    <div className="container">
        <h4>
            {props.Name}
        </h4>
        <p>
            {props.text}
        </p>
        <progress value={props.val} max = {100} ></progress>
    </div>
    )
}


