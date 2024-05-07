import React from "react";
// import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";
import wncc_logo from '../assets/wncc-logo.png';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MenteeForm/>,
//   },
// ]);


// const router = createBrowserRouter(routes);

// const handleButtonClick = () => {
//   // Use the router to navigate to a specific route
//   router.navigate('/'); // Replace '/' with the desired route
// };


export default function Navbar(props){
  console.log(props.authToken);

    return(
     

<nav class="bg-indigo-600 border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-xl opacity-90">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={wncc_logo} class="h-10" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">WnCC</span>
    </Link>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
        <li>
        <Link to="" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>

        </li>

      
        {props.authToken ? (
          <>
            <li>
          <Link to="current_projects" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Projects</Link>
        </li>
        <li>
          <Link to="wishlist" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wishlist</Link>
        </li>
        <li>
          <Link to="PreferenceForm" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Preference</Link>
        </li>
        <li>
            <Link to="logout" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</Link>
          </li>
        
        </>
        
        ) : (
          <>
          <li>
            <Link to="login" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
          </li>
          <li>
          <Link to="register" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
        </li>
        </>
        )}
        
      </ul>
    </div>
  </div>
</nav>

  
    )
}

// Navbar.PropTypes={
//     title: PropTypes.string,
// }

