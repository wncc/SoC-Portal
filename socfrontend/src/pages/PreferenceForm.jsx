import React from "react";
import api from '../utils/api';
import { useState, useEffect } from "react";
import PreferenceFormFilled from "../pages/PreferenceFormFilled"
import { Navigate } from "react-router-dom";


export default function PreferenceForm() {

    //to get titles of projects for the dropdown
    const [details, setDetails] = useState([]);
    const [userPreference, setUserPreference] = useState([]);
    const [page, setPage] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);

    useEffect(() => {
        // Make an HTTP request to fetch the card image from the backend
        api.get('/api/projects/wishlist/')
        .then((response) => {
            // Assuming the response contains the image URL
            console.log(response.data);
            setDetails(response.data);
            setSubmitted(false);
        })
        .catch((error) => {
            console.error('Error fetching card image:', error);
        });
    }, []);

    useEffect(() => {
        // Make an HTTP request to fetch the card image from the backend
        api.get('/api/projects/preference')
        .then((response) => {
            // Assuming the response contains the image URL
            console.log(response.data);
            setUserPreference(response.data);
        })
        .catch((error) => {
            console.error('Error fetching card image:', error);
        });
    }, []);

    const [data1, setData1] = useState({
        project:'',
        sop:'',
        preference: 1
    })
    const [data2, setData2] = useState({
        project:'',
        sop:'',
        preference: 2
    })
    const [data3, setData3] = useState({
        project:'',
        sop:'',
        preference: 3
    })
    
    

    if(userPreference.length>0){
        return <Navigate to="/PreferenceFormFilled"/>
    }
    const dataChange1 = (e) => {
        const { id, value } = e.target
        setData1({
            ...data1,
            [id]: value,
            // console.log(projectlist)
        })
        setSubmitted(false);
        console.log('id:', id);
        console.log('value:', value);
        console.log(data1);
    }
    const dataChange2 = (e) => {
        const { id, value } = e.target
        setData2({
            ...data2,
            [id]: value,
            // console.log(projectlist)
        })
        setSubmitted(false);
        console.log('id:', id);
        console.log('value:', value);
        console.log(data2);
    }
    const dataChange3 = (e) => {
        const { id, value } = e.target
        setData3({
            ...data3,
            [id]: value,
            // console.log(projectlist)
        })
        setSubmitted(false);
        console.log('id:', id);
        console.log('value:', value);
        console.log(data3);
    }


    const handleSubmit = (e) => {
        console.log(data1);
        console.log(data2);
        console.log(data3);
        e.preventDefault();
        if (data1.project === '' || data1.sop === '' || data2.project === '' || data2.sop === '' ||data3.project === '' || data3.sop === '') {
            setError(true);
        } 
        else if(data1.project===data2.project || data1.project===data3.project || data3.project===data2.project){
            setError1(true);
        }
        else {
            setSubmitted(true);
            setError(false);
            
            const formData1 = new FormData();
            Object.keys(data1).forEach(key => {
                formData1.append(key, data1[key]);
            });
            const formData2 = new FormData();
            Object.keys(data2).forEach(key => {
                formData2.append(key, data2[key]);
            });
            const formData3 = new FormData();
            Object.keys(data3).forEach(key => {
                formData3.append(key, data3[key]);
            });

            api.post('api/projects/preference/', formData1)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                    setError(true);
                })
                api.post('api/projects/preference/', formData2)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                    setError(true) ;
                })
                api.post('api/projects/preference/', formData3)
                .then(res => {
                    console.log(res);
                    setSubmitted(true);
                })
                .catch(err => {
                    console.log(err);
                    setError(true) ;
                })
        }
    }

    if(submitted){
            return <Navigate to="/PreferenceFormFilled"/>
    }

    const successMessage = () => {
        return (
            <>
                <div
                    className="success"
                    style={{
                        display: submitted ? '' : 'none',
                    }}>
                    <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-start gap-4">
                        <span className="text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </span>

                        <div className="flex-1">
                        <strong className="block font-medium text-gray-900"> Thank You </strong>

                        <p className="mt-1 text-sm text-gray-700">You have successfully filled the form.</p>
                        </div>

                        <button className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    </div>
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
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center gap-2 text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                        </svg>

                        <strong className="block font-medium"> All fields are required </strong>
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

                        <strong className="block font-medium"> Cannot Repeat Preferences. </strong>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="form">

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
                {errorMessage1()}
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

                    <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Preference Form</p>
                        {page===1 && (
                            <Page2 
                                project={data1.project}
                                sop={data1.sop}
                                dataChange={dataChange1}
                                setPage={setPage}
                                details={details}
                            />
                        )}
                        {page===2 && (
                            <Page3 
                                project={data2.project}
                                sop={data2.sop}
                                dataChange={dataChange2}
                                setPage={setPage}
                                details={details}
                            />
                        )}
                        {page===3 && (
                            <Page4
                                project={data3.project}
                                sop={data3.sop}
                                dataChange={dataChange3}
                                setPage={setPage}
                                details={details}
                                handleSubmit={handleSubmit}
                            />
                        )}
                    </form>

                </div>
            </div>


        </div>
        </>
    )
}

const Page2 = ({project, sop, dataChange, setPage, details}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="project" className="block text-sm font-medium"> Project 1 </label>

                <select
                    id="project"
                    name="project"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    onChange={dataChange}
                    value={project}
                    required
                >
                    <option value="">Please select</option>
                    {details.map((details, index) => (
                        <option key={index} value={details.id}>
                            {details.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sop" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="sop"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={sop}
                    onChange={dataChange}
                    aria-required
                ></textarea>
                
            </div>
            <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white flex items-center justify-center"
                onClick={()=>setPage(2)}
            >
                Next<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
            </button>
        </>
    )
}
const Page3 = ({project, sop, dataChange, setPage, details}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="project" className="block text-sm font-medium"> Project 2 </label>

                <select
                    id="project"
                    name="project"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    onChange={dataChange}
                    required
                >
                    <option selected disabled>Please select</option>
                    {details.map((details, index) => (
                        <option key={index} value={details.id}>
                            {details.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sop" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="sop"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={sop}
                    onChange={dataChange}
                ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white flex items-center justify-center"
                    onClick={()=>setPage(1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
Prev
                </button>
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white flex items-center justify-center"
                    onClick={()=>setPage(3)}
                >
                    Next<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

                </button>
            </div>
        </>
    )
}
const Page4 = ({project, sop, dataChange, setPage, details, handleSubmit}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="project" className="block text-sm font-medium"> Project 3 </label>

                <select
                    id="project"
                    name="project"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    onChange={dataChange}
                    required
                >
                    <option selected disabled>Please select</option>
                    {details.map((details, index) => (
                        <option key={index} value={details.id}>
                            {details.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sop" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="sop"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={sop}
                    onChange={dataChange}
                ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white flex items-center justify-center"
                    onClick={()=>setPage(2)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
Prev
                </button>
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    )
}