import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Reviews from "./components/Reviews";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import "./components/scrollable.css";
import Button from "./components/Button";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./pages/ProjectForm";
import Register from "./pages/Register";
import ProjectDetails from "./pages/ProjectDetails";
import PreferenceForm from "./pages/PreferenceForm";
import VerifyEmail from "./pages/VerifyEmail";
import RegisterSuccess from "./pages/RegisterSuccess";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginRoute from "./components/LoginRoute";
import PreferenceFormFilled from "./pages/PreferenceFormFilled";
import { useEffect, useState } from "react";
import axios from "axios";
import Wishlist from "./pages/Wishlist";

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    axios.get("/api/accounts/isloggedin/")
      .then((res)=>{
        console.log(res.data.status);
        setAuthToken(res.data.status==="YES");
      })
      .catch((err)=>{
        console.log(err);
      })
  },[])
  console.log(authToken);

  if (authToken === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div class="flex gap-2">
          <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="background">
        <Navbar title="SOC" />
        <Routes>
          <Route element={<LoginRoute authToken={authToken}/>}>
            <Route path="/register" element={<Register />} />
            <Route path="/registerSuccess" element={<RegisterSuccess />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes authToken={authToken}/>}>
            <Route path="/" element={<Textform />} />
            <Route path="/current_projects" element={<Projects />}/>
            <Route path="/current_projects/:ProjectId" element={<ProjectDetails />} />
            <Route path="/wishlist" element={<Wishlist />}/>
            {/* <Route path="/course" element={<Courses />} />
            <Route path="/live" element={<Live />} />
            <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/previous_projects" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/Dashboard/ProjectForm" element={<ProjectForm />} /> */}
            <Route path="/PreferenceForm" element={<PreferenceForm />} />
            <Route path="/PreferenceFormFilled" element={<PreferenceFormFilled />} />
          </Route>
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
