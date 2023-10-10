import { useState } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
 
export default function Login() {
 
    // States for registration
    // role: 1 for mentor, 0 for mentee
    const [profile, setProfile] = useState({
        roll_number: '',
        password: '',
    });

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);

 
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
        axios.post('api/accounts/token/', profile)
        .then(function(profile){
            console.log(profile.status)
                if(profile.status === 200){
                    window.location.href = '/Dashboard'

                }
                else{
                    <h1>
                        wrong username or password
                    </h1>
                }
            }
        ).catch(err=>{
            alert(err.response.data.detail)
        })
            
            

    };
 
    const role0 = () => {
        profile.role = 0;
    }

    const role1 = () => {
        profile.role = 1;
    }


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
 
    return (
        <div className="form">
            <div>
                <h1>SoC Login</h1>
            </div>
 
            {/* Calling to the methods */}
            <div className="messages">
               
                {successMessage()}
            </div>
 
            <form onSubmit={handleSubmit}>
                <button onClick={role0} className='btn' defaultChecked>Mentee</button>
                <button onClick={role1} className='btn'>Mentor</button>
                {/* Labels and inputs for form data */}

                <label className="label">Roll Number</label>
                <input id = 'roll_number' onChange={handleProfile} className="input"
                     type="text"  required/>

 
                <label className="label">Password</label>
                <input id = 'password' onChange={handleProfile} className="input"
                     type="password" required/>
 
                <button className="btn"
                        type="submit">
                    Login
                </button>
            </form>
            
        </div>
        
    );
}