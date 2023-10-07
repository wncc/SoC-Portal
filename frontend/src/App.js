import './App.css';
import React from 'react';
import MenteeForm from "./MenteeForm"
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Reviews from './components/Reviews';
import "./components/scrollable.css"
import Button from './components/Button';


export default function App() {
  return (
    <>
      <div class="background">
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
