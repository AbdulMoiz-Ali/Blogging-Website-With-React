import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../configration/firebaseconfig/firebaseconfig';

const ProtectedRoutes = ({ component }) => {
    const [isUser, setIsUser] = useState(false);

    // use navigate 
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true)
                return
            }
            navigate('/login')
        })
    }, [])
    return (
        setIsUser ? component : <h1>Loading...</h1>
    )
}

export default ProtectedRoutes