import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Reviews from './components/Reviews';
import Login from './pages/Login';
import Projects from './pages/Projects';
import "./components/scrollable.css"
import Button from './components/Button';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './pages/ProjectFrom';
import Register from './pages/Register';


export default function App() {
  return (
    <>
      <div class="background">
        <Navbar title="SOC" />
        <Routes>
          <Route path="/" element={<Textform />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/current_projects" element={<Projects/>}/>
          {/* <Route path="/course" element={<Courses />} />
          <Route path="/live" element={<Live />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/previous_projects" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Dashboard/ProjectForm" element={<ProjectForm/>}/>
        </Routes>

        {/* <div class="containerscrollable">
          <Reviews Name="abc" text="what he has to say" value={0} />
          <Reviews Name="abc" text="what he has to say" value={50} />
          <Reviews Name="cde" text="what he has to say" value={50} />
          <div>
            <button onClick={<Button />}>
              click
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}
