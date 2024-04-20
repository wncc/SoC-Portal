import { React } from "react";
import axios from "axios";
import { useState } from "react";

function PreferenceForms(props) {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [data, setData] = useState({
        project:'',
        sop:'',
        preference:props.preference
    })

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
        if (data.project==='' || data.sop==='') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            axios.post('api/accounts/preference/', data)
                .then(res => {
                    window.location.href = '/'
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
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
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <div className="inline-block relative w-full">
                <label htmlFor="project" className="block text-sm font-medium"> Project 1 </label>

                <div className="relative mt-1.5">
                    <input
                    type="text"
                    list="HeadlineActArtist"
                    id="project"
                    name="project"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Please select"
                    value={props.details.id}
                    onChange={dataChange}
                    required
                    />
                </div>

                <datalist name="project" id="HeadlineActArtist">
                    {props.details.map((detail, index) => (
                        <option key={index} value={detail.title}>
                            {detail.title}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <label htmlFor="sop" className="block text-sm font-medium">Statement of Purpose</label>

                <textarea
                    id="sop"
                    className="mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Write your SOP here..."
                    required
                    value={data.sop}
                    onChange={dataChange}
                    aria-required
                ></textarea>
                
            </div>
        </>
    );
}

export default PreferenceForms;