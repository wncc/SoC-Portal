import ProjectCard from "../components/ProjectCard"
import axios from "axios";
import "../components/Filter.css"
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import "../components/ProjectCard.css";
import {Outlet} from 'react-router-dom'

export default function Wishlist() {

  const [details, setDetails] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Make an HTTP request to fetch the card image from the backend
  //   axios.get('/api/projects/wishlist')
  //     .then((response) => {
  //       // Assuming the response contains the image URL
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching card image:', error);
  //     });
  //   }, []);
    
    useEffect(() => {
      // Make an HTTP request to fetch the card image from the backend
      axios.get('/api/projects/wishlist/')
      .then((response) => {
        // Assuming the response contains the image URL
        console.log(response.data);
        setDetails(response.data);
        // setWishlist(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching card image:', error);
        setIsLoading(false);
      });
  }, []);

  // const filteredDetails = details.filter(
  //   (detail) => !wishlist.some((item) => item.id === detail.id)
  // );
  // console.log(filteredDetails);

//   const details = [
//     {
//       "id": 1,
//       "title": "Speech emotion recognition",
//       "general_category": "ML",
//       "banner_image": "http://127.0.0.1:8000/media/projects/emotion_detection.png"
//   },
//   {
//       "id": 2,
//       "title": "Test Project",
//       "general_category": "Development",
//       "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
//     },
//     {
//       "id": 3,
//       "title": "Speech emotion recognition",
//       "general_category": "Blockchain",
//       "banner_image": "http://127.0.0.1:8000/media/projects/emotion_detection.png"
//   },
//   {
//       "id": 4,
//       "title": "Test Project",
//       "general_category": "CP",
//       "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
//     },
//   {
//       "id": 5,
//       "title": "Test Project",
//       "general_category": "Others",
//       "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
//     }
//   ]

// GeneralCategoryChoices = (
//   ('ML', 'ML'),
//   ('Developement', 'Development'),
//   ('Blockchain', 'Blockchain'),
//   ('CP', 'CP'),
//   ('Others', 'Others'),
//     )


  
  const [filterValue, setFilterValue] = useState('All');

  const filteredProjects = useMemo(() => {
    return details.filter(project => project.general_category.includes(filterValue) || filterValue==="All");
  }, [details, filterValue]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const [active, setActive] = useState('b1');


  return (
    <section className="project-card " >
    {details.length===0 ? (<>
      <div className="grid h-screen place-content-center bg-white px-4 ">
          <div className="text-center ">
            <span className="text-green-600 flex justify-center items-center">
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      version="1.1"
      viewBox="0 0 416.449 416.449"
      xmlSpace="preserve"
      className="h-40 w-40 m-5"
    >
      <g>
        <g>
          <path
            fill="#FF7124"
            d="M399.76 16.699c10.12 37.84 8.67 78.13-4.34 115.28h-.01L284.48 21.049v-.01c37.15-13.01 77.44-14.46 115.28-4.34z"
          ></path>
          <path
            fill="#F2D59F"
            d="M90.21 207.929l87.14-101.42h.01l33.71-39.24c21.43-21.43 46.6-36.84 73.41-46.23v.01l110.93 110.93h.01c-9.39 26.81-24.8 51.98-46.23 73.41l-39.24 33.71-101.43 87.14-29.57-29.57-29.58-29.58-29.58-29.58-29.58-29.58zm205.9-14.53c20.18-20.17 20.18-52.89 0-73.06-20.17-20.18-52.89-20.18-73.06 0-20.18 20.17-20.18 52.89 0 73.06 20.17 20.18 52.89 20.18 73.06 0z"
          ></path>
          <path
            fill="#F2D59F"
            d="M309.95 239.099c1.74 45.6-14.8 91.78-49.61 126.59-10.69 10.68-22.44 19.65-34.93 26.89l-16.89-66.34 101.43-87.14z"
          ></path>
          <path
            fill="#8ECAC1"
            d="M296.11 120.339c20.18 20.17 20.18 52.89 0 73.06-20.17 20.18-52.89 20.18-73.06 0-20.18-20.17-20.18-52.89 0-73.06 20.17-20.18 52.89-20.18 73.06 0z"
          ></path>
          <path
            fill="#E6B263"
            d="M208.52 326.239l-39.94 14.71a29.971 29.971 0 01-31.58-6.94l-6.85-6.85 48.8-30.49 29.57 29.57z"
          ></path>
          <path
            fill="#E6B263"
            d="M178.95 296.669L130.15 327.159 130.14 327.159 109.72 306.739 149.37 267.089z"
          ></path>
          <path
            fill="#F2D59F"
            d="M177.35 106.509l-87.14 101.42-66.33-16.88c7.24-12.49 16.21-24.24 26.89-34.93 34.81-34.81 80.97-51.35 126.58-49.61z"
          ></path>
          <path
            fill="#E6B263"
            d="M149.37 267.089L109.72 306.739 89.3 286.309 119.79 237.509z"
          ></path>
          <path
            fill="#E6B263"
            d="M119.79 237.509l-30.49 48.8-6.86-6.85a30.015 30.015 0 01-6.94-31.58l14.71-39.95 29.58 29.58z"
          ></path>
          <g>
            <path
              fill="#5E2A41"
              d="M28.88 339.459a9.97 9.97 0 01-7.071-2.929c-3.905-3.905-3.905-10.237 0-14.143l20.54-20.54c3.905-3.904 10.237-3.904 14.143 0 3.905 3.905 3.905 10.237 0 14.143l-20.54 20.54a9.973 9.973 0 01-7.072 2.929zM10 416.439a9.97 9.97 0 01-7.072-2.93c-3.905-3.905-3.904-10.237.001-14.142l68.47-68.46c3.905-3.904 10.237-3.904 14.142.001 3.905 3.905 3.904 10.237-.002 14.142l-68.47 68.46A9.96 9.96 0 0110 416.439zM73.29 411.259a9.97 9.97 0 01-7.071-2.929c-3.905-3.905-3.905-10.237 0-14.143l34.23-34.229c3.905-3.904 10.237-3.903 14.142 0 3.905 3.905 3.905 10.237 0 14.143l-34.23 34.229a9.97 9.97 0 01-7.071 2.929zM208.52 336.239a9.97 9.97 0 01-7.071-2.929L83.139 215c-3.905-3.905-3.905-10.237 0-14.143 3.905-3.904 10.237-3.904 14.143 0l118.31 118.311c3.905 3.905 3.905 10.237 0 14.143a9.973 9.973 0 01-7.072 2.928zM259.58 218.534c-16.474 0-31.959-6.416-43.604-18.066-11.646-11.641-18.062-27.126-18.062-43.6s6.416-31.959 18.065-43.604c11.641-11.646 27.126-18.062 43.6-18.062s31.959 6.416 43.604 18.065c11.645 11.641 18.061 27.126 18.061 43.6 0 16.472-6.415 31.956-18.061 43.6l-.004.004c-11.643 11.648-27.127 18.063-43.599 18.063zm0-103.33c-11.13 0-21.592 4.334-29.457 12.204-7.874 7.869-12.208 18.331-12.208 29.461s4.334 21.592 12.204 29.457c7.869 7.874 18.331 12.208 29.461 12.208 11.13 0 21.592-4.334 29.457-12.204a.008.008 0 00.004-.004c7.87-7.865 12.204-18.327 12.204-29.457s-4.334-21.592-12.204-29.457c-7.869-7.874-18.331-12.208-29.461-12.208z"
            ></path>
            <path
              fill="#5E2A41"
              d="M89.291 296.31c-1.81 0-3.642-.49-5.29-1.521-4.684-2.926-6.108-9.096-3.182-13.779l30.49-48.8c2.927-4.684 9.097-6.11 13.78-3.182 4.684 2.926 6.108 9.096 3.182 13.779l-30.49 48.8a9.993 9.993 0 01-8.49 4.703zM109.72 316.739a9.972 9.972 0 01-7.071-2.929c-3.905-3.905-3.906-10.237-.001-14.143l39.65-39.65c3.905-3.904 10.237-3.904 14.142 0 3.905 3.905 3.906 10.237.001 14.142l-39.65 39.65a9.963 9.963 0 01-7.071 2.93zM130.16 337.16a9.992 9.992 0 01-8.49-4.702c-2.926-4.684-1.501-10.854 3.182-13.779l48.8-30.49c4.683-2.929 10.853-1.503 13.78 3.182 2.926 4.684 1.501 10.853-3.182 13.779l-48.8 30.49a9.953 9.953 0 01-5.29 1.52zM177.356 116.509a9.961 9.961 0 01-6.512-2.415c-4.189-3.599-4.668-9.912-1.069-14.102l33.71-39.24c3.598-4.188 9.911-4.668 14.102-1.068 4.189 3.599 4.668 9.912 1.068 14.101l-33.71 39.24a9.976 9.976 0 01-7.589 3.484z"
            ></path>
            <path
              fill="#5E2A41"
              d="M158.265 352.787c-10.448 0-20.723-4.085-28.34-11.712l-6.582-6.582a8.47 8.47 0 01-.273-.263l-47.694-47.695c-10.992-11.006-14.623-27.531-9.259-42.109l14.71-39.952a10.007 10.007 0 011.799-3.061l87.14-101.42c3.601-4.188 9.913-4.667 14.102-1.068 4.189 3.6 4.667 9.913 1.068 14.102l-85.965 100.05-14.086 38.257c-2.682 7.289-.864 15.556 4.632 21.059l47.432 47.433c.092.086.184.173.273.263l6.85 6.85c5.497 5.504 13.756 7.318 21.048 4.63l38.252-14.089 139.302-119.675c4.191-3.6 10.504-3.119 14.102 1.068 3.6 4.189 3.121 10.503-1.068 14.102L215.036 333.824a9.99 9.99 0 01-3.059 1.799l-39.941 14.71a39.775 39.775 0 01-13.771 2.454z"
            ></path>
            <path
              fill="#5E2A41"
              d="M349.19 215.389a9.972 9.972 0 01-7.071-2.929c-3.905-3.905-3.905-10.237 0-14.143 19.885-19.884 34.642-43.315 43.863-69.644 11.736-33.512 13.626-69.25 5.536-103.733-34.48-8.089-70.221-6.199-103.733 5.536-26.329 9.221-49.761 23.979-69.645 43.863-3.905 3.904-10.236 3.905-14.143 0-3.905-3.905-3.905-10.237 0-14.143 22.025-22.024 47.991-38.375 77.176-48.596 39.158-13.711 81.058-15.29 121.171-4.561a10 10 0 017.076 7.076c10.728 40.114 9.151 82.014-4.563 121.17-10.221 29.185-26.571 55.15-48.596 77.175a9.969 9.969 0 01-7.071 2.929z"
            ></path>
            <path
              fill="#5E2A41"
              d="M395.41 141.98a9.97 9.97 0 01-7.071-2.929L277.409 28.12c-3.905-3.905-3.905-10.237 0-14.143 3.908-3.905 10.238-3.903 14.143 0l110.93 110.931c3.905 3.905 3.905 10.237 0 14.143a9.976 9.976 0 01-7.072 2.929zM90.22 217.929c-.832 0-1.67-.104-2.477-.309l-66.33-16.88a10 10 0 01-6.185-14.706c7.778-13.418 17.355-25.86 28.467-36.982 35.281-35.281 84.119-54.445 133.988-52.537 5.369.176 9.671 4.583 9.671 9.994 0 5.522-4.472 10-9.995 10h-.01c-.127 0-.254-.002-.381-.007-44.338-1.699-87.765 15.325-119.127 46.688a161.475 161.475 0 00-18.101 21.576l52.73 13.419c4.435 1.024 7.745 4.998 7.745 9.743 0 5.523-4.472 10.001-9.995 10.001zM225.41 402.579a9.999 9.999 0 01-9.691-7.532l-16.891-66.34c-1.363-5.353 1.872-10.796 7.224-12.158 5.349-1.366 10.795 1.871 12.158 7.223l13.48 52.948a161.592 161.592 0 0021.581-18.104c31.36-31.36 48.378-74.785 46.684-119.136-.21-5.519 4.093-10.163 9.611-10.374 5.509-.233 10.164 4.093 10.375 9.611 1.903 49.897-17.243 98.755-52.532 134.044-11.124 11.113-23.567 20.691-36.986 28.47a9.986 9.986 0 01-5.013 1.348z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
                    </span>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Wishlist Empty</p>

                <p className="mt-4 text-gray-500">Keep browsing through the projects and add to wishlist</p>

                <a
                href="/current_projects"
                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                Browse Projects
                </a>
            </div>
          </div>
    </>) : 
        (
        <>
        <div className="pt-8 flex items-center justify-center ">
          <div className="inline-flex sm:flex-wrap rounded-md shadow-sm" role="group">
            <button type="button" onClick={() => {handleFilterChange('All'); setActive('b1')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b1' ? 'text-white' :'text-gray-900'} ${active==='b1' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 rounded-s-lg hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2  `}>
              ALL
            </button>
            <button type="button" onClick={() => {handleFilterChange('ML'); setActive('b2')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b2' ? 'text-white' :'text-gray-900'} ${active==='b2' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2`}>
              ML
            </button>
            <button type="button" onClick={() => {handleFilterChange('Development'); setActive('b3')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b3' ? 'text-white' :'text-gray-900'} ${active==='b3' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2 `}>
              Development
            </button>
            <button type="button" onClick={() => {handleFilterChange('Blockchain'); setActive('b4')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b4' ? 'text-white' :'text-gray-900'} ${active==='b4' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2 `}>
              Blockchain
            </button>
            <button type="button" onClick={() => {handleFilterChange('CP'); setActive('b5')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b5' ? 'text-white' :'text-gray-900'} ${active==='b5' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2 `}>
              CP
            </button>
            <button type="button" onClick={() => {handleFilterChange('Others'); setActive('b6')}} className={`w-40 px-4 py-2 text-sm font-medium ${active==='b6' ? 'text-white' :'text-gray-900'} ${active==='b6' ? 'bg-indigo-600' : 'bg-white'} border border-gray-500 rounded-e-lg hover:bg-indigo-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 `}>
              Others
            </button>
          </div>
        </div>
        {isLoading ?( <p>Loading...</p>) : (<div className="px-24 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 py-20">
        {filteredProjects.map((project, index) =>(
          <div key={index}>
            <ProjectCard ProjectId={project.id} link={project.banner_image} title={project.title} general_category={project.general_category} isInWishlist={details.some((item) => item.id === project.id)}/>
          </div>
        ))}
        </div>)}
        </>
      )}
      </section>
  );

}
