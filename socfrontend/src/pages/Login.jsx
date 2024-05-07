import { useState } from 'react';
import api from "../utils/api";
import Dashboard from '../components/Dashboard';
import Cookie from "js-cookie";
import { Navigate, useNavigate, Link } from 'react-router-dom';


export default function Login() {

    // States for registration
    // role: 1 for mentor, 0 for mentee
    const [profile, setProfile] = useState({
        username: '',
        password: '',
    });

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


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
        api.post('api/accounts/token/', formData)
            .then(function (profile) {
                console.log(profile.status)
                setError(false)
                window.location.reload();
            }
            ).catch(err => {
                console.log(err);
                setError(true);
            })



    };


    // Showing success message
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

                        <strong className="block font-medium"> Wrong Username or Password </strong>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="form ">

            {/* Calling to the methods */}
            <div className="messages">

                {errorMessage()}
            </div>

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                        </svg>
                            <span className="mx-3">Seasons of Code</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                        </svg>
                        </h1>
                    

                    <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Login to your account</p>

                    

                        <div>
                            <label for="text" >Roll No.</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Roll No."
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

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <Link className="underline" to="/register">Register Now</Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>

    );
}