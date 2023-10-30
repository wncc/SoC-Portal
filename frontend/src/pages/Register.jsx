import React, { useState } from 'react';
import axios from 'axios';
import '../components/form.css';

export default function Register() {
  // States for registration
  const [profile, setProfile] = useState({
    role: '0',
    first_name: '',
    last_name: '',
    roll_number: '',
    phone: '',
    email: '',
    password: '',
  });

  // States for checking errors and submission
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handle changes in the form fields
  const handleProfile = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
    setSubmitted(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      profile.first_name === '' ||
      profile.last_name === '' ||
      profile.email === '' ||
      profile.password === '' ||
      profile.phone === '' ||
      profile.roll_number === ''
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
    axios
      .post('api/accounts/register/', profile)
      .then((res) => {
        window.location.href = '/';
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // Set the role to Mentee
  const role0 = () => {
    setProfile((prevProfile) => ({ ...prevProfile, role: '0' }));
  };

  // Set the role to Mentor
  const role1 = () => {
    setProfile((prevProfile) => ({ ...prevProfile, role: '1' }));
  };

  // Display success message
  const successMessage = () => {
    return (
      <>
        <div
          className="success"
          style={{
            display: submitted && profile.role === '1' ? '' : 'none',
          }}
        >
          <h1>You have successfully registered as an SoC mentor!!</h1>
        </div>
        <div
          className="success"
          style={{
            display: submitted && profile.role === '0' ? '' : 'none',
          }}
        >
          <h1>You have successfully registered as an SoC mentee!!</h1>
        </div>
      </>
    );
  };

  // Display error message
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h5>Please enter all the fields</h5>
      </div>
    );
  };

  return (
    <div className="form">
        <div>
            <h1>SoC Registration</h1>
        </div>
        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>
        <form onSubmit={handleSubmit}>
            <button
            onClick={role0}
            className={`btn ${profile.role === '0' ? 'active' : ''}`}
            type='button'
            >
            Mentee
            </button>
            <button
            onClick={role1}
            className={`btn ${profile.role === '1' ? 'active' : ''}`}
            type='button'
            >
            Mentor
            </button>
            <br />
            <label className="label">Name</label>
            <input id='first_name' onChange={handleProfile} className="input"
                type="text" />

            <label className="label">Roll Number</label>
            <input id = 'roll_number' onChange={handleProfile} className="input"
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

            <button className="btn"
                    type="submit">
                Register
            </button>
        </form>
    </div>
  );
}
