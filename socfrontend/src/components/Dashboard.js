import React from "react";
import ProjectForm from "../pages/ProjectForm";
import "./scrollable.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="LinkCSS">
      <Link to="/Dashboard/ProjectForm">Add Project</Link>
    </div>
  );
}
