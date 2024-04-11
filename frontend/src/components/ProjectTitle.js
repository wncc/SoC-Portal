import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function ProjectTitle(props) {
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js instance when the component mounts
    const typedInstance = new Typed(typedRef.current, {
      strings: [props.text],
      typeSpeed: 25,
      loop: false,
      showCursor: false,
    });

    // Clean up the Typed.js instance when the component unmounts
    return () => {
      typedInstance.destroy();
    };
  }, [props.text]); // Reinitialize Typed.js instance if the text prop changes

  return (
    <h1
      className="w-full px-14 py-3 text-center text-2xl rounded-lg font-bold text-indigo-600 sm:text-3xl transition-colors duration-300 ease-in-out group-hover:text-white z-10"
      ref={typedRef}
    ></h1>
  );
}
