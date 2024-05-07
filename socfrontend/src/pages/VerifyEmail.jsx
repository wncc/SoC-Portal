import React, { useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api from "../utils/api";


const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token:', token);
    api.get(`/api/accounts/verify-email/${token}`)
    .then((res) => {
        navigate('/login')
        console.log(res.data)
    })
    .catch(err =>{ console.log(err)
      navigate('/login')
  }
)
  }, [token]);

  return (
    <div>
      <h1>Verify Email</h1> 
    </div>
  );
};

export default VerifyEmail;
