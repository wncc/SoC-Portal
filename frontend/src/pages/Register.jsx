import { useState } from 'react';
import axios from 'axios';

export default function Register() {

    // States for registration
    // role: 1 for mentor, 0 for mentee
    const [profile, setProfile] = useState({
        role: '0',
        name: '',
        roll_number: '',
        phone: '',
        email: '',
        password: '',
        yearOfStudy: '',
    });

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

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
        if (profile.name === '' || profile.email === '' || profile.password === '' || profile.phone === '' || profile.roll_number === '' || profile.yearOfStudy) {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        axios.post('api/accounts/register/', profile)
            .then(res => {
                window.location.href = '/'
                console.log(res)
            })
            .catch(err => console.log(err))
    };

    // Showing success message
    const successMessage = () => {
        return (
            <>
                <div
                    className="success"
                    style={{
                        display: submitted && profile.role ? '' : 'none',
                    }}>
                    <h1>You have successfully registered as an SoC mentor!!</h1>
                </div>
                <div
                    className="success"
                    style={{
                        display: submitted && !profile.role ? '' : 'none',
                    }}>
                    <h1>You have successfully registered as an SoC mentee!!</h1>
                </div>
            </>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };



    return (



        <div className="form">

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
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
                                    id='first_name'
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
                            <label for="email">Email Address</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    id='email'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Email"
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
                                    id='phone'
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
                        <label for="yearOfStudy">Year of Study</label>
                            <select id="yearOfStudy" onChange={handleProfile} className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" required>
                                <option disabled selected>Select Year of Study</option>   
                                <option value="UG 1st Year">UG 1st Year</option>
                                <option value="UG 2nd Year">UG 2nd Year</option>
                                <option value="UG 3rd Year">UG 3rd Year</option>
                                <option value="UG 4th Year">UG 4th Year</option>
                                <option value="DD 5th Year">DD 5th Year</option>
                                <option value="Masters/PhD">Masters/PhD</option>
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
                            <a className="underline" href="/login">Login</a>
                        </p>
                    </form>
                </div>
            </div>


        </div>

    );
}
