import React from "react";
import axios from "axios";
import { useState } from "react";

function ProjectCard(props) {
  return (
    <div>
      <a href={`/current_projects/${props.ProjectId}`}>
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img
            alt={props.title}
            src={props.link}
            className="h-56 w-full object-cover"
          />

          <div className="bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-lg line-clamp-1 text-gray-900">
              {props.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              {props.description}
            </p>
          </div>
        </article>
      </a>
    </div>
  );
}

export default ProjectCard;
