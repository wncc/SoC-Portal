import ProjectCard from "../components/ProjectCard"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./ProjectCard.css";

export default function Projects() {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        // Make an HTTP request to fetch the card image from the backend
        axios.get('/api/projects/')
          .then((response) => {
            // Assuming the response contains the image URL
            console.log(response.data);
            setDetails(response.data);
          })
          .catch((error) => {
            console.error('Error fetching card image:', error);
          });
      }, []);

    return (<section className="project-card">
        <h1>Projects</h1>
        {details.map((details,index)=>(
        <div key={index}>
            <ProjectCard link={details.banner_image} title={details.title} />
        </div>
        ))}

    </section>);
}
