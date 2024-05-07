import React from "react";
import api from '../utils/api';
import { useState } from "react";
import WishlistButton from "./WishlistButton";
import { Link } from "react-router-dom";

export default function ProjectCard(props) {
  const details = {
    project_id: props.ProjectId,
    title: props.title,
    banner_image: props.link,
    general_category: props.general_category,
  };
  const [Added, setAdded] = useState(props.isInWishlist);
  let buttonMessage = Added ? "Remove From Wishlist" : "Add To Wishlist";
  let title = props.title;

  const formData = new FormData();

  Object.keys(details).forEach(key => {
      formData.append(key, details[key]);
  });

  const axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Allow': 'GET, POST, DELETE, HEAD, OPTIONS'
    }
  }
  const WishlistAdd = (e) => {
    if (!Added) {
      console.log(formData)
    
      api
        .post("/api/projects/wishlist/", formData)
        .then((res) => {
          console.log(res);
          setAdded(true);
        })
        .catch((err) => console.log(err));
    } 
    else {
    
      api.delete(`/api/projects/wishlist?project_id=${props.ProjectId}`)
        .then((res) => {
          console.log(res);
          setAdded(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <Link to={`/current_projects/${props.ProjectId}`}>
          <img
            alt={props.title}
            src={props.link}
            className="h-56 w-full object-contain"
          />
        </Link>
        <Link to={`/current_projects/${props.ProjectId}`}>
          <div className="bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-lg line-clamp-1 text-gray-900">
              {props.title}
            </h3>
          </div>
        </Link>
        <div className="p-4 sm:p-6">
        <button
          onClick={WishlistAdd}
          className={`text-white font-bold ${
            buttonMessage === "Remove From Wishlist" ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <p>{buttonMessage}</p>
        </button>
        </div>
      </article>
    </div>
  );
}
