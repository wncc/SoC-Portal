// import React from 'react';
// import { BsCurrencyDollar, BsBoxSeam } from 'react-icons/bs';
// import { FiBarChart } from 'react-icons/fi';
// import { Button, Footer } from '../components';
// import { useStateContext } from '../contexts/ContextProvider';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

//        /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Login() {  
  
//   const navigate = useNavigate()

//     const [credential, setCredential] = useState({Rollnumber: '', password: ''});

//     // const [showPassword, setShowPassword] = useState(false);


//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setCredential({...credential, [name]: value});
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/api/auth/token/', credential)
//         .then( res =>{
//           window.location.href = '/'
//         })
//         .catch(err =>{
//            alert(err)
//         })
//       }

//     return (
//       <>
//         {/*
//           This example requires updating your template:
  
//           ```
//           <html class="h-full bg-white">
//           <body class="h-full">
//           ```
//         */}
//         <div >
//           <div >

//             <h2 >
//               Sign in to your account
//             </h2>
//           </div>
  
//           <div>
//             <form action="#" method="POST" onSubmit={handleSubmit}>
//               <div>

//                 <div>
//                   <input
//                     onChange = {handleChange}
//                     id="Rollnumber"
//                     name="Rollnumber"
//                     type="text"
//                     required
                    
//                   />
//                 </div>
//               </div>
  
//               <div>
//                 <div>

//                   <div>
//                     <a href="#">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>
//                 <div>
//                   <input
//                     onChange = {handleChange}
//                     // onMouseEnter={setShowPassword(true)}
//                     // onMouseLeave={setShowPassword(false)}
//                     id="password"
//                     name="password"
//                     required
                    
//                   />
//                   {/* <div onClick={()=> setShowPassword(!showPassword)}> </div> */}
                 

//                 </div>
//               </div>
  
//               <div>
//                 <button
//                   type="submit"
                  
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>
//             </div>
//         </div>
//       </>  
//       );
// }
