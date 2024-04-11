import React from 'react';
import ProjectTimeline from '../components/ProjectTimeline';
import { useState, useEffect } from 'react';
import axios from "axios";
import Mentor from '../components/Mentor';
import ProjectTitle from '../components/ProjectTitle';


export default function ProjectDetails() {

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


    return (  
        <>
            <div className="px-24 py-20">
                
                <div className="grid grid-cols-1 pb-10 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-75 rounded-lg">
                        <img alt="" src="https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item221.jpg" className="h-75 w-full object-cover"/>
                        {/* <img alt="" src={details.banner_image} className="h-75 w-full object-cover"/> */}
                    </div>
                    <div className="h-75 rounded-lg lg:col-span-2">
                        <div className='flex items-center justify-center'>
                            <div className="relative inline-flex justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group">
                                <span className="w-0 h-0 rounded bg-indigo-600 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                                <ProjectTitle text="Developing Trading Strategy with Pine Script"/>
                                {/* <ProjectTitle text={details.title}/> */}
                            </div>
                        </div>
                        {/* <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl"></h1> */}
                        <h4 className="px-20 pt-10 text-2xl text-indigo-400 sm:text-3xl">Mentors:</h4>
                        <ul className="pl-40">
                            <li>
                                <p>
                                    Advait Patole
                                </p>
                            </li>
                            <li>
                                <p>
                                    Shivesh Gupta
                                </p>
                            </li>
                        </ul>
                        {/* {details.map((details, index)=>(
                            <div key={index}>
                                <ul className="pl-40">
                                    <Mentor mentor={details.mentor}/>
                                </ul>
                            </div>
                        ))} */}
                        <h4 className="px-20 pt-5 text-2xl text-indigo-400 sm:text-3xl">Mentees:</h4>
                        <ul className="pl-40">
                            <li>
                                <p>20+</p>
                                {/* <p>{details.mentee}</p> */}
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="rounded-lg">
                    <h2 className="text-2xl text-indigo-600 sm:text-3xl">Description:</h2>
                    <p>We propose a deep learning method for single image super-resolution. They will start by learning the basics of python and then proceed onto deep learning. Following which they learn about deep neural network architecture for image super resolution and implement a model that takes a low-resolution image as the input and outputs the high-resolution one. Further readings: https://medium.com/analytics-vidhya/super-resolution-and-its-recent-advances-in-deep-learning-part-1-c6d927914d32
Prerequisites: None. Interest in image processing is appreciated. Basic knowledge about python and deep learning is a bonus but not necessary.</p>
                    {/* <p>{details.props}</p> */}
                    <p className='pt-3'>Prerequisites: BASIC PYTHON , (HTML OR STREAMLIT) , BASIC KNOWLEDGE OF NEURAL NETWORK, RNN</p>
                    {/* <p className='pt-3'>{details.prerequisites}</p> */}
                </div>
                {/* <ProjectTimeline/> */}
            </div>
        </>
    );
}