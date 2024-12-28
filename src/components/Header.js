import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate('/error')
        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate('/browse')
            } else {
                dispatch(removeUser());
                navigate('/')
            }
        });
        return () => unsubscribe();

    }, [])
    return (
        <div className='absolute px-4 py-0 bg-gradient-to-b from-black w-screen z-10 flex justify-between'>
            <img src={logo} className='w-40 mx-10' alt='logo' />
            {user && <div className='flex gap-2 mr-10'>
                <img src={user?.photoURL} alt="user_icon" className='w-11 h-12 mt-12' />
                <button className='font-bold text-white' onClick={handleSignOut}>Sign Out</button>
            </div>}
        </div>
    )
}
