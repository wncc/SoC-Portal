import React from "react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function AddAnimation(props) {
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js instance when the component mounts
    const typedInstance = new Typed(typedRef.current, {
      strings: props.str,
      typeSpeed: 25,
      loop: false,
      showCursor: false,
    });

    // Clean up the Typed.js instance when the component unmounts
    return () => {
      typedInstance.destroy();
    };
  }, props.str); // Reinitialize Typed.js instance if the text prop changes

  return (
    <button
      onClick={props.WishlistAdd}
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
      <p ref={typedRef}></p>
    </button>
  );
}
