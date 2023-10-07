import './App.css';
import React from 'react';
import MenteeForm from "./MenteeForm"


export default function App() {
  return (
    <>
    <div className="App">
      <MenteeForm />
    </div>
          <Navbar title="SOC"/>
          <Textform />
          <div class="containerscrollable">
            <Reviews Name="abc" text= "what he has to say" value={0}/>
            <Reviews Name="abc" text= "what he has to say" value={50}/>
            <Reviews Name="cde" text= "what he has to say" value={50}/>
            <div>
              <button onClick={<Button/>}>
                click
              </button>
            </div>
          </div>
      </div>
  </>
  );
}
