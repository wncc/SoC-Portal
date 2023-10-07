import './App.css';
import React from 'react';
import MenteeForm from "./MenteeForm"
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Reviews from './components/Reviews';
import "./components/scrollable.css"
import Button from './components/Button';
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <>
      <div class="background">
        <Navbar title="SOC" />
        <Routes>
          <Route path="/" element={<Textform />} />
          <Route path="/register" element={<MenteeForm />} />
          {/* <Route path="/course" element={<Courses />} />
          <Route path="/live" element={<Live />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      
        <div class="containerscrollable">
          <Reviews Name="abc" text="what he has to say" value={0} />
          <Reviews Name="abc" text="what he has to say" value={50} />
          <Reviews Name="cde" text="what he has to say" value={50} />
          <div>
            <button onClick={<Button />}>
              click
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
