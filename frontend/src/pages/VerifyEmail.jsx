import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    console.log('Token:', token);
    axios.get(`/api/accounts/verify-email/${token}`)
    .then((res) => {
        window.location.href = '/login'
        console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [token]);

  return (
    <div>
      <h1>Verify Email</h1> 
    </div>
  );
};

export default VerifyEmail;
