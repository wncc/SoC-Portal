import React, { useEffect } from 'react'
import axios from 'axios'

function Logout() {
    useEffect(() => {
        axios.get("/api/accounts/logout/")
            .then((res) => {
                console.log(res.data);
                window.location.href = '/login'
            })
            .catch(err => {
                console.log(err);
                window.location.href = '/login'
            })
    }, [])




  return (
    <div>Logout</div>
  )
}

export default Logout