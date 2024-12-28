import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { removegeminiMovieResult, toggleGeminiSearchView } from '../utils/geminiSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constants'
import { changeLanguage } from '../utils/configSilce'
import { setSpinner } from '../utils/spinnerSlice'
export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGeminiSearch = useSelector(store => store.gemini.showGeminiSearch)
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
    const handleGeminiSearchClick = () => {
        if (showGeminiSearch === false) {
            dispatch(setSpinner(false))
        }
        dispatch(removegeminiMovieResult())

        dispatch(toggleGeminiSearchView())
    }
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }
    return (
        <div className='absolute px-4 py-0 -my-10 md:my-0 bg-gradient-to-b from-black w-screen z-10 flex flex-col md:flex-row justify-between '>
            <img src={logo} className='w-40 md:mx-10 mx-auto' alt='logo' />
            {user && (
                <div className='flex gap-2 mr-10 w-full -mt-[15%] md:mt-0 md:w-auto text-sm md:text-lg'>
                    {showGeminiSearch && <select className='bg-transparent bg-gradient-to-tr from-red-900 my-14 mx-3 h-10 px-4 rounded-lg text-white' onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier} className="text-black">{lang.name}</option>)}
                    </select>}
                    <button className='text-white h-10 px-4 rounded-lg  bg-gradient-to-tr from-red-900 my-14 mx-3' onClick={handleGeminiSearchClick}>{showGeminiSearch ? "Homepage" : "Gemini Search"}</button>
                    <img src={user?.photoURL} alt="user_icon" className='w-11 h-12 mt-12 hidden md:block' />
                    <button className='font-bold text-white' onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
    )
}
