import React from "react";
// import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";


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

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">{props.title}</a>
          <button classNameName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span classNameName="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register" >Register</a>
                  {/* <Link to="/register">Register</Link>              */}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/current_projects">Current Projects</a>
                {}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/previous_projects">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Past Certificates</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Action</a></li>
                  <li><a className="dropdown-item" href="/">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a classNameName="dropdown-item" href="/">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" href="/">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}

// Navbar.PropTypes={
//     title: PropTypes.string,
// }

Navbar.defaultProps = {
    title: 'set title here',
}
