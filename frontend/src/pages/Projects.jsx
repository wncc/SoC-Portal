import ProjectCard from "../components/ProjectCard"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../components/ProjectCard.css";
import {Outlet} from 'react-router-dom'

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

  return (<section className="project-card" >
    <Outlet/>
    <div className="px-24 py-20 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 ">
      <ProjectCard  ProjectId="1" link="https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item221.jpg" title="TEXT SUMMARIZATION WEB APP" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?"/>
      <ProjectCard ProjectId="2" link="https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item222.jpg" title="Competitive Programming" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?"/>
      <ProjectCard ProjectId="3" link="https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item226.png" title="Developing Trading Strategy with Pine Script" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?"/>
      <ProjectCard ProjectId="4" link="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" title="How to position your furniture for positivity" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?"/>
      <ProjectCard ProjectId="5" link="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" title="How to position your furniture for positivity" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?"/>
    </div>
    <div className="px-24 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 py-20">
    {details.map((details, index) => (
      <div key={index}>
        <ProjectCard link={details.banner_image} title={details.title} description={details.props} />
      </div>
    ))}
    </div>
  </section>);
}
