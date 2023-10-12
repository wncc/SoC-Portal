import React from "react";
import './comments.css';

export default function MyComponent(props){
    return(
        <div className="searchbar">
            <p>
                {props.text}
            </p>
        </div>
    )
}