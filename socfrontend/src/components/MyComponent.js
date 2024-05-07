import React from "react";
import './comments.css';

export default function MyComponent({text}){
    if (text.length === 0)
    {
        return(
            <div className="searchbar">
                <p>
                    No Profiles Found
                </p>
            </div>
        )
    }
    return(
        <div className="searchbar">
            <p>
              {text[0].roll_number}
            </p>
        </div>
    )
}