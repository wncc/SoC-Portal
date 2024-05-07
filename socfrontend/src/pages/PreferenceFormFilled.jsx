import React from "react";
import { Link } from "react-router-dom";

function PreferenceFormFilled() {
    return (  
        <div className="grid h-screen place-content-center bg-white px-4 ">
            <div className="text-center ">
            <span className="text-green-600 flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-40 w-40"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    </span>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your response has been recorded.</p>

                {/* <p className="mt-4 text-gray-500">Thank you.</p> */}

                <Link
                to="/"
                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    Home
                </Link>
            </div>
            </div>
    );
}

export default PreferenceFormFilled;