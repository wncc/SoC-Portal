import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


export default function PreferenceForm() {

    //to get titles of projects for the dropdown
    const [details, setDetails] = useState([]);

    useEffect(() => {
        // Make an HTTP request to fetch the card image from the backend
        axios.get('/api/projects/')
        .then((response) => {
            // Assuming the response contains the image URL
            console.log(response.data);
            setDetails(response.data);
        })
        .catch((error) => {
            console.error('Error fetching card image:', error);
        });
    }, []);

    // const details = [
    //         {
    //           "id": 1,
    //           "title": "Speech emotion recognition",
    //           "general_category": "ML",
    //           "banner_image": "http://127.0.0.1:8000/media/projects/emotion_detection.png"
    //       },
    //       {
    //           "id": 2,
    //           "title": "Test Project",
    //           "general_category": "Development",
    //           "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
    //         },
    //         {
    //           "id": 3,
    //           "title": "Speech emotion recognition",
    //           "general_category": "Blockchain",
    //           "banner_image": "http://127.0.0.1:8000/media/projects/emotion_detection.png"
    //       },
    //       {
    //           "id": 4,
    //           "title": "Test Project",
    //           "general_category": "CP",
    //           "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
    //         },
    //       {
    //           "id": 5,
    //           "title": "Test Project",
    //           "general_category": "Others",
    //           "banner_image": "http://127.0.0.1:8000/media/projects/For_his_participation_in_the_5-day_Grand_Entrepreneur_Workshop_held_by_Liceria__Co..png"
    //         }
    //       ]

    const [data, setData] = useState({
        SOC_SOP:'',
        experience:'',
        Preference_1:'',
        SOP_1:'',
        Preference_2:'',
        SOP_2:'',
        Preference_3:'',
        SOP_3:''
    })

    const [page, setPage] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const dataChange = (e) => {
        const { id, value } = e.target
        setData({
            ...data,
            [id]: value,
            // console.log(projectlist)
        })
        setSubmitted(false);
        console.log('id:', id);
        console.log('value:', value);
        console.log(data);
    }


    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        if (data.SOC_SOP === '' || data.experience === '' || data.Preference_1 === '' || data.Preference_2 === '' || data.Preference_3 === '' || data.SOP_1==='' || data.SOP_2==='' || data.SOP_3==='') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        axios.post('api/accounts/preference/', data)
            .then(res => {
                window.location.href = '/'
                console.log(res)
            })
            .catch(err => console.log(err))
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

    return (
        <>
            <div className="form">

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>


            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">&lt;/&gt;Seasons of Code&lt;/&gt;</h1>

                    <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Preference Form</p>
                        {page===0 && (
                            <Page1 
                                SOC_SOP={data.SOC_SOP}
                                experience={data.experience}
                                dataChange={dataChange}
                                setPage={setPage}
                            />
                        )}
                        {page===1 && (
                            <Page2 
                                Preference_1={data.Preference_1}
                                SOP_1={data.SOP_1}
                                dataChange={dataChange}
                                setPage={setPage}
                                details={details}
                            />
                        )}
                        {page===2 && (
                            <Page3 
                                Preference_2={data.Preference_2}
                                SOP_2={data.SOP_2}
                                dataChange={dataChange}
                                setPage={setPage}
                                details={details}
                            />
                        )}
                        {page===3 && (
                            <Page4
                                Preference_3={data.Preference_3}
                                SOP_3={data.SOP_3}
                                dataChange={dataChange}
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

const Page1 = ({SOC_SOP, experience, dataChange, setPage}) =>{
    return(
            <>
            <div>
                <label htmlFor="SOC_SOP" className="block text-sm font-medium text-gray-700"> Why do you want to be a part of WnCC SoC?* </label>

                <textarea
                    id="SOC_SOP"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Enter your answer(in not more than 200 words)"
                    value={SOC_SOP}
                    onChange={dataChange}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">List down your past experiences in coding*</label>

                <textarea
                    id="experience"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Anything from coding in school days to cs101"
                    value={experience}
                    onChange={dataChange}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                onClick={()=>setPage(1)}
            >Next&gt;</button>
        </>
    )
}
const Page2 = ({Preference_1, SOP_1, dataChange, setPage, details}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="Preference_1" className="block text-sm font-medium"> Project 1 </label>

                <div className="relative mt-1.5">
                    <input
                    type="text"
                    list="HeadlineActArtist"
                    id="Preference_1"
                    name="Preference_1"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Please select"
                    value={Preference_1}
                    onChange={dataChange}
                    required
                    />
                </div>

                <datalist name="Preference_1" id="HeadlineActArtist">
                    {details.map((details, index) => (
                        <option key={index} value={details.title}>
                            {details.title}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <label htmlFor="SOP_1" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="SOP_1"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={SOP_1}
                    onChange={dataChange}
                    aria-required
                ></textarea>
                
            </div>
            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={()=>setPage(0)}
                >
                    &lt;Prev
                </button>
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={()=>setPage(2)}
                >
                    Next&gt;
                </button>
            </div>
        </>
    )
}
const Page3 = ({Preference_2, SOP_2, dataChange, setPage, details}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="Preference_2" className="block text-sm font-medium"> Project 2 </label>

                <div className="relative mt-1.5">
                    <input
                    type="text"
                    list="HeadlineActArtist"
                    id="Preference_2"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Please select"
                    // value={Preference_2}
                    onChange={dataChange}
                    />
                </div>

                <datalist name="Preference_2" id="HeadlineActArtist">
                    {details.map((details, index) => (
                        <option key={index} value={details.title}>
                            {details.title}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <label htmlFor="SOP_2" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="SOP_2"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={SOP_2}
                    onChange={dataChange}
                ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={()=>setPage(1)}
                >
                    &lt;Prev
                </button>
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={()=>setPage(3)}
                >
                    Next&gt;
                </button>
            </div>
        </>
    )
}
const Page4 = ({Preference_3, SOP_3, dataChange, setPage, details, handleSubmit}) =>{
    return(
            <>
            <div className="inline-block relative w-full">
                <label htmlFor="Preference_3" className="block text-sm font-medium"> Project 3 </label>

                <div className="relative mt-1.5">
                    <input
                    type="text"
                    list="HeadlineActArtist"
                    id="Preference_3"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Please select"
                    // value={Preference_3}
                    onChange={dataChange}
                    />
                </div>

                <datalist name="Preference_3" id="HeadlineActArtist">
                    {details.map((details, index) => (
                        <option key={index} value={details.title}>
                            {details.title}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <label htmlFor="SOP_3" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="SOP_3"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={SOP_3}
                    onChange={dataChange}
                ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    onClick={()=>setPage(2)}
                >
                    &lt;Prev
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
