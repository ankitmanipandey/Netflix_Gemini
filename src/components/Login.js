import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase.js'
import { addUser } from '../utils/userSlice.js';
import { useDispatch } from 'react-redux';
import { ADD_IMG, logo } from '../utils/constants.js';
export default function Login() {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();
    const handleBtnClick = () => {
        const message = checkValidData(email.current.value, password.current.value, isSignInForm ? null : name.current.value);
        setErrorMessage(message);
        if (message) return;
        //Sign In & Sign Up logic
        if (!isSignInForm) {
            //Sign Up logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Signed up 
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: ADD_IMG
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });

                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use")
                        setErrorMessage("User already exists with this email address")
                });
        }
        else {
            //Sign In logic

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-credential")
                        setErrorMessage("Invaild user credentials")
                });
        }

    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
        email.current.value = null;
        password.current.value = null;
    }
    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src={logo} />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4 text-white m-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder='Full Name' className='p-2 m-2 w-full bg-gray-700 text-white' />}
                <input ref={email} type="text" placeholder='Email Address' className='p-2 m-2 w-full bg-gray-700 text-white' />
                <div className='relative'>
                    <input ref={password} type={showPassword ? "text" : "password"} placeholder='Password' className='p-2 m-2 w-full bg-gray-700 text-white'/>
                    <button className='absolute inset-y-2 right-0 text-gray-400' onMouseDown={togglePassword} onMouseUp={togglePassword} onTouchStart={togglePassword} onTouchEnd={togglePassword}> <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                </div>

                <button className='p-4 m-2 text-white bg-red-700 px-4 py-3 w-full rounded-lg' onClick={handleBtnClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                {errorMessage && <p className='text-red-700 mx-2 font-bold text-lg'>{errorMessage}</p>}
                <p className='text-white py-6 m-2'>{isSignInForm ? "New to Netflix?" : "Already registered?"} <span onClick={toggleSignInForm} className='hover:underline cursor-pointer font-bold text-xl'>{isSignInForm ? "Sign up now." : "Sign in here."}</span></p>
            </form>
        </div>
    )
}
