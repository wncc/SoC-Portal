import { useState } from 'react';
 
export default function MenteeForm() {
 
    // States for registration
    // role: 1 for mentor, 0 for mentee
    const [profile, setProfile] = useState({
        role: '0',
        name: '',
        roll: '',
        phone: '',
        email: '',
        password: '',
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
        if (profile.name === '' || profile.email === '' || profile.password === '' || profile.phone === '' || profile.roll === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
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
            <div>
                <h1>SoC Registration</h1>
            </div>
 
            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
 
            <form>
                <button onClick={role0} className='btn' defaultChecked>Mentee</button>
                <button onClick={role1} className='btn'>Mentor</button>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input id='name' onChange={handleProfile} className="input"
                     type="text" />

                <label className="label">Roll Number</label>
                <input id = 'roll' onChange={handleProfile} className="input"
                     type="text" />

                <label className="label">Phone Number (WhatsApp)</label>
                <input id = 'phone' onChange={handleProfile} className="input"
                     type="number" />
 
                <label className="label">Email</label>
                <input id = 'email' onChange={handleProfile} className="input"
                    type="email" />
 
                <label className="label">Password</label>
                <input id = 'password' onChange={handleProfile} className="input"
                     type="password" />
 
                <button onClick={handleSubmit} className="btn"
                        type="submit">
                    Register
                </button>
            </form>
            
        </div>
        
    );
}