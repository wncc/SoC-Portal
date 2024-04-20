import React from 'react';
import ProjectTimeline from '../components/ProjectTimeline';
import { useState , useEffect } from 'react';
import axios from "axios";
import ProjectTitle from '../components/ProjectTitle';
import WishlistButton from '../components/WishlistButton'
import { useParams } from 'react-router-dom';


export default function ProjectDetails() {

    const [details, setDetails] = useState({
        "id": 0,
        "created": "",
        "title": "",
        "general_category": "",
        "specific_category": "",
        "mentee_max": "",
        "mentor": "",
        "description": "",
        "timeline": "",
        "checkpoints": "",
        "prereuisites": "",
        "co_mentor_info": "",
        "banner_image": null,
        "code": "",
        "season": 1
    });
    let {ProjectId} = useParams();
    ProjectId = parseInt(ProjectId);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get(`/api/projects/${ProjectId}/`)
        .then((response) => {
            // Assuming the response contains the image URL
            console.log(response.data);
            response.data.description = response.data.description.split("\\r\\n").join("<br>");
            response.data.description = response.data.description.replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            setDetails(response.data);
        })
        .catch((error) => {
            console.error('Error fetching card image:', error);
        });
    }, []);


    const [Added, setAdded] = useState();
    useEffect(() => {
        axios.get('/api/projects/wishlist/')
          .then((response) => {
            console.log(response.data);
            setWishlist(response.data);
            setIsLoading(false);
            const isAdded = wishlist.some((item) => item.id === details.id);
            setAdded(isAdded);
            console.log(isAdded);
            
          })
          .catch((error) => {
            console.error('Error fetching card image:', error);
            setIsLoading(false);
          });
      }, [Added]);

      const wishDetails = {
          project_id: details.id,
          title: details.title,
          banner_image: details.banner_image,
          general_category: details.general_category,
        };
        
        const formData = new FormData();
        
        Object.keys(wishDetails).forEach(key => {
            formData.append(key, wishDetails[key]);
        });
        
        const WishlistAdd = (e) => {
        if (!Added) {
          console.log(formData)
          
          axios
          .post("/api/projects/wishlist/", formData)
            .then((res) => {
                console.log(res);
                setAdded(true);
            })
            .catch((err) => console.log(err));
        } 
        else {
            
            axios.delete(`/api/projects/wishlist?project_id=${details.id}`)
            .then((res) => {
                console.log(res);
                setAdded(false);
            })
            .catch((err) => console.log(err));
        }
    };
    
    let buttonMessage = Added ? "Remove From Wishlist" : "Add To Wishlist";
    // const details = {
    //     "id": 1,//no use
    //     "created": "2024-04-11T23:04:23.019867Z",// no use
    //     "title": "Speech emotion recognition", //done
    //     "mentor": "Advait Patole(210020008)",//done
    //     "general_category": "ML",//no use
    //     "specific_category": "Machine Learning",//done
    //     "mentee_max": "10",//done
    //     "description": "https://github.com/x4nth055/emotion-recognition-using-speech  \\r\\nWork invovled in the project:\\r\\n1. Gathering and preprocessing a diverse dataset of speech samples with labeled emotions.\\r\\n2. Extracting relevant features from the speech signals, such as pitch, intensity, and spectral features.\\r\\n3. Training machine learning models, such as SVMs and Neural Networks, on the labeled dataset.\\r\\n4. Tuning hyperparameters to optimize model performance through techniques like cross-validation.\\r\\n5. Evaluating performance using accuracy.\\r\\n6. Iteratively refining the model architecture and feature selection process based on evaluation results.\\r\\n7. Testing the model on unseen data to assess its generalization capability.\\r\\n8. Fine-tuning the model based on feedback and insights from testing.\\r\\n9. Documenting the entire process, including data collection, preprocessing, model training, and evaluation.\\r\\n10. Continuously learning and updating the model to adapt to new speech patterns and emotions.\\r\\nLearning outcomes:\\r\\n1.Understanding of the fundamentals of machine learning.\\r\\n2.Learning regression and classification models like RNN, random forest classifier etc.\\r\\n3. Strengthing ML concepts and implementing it on real life situation",//done
    //     "timeline": "Week 1 : Basic python skill development and python libraries like numpy, pandas and matplotlib\\r\\nWeek 2: Implementation of regression model from scratch\\r\\nWeek 3: Neural Networks theory and implementation\\r\\nWeek 4: RNN theory and implementation using pkl dataset\\r\\nWeek 5-7 : final project\\r\\nWeek 8: Project documentation + buffer",
    //     "checkpoints": "Checkpoint 1: Learning of python libraries numpy, pandas and matplotlib.\\r\\nCheckpoint 2: Implementation of neural networks and regression models from scratch and using it against a dataset\\r\\nCheckpoint 3:Building strong foundation of other additional libraries tensorflow, librosa and scikit- learn\\r\\nCheckpoint 4: Ideation and basic structure designing of final project\\r\\nCheckpoint 5: Code implementation and accuracy refinement",
    //     "prereuisites": "Basics of python and loads of enthusiasm",//done
    //     "co_mentor_info": "Aryaman Angurana(22b1043)\\r\\nAryan Adinath Popalghhat(210020080)",//done
    //     "banner_image": "https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item222.jpg",//done
    //     "code": "34d591dd",//no use
    //     "season": 1//no use
    // }
    // const req_details = {
    //     "id": details.id,
    //     "title": details.title,
    //     "banner_image": details.banner_image,
    //     "general_category": details.general_category
    // }

   

    //if project is in users wishlist then return true, else false
    // const search = () =>{
    //     axios.get(`api/user/wishlist/:${details.id}`)
    //     .then(res => {
    //         setAdded(res)
    //     })
    //     .catch(err => console.log(err))
    // }
    // search();
    // const buttonMessage = Added ? "Remove From Wishlist" : "Add To Wishlist";
    // const [str, setStr] = useState([buttonMessage]);
    // let title = details.title;


    // const WishlistAdd = (e) => {
        // console.log(details);
        // if(!Added){
        //     axios.post('/api/user/wishlist/', )
        //         .then(res => {
        //             console.log(res)
        //             setAdded(true)
        //             setStr([`mv ${title.replace(/\s+/g, '_')}.txt ./Wishlist`, "Remove From Wishlist"]);
        //         })
        //         .catch(err => console.log(err))
        //     }
        //     else{
        //         axios.delete(`/api/user/wishlist/:${details.id}`)
        //         .then(res => {
        //             console.log(res)
        //             setAdded(false)
        //             setStr(["cd ./Wishlist", `rm ${title}.txt`, "Add To Wishlist"]);
        //         })
        //         .catch(err => console.log(err))
        //     }
    // }

    


    return (  
        <>
            {isLoading ? <div className="h-screen flex justify-center items-center">
                            <div class="flex gap-2">
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                            </div>
                        </div> : 
            <div className="px-10 py-10 sm:px-2 md:px-10 lg:px-24">
                
                <div className='pb-10 flex items-center justify-center'>
                    <div className="relative inline-flex justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group">
                        <span className="w-0 h-0 rounded bg-indigo-600 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                        {/* <ProjectTitle text="Developing Trading Strategy with Pine Script"/> */}
                        <ProjectTitle text={details.title}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 pb-10 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-56 rounded-lg">
                        {/* <img alt="" src="https://itc.gymkhana.iitb.ac.in/wncc/assets/images/soc/2023/item221.jpg" className="h-75 w-full object-cover"/> */}
                        <img alt="" src={details.banner_image} className="h-56 w-full object-contain"/>
                    </div>
                    <div className="rounded-lg lg:col-span-2 h-75">
                        
                        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8">
                            <div className="h-12 rounded-lg">
                                <h4 className=" pt-5 text-2xl text-indigo-400 sm:text-3xl">Mentors:</h4>
                                <ul className="pl-8 sm:pl-2 md:pl-8 lg:pl-20">
                                    <p>{details.mentor}</p>
                                </ul>
                            </div>
                            <div className="h-28 rounded-lg">
                                <h4 className=" pt-5 text-2xl text-indigo-400 sm:text-3xl">Co-Mentors:</h4>
                                <ul className="pl-8 sm:pl-2 md:pl-8 lg:pl-20">
                                <li>
                                    <p dangerouslySetInnerHTML={{ __html: details.co_mentor_info.replace(/\\r\\n/g, "<br>") }}></p>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                            <div className="h-10 rounded-lg ">
                                <h4 className=" pt-5 text-2xl text-indigo-400 sm:text-3xl">Mentees:</h4>
                                <ul className="pl-8 sm:pl-2 md:pl-8 lg:pl-20">
                                    <li>
                                        {/* <p>20+</p> */}
                                        <p>{details.mentee_max}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="h-28 rounded-lg">
                                <h4 className=" pt-5 text-2xl text-indigo-400 sm:text-3xl">Category:</h4>
                                <ul className="pl-8 sm:pl-2 md:pl-8 lg:pl-20">
                                    <li>
                                        {/* <p>20+</p> */}
                                        <p>{details.specific_category}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <WishlistButton str={str} WishlistAdd={WishlistAdd}/> */}
                        <button
                            onClick={WishlistAdd}
                            className={`text-white font-bold ${
                                buttonMessage === "Remove From Wishlist" ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
                            } text-white font-bold py-2 px-4 rounded inline-flex items-center`}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mr-2"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                                />
                            </svg>
                            <p>{buttonMessage}</p>
                        </button>
                    </div>
                </div>
                {/* <div className="rounded-lg">
                    <h2 className="text-2xl text-indigo-600 sm:text-3xl">Description:</h2>
                    <p dangerouslySetInnerHTML={{ __html: descriptionWithLinks.replace(/\\r\\n/g, "<br>") }}></p>
                    <h2 className="text-2xl pt-3 text-indigo-600 sm:text-3xl">Prerequisites:</h2>
                    <p>{details.prereuisites}</p>
                    <h2 className="text-2xl pt-3 text-indigo-600 sm:text-3xl">Timeline:</h2>
                    <p dangerouslySetInnerHTML={{ __html: details.timeline.replace(/\\r\\n/g, "<br>") }}></p>
                    <h2 className="text-2xl pt-3 text-indigo-600 sm:text-3xl">Checkpoints:</h2>
                    <p dangerouslySetInnerHTML={{ __html: details.checkpoints.replace(/\\r\\n/g, "<br>") }}></p>

                </div> */}

                <div className="flow-root">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl text-indigo-600 sm:text-3xl">Description</dt>
                            <dd className="text-gray-700 sm:col-span-2"><p dangerouslySetInnerHTML={{ __html: details.description }}></p></dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl text-indigo-600 sm:text-3xl">Prerequisites</dt>
                            <dd className="text-gray-700 sm:col-span-2">{details.prereuisites}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl text-indigo-600 sm:text-3xl">Timeline</dt>
                            <dd className="text-gray-700 sm:col-span-2"><p dangerouslySetInnerHTML={{ __html: details.timeline.replace(/\\r\\n/g, "<br>") }}></p></dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl text-indigo-600 sm:text-3xl">Checkpoints</dt>
                            <dd className="text-gray-700 sm:col-span-2"><p dangerouslySetInnerHTML={{ __html: details.checkpoints.replace(/\\r\\n/g, "<br>") }}></p></dd>
                        </div>
                    </dl>
                </div>
            </div>}
        </>
    );
}