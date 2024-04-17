import React from "react";
import axios from "axios";
import { useState } from "react";
import WishlistButton from "./WishlistButton";

export default function ProjectCard(props) {
  const details = {
    id: props.ProjectId,
    title: props.title,
    banner_image: props.link,
    general_category: props.general_category,
  };
  const [Added, setAdded] = useState(false);
  const search = () => {
    axios
      .get(`api/user/wishlist/:${props.ProjectId}`)
      .then((res) => {
        setAdded(res);
      })
      .catch((err) => console.log(err));
  };
  search();
  const buttonMessage = Added ? "Remove From Wishlist" : "Add To Wishlist";
  const [str, setStr] = useState([buttonMessage]);
  let title = props.title;

  const WishlistAdd = (e) => {
    if (!Added) {
      axios
        .post("api/user/wishlist/", details)
        .then((res) => {
          console.log(res);
          setAdded(true);
          setStr([
            `mv ${title.replace(/\s+/g, "_")}.txt ./Wishlist`,
            "Remove From Wishlist",
          ]);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(`api/user/wishlist/:${props.ProjectId}`)
        .then((res) => {
          console.log(res);
          setAdded(false);
          setStr(["cd ./Wishlist", `rm ${title}.txt`, "Add To Wishlist"]);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <a href={`/current_projects/${props.ProjectId}`}>
          <img
            alt={props.title}
            src={props.link}
            className="h-56 w-full object-cover"
          />
        </a>
        <a href={`/current_projects/${props.ProjectId}`}>
          <div className="bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-lg line-clamp-1 text-gray-900">
              {props.title}
            </h3>
          </div>
        </a>
        <div className="p-4 sm:p-6">
          <WishlistButton str={str} WishlistAdd={WishlistAdd} />
        </div>
      </article>
    </div>
  );
}
