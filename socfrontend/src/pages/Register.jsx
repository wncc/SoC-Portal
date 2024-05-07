import { useState, useEffect } from 'react';
import api from "../utils/api";
import { useNavigate, Link } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();

    // States for registration
    // role: 1 for mentor, 0 for mentee
    const [profile, setProfile] = useState({
        name: '',
        roll_number: '',
        phone_number: '',
        password: '',
        year: '',
        department: '',
    });

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const [years, setYears] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        api.get('/api/accounts/years')
        .then((res) => {
            setYears(res.data)
        })
        .catch(err => console.log(err))
      }, []);

    useEffect(() => {
        api.get('/api/accounts/departments')
        .then((res) => {
            setDepartments(res.data)
        })
        .catch(err => console.log(err))
      }, []);


    // Handling the name change
    const handleProfile = (e) => {
        const { id, value } = e.target;
        // console.log(value);
        setProfile((prevProfile) => ({
            ...prevProfile,
            [id]: value,
        }));
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        console.log(profile);
        e.preventDefault();
        const formData = new FormData();

        Object.keys(profile).forEach(key => {
            formData.append(key, profile[key]);
        });

        if (profile.name === '' || profile.password === '' || profile.phone_number === '' || profile.roll_number === '' || profile.year==='' || profile.department==='') {
            setError(true);
            setError1(false);
        } else {
            setSubmitted(true);
            setError(false);
            setError1(false);
        }
        api.post('/api/accounts/register/', formData)
            .then(res => {
                navigate('/registerSuccess')
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
                if(err.response.data.error==="User already exists"){
                    setError1(true)
                }
            })
    };

    // Showing success message
    // const successMessage = () => {
    //     return (
    //         <>
    //             <div
    //                 className="success"
    //                 style={{
    //                     display: submitted ? '' : 'none',
    //                 }}>
    //                 <h1>You have successfully registered as an SoC mentee!!</h1>
    //             </div>
    //         </>
    //     );
    // };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center gap-2 text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                        </svg>

                        <strong className="block font-medium"> All fields required </strong>
                    </div>
                </div>
            </div>
        );
    };
    const errorMessage1 = () => {
        return (
            <div
                className="error"
                style={{
                    display: error1 ? '' : 'none',
                }}>
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center gap-2 text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                        </svg>

                        <strong className="block font-medium"> User already exists </strong>
                    </div>
                </div>
            </div>
        );
    };



    return (



        <div className="form">

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {errorMessage1()}
                {/* {successMessage()} */}
            </div>


            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">&lt;/&gt;Seasons of Code&lt;/&gt;</h1>

                    <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Registration Form</p>

                        {/* <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                            <div>
                                <label
                                    for="Option1"
                                    className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                    tabindex="0"
                                >
                                    <input className="sr-only" id="Option1" type="radio" tabindex="-1" name="option" onClick={role0} defaultChecked />

                                    <span className="text-sm"> Mentee </span>
                                </label>
                            </div>

                            <div>
                                <label
                                    for="Option2"
                                    className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                    tabindex="0"
                                >
                                    <input className="sr-only" id="Option2" type="radio" tabindex="-1" name="option" onClick={role1} />

                                    <span className="text-sm"> Mentor </span>
                                </label>
                            </div>
                        </div> */}

                        <div>
                            <label for="name">Name</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    id='name'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Your Name"
                                    onChange={handleProfile}
                                    required
                                />

                            </div>
                        </div>

                        <div>
                            <label for="roll_number">IITB Roll No.</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    id='roll_number'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Roll No."
                                    onChange={handleProfile}
                                    required
                                />

                            </div>
                        </div>

                        <div>
                            <label for="phone"  >Phone No.</label>

                            <div className="relative">
                                <input
                                    type="tel"
                                    id='phone_number'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Mobile No.(preferably WhatsApp)"
                                    onChange={handleProfile}
                                    required
                                />

                            </div>
                        </div>


                        <div>
                        <label for="password">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Password"
                                    onChange={handleProfile}
                                    required
                                />

                            </div>
                        </div>
                        <div className="inline-block relative w-full">
                        <label for="year">Year of Study</label>
                            <select id="year" onChange={handleProfile} className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" required>
                                <option disabled selected>Select Year of Study</option>   
                                {years.flat().filter((year, index, self) => self.indexOf(year) === index).map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="inline-block relative w-full">
                        <label for="department">Department</label>
                            <select id="department" onChange={handleProfile} className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" required>
                                <option disabled selected>Select Department</option>   
                                {departments.flat().filter((department, index, self) => self.indexOf(department) === index).map((department, index) => (
                                    <option key={index} value={department}>{department}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already Registered?
                            <Link className="underline" to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>


        </div>

    );
}
