import React from "react";
import "./comments.css"
import PropTypes from "prop-types";

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

Reviews.defaultProps = {
    Name : 'aaditya',
    text : 'what he has to say',
    value : '50'
}
