import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../utils/firebase.js'
import { addUser } from '../utils/userSlice.js';
import { useDispatch } from 'react-redux';
import { ADD_IMG, logo } from '../utils/constants.js';
import google_logo from '../assets/google_logo.png'

export default function Login() {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
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
    const handleKeyPress = ((event) => {
        if (event.key === "Enter")
            handleBtnClick();

    })

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
                <img src={logo} className='h-screen object-cover md:h-auto md:fixed ' />
            </div>
            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyPress} className='absolute w-11/12 mt-20 rounded-2xl md:w-[30%] md:rounded-2xl md:fixed p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-70 md:mt-10 md:h-[90%]'>
                <div className='-mt-4'>
                    <h1 className='font-bold text-3xl py-4 text-white m-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                    {!isSignInForm && <input ref={name} type="text" placeholder='Full Name' className='p-2 m-2 w-full bg-gray-700 text-white rounded-lg' />}
                    <input ref={email} type="text" placeholder='Email Address' className='p-2 m-2 w-full bg-gray-700 text-white rounded-lg' />
                    <div className='relative'>
                        <input ref={password} type={showPassword ? "text" : "password"} placeholder='Password' className='p-2 m-2 w-full bg-gray-700 text-white rounded-lg' />
                        <button className='absolute inset-y-2 right-0 text-gray-400' onMouseDown={togglePassword} onMouseUp={togglePassword} onTouchStart={togglePassword} onTouchEnd={togglePassword}> <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                    </div>

                    <button className='p-4 m-2 text-white bg-red-700 px-4 py-3 w-full rounded-lg' onClick={handleBtnClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                    <button className='m-2 py-1 px-30 text-white bg-white w-full rounded-lg flex gap-4 justify-center items-center' onClick={handleGoogleSignIn}>
                        <div className=''>
                            <img src={google_logo} alt="Google Logo" className='w-10' />
                        </div>
                        <div className='text-black -ml-2'>
                            {isSignInForm ? "Sign In With Google" : "Sign Up With Google"}
                        </div>
                    </button>
                    {errorMessage && <p className='text-red-700 mx-2 font-bold text-sm'>{errorMessage}</p>}
                    <p className='text-white m-2'>{isSignInForm ? "New to Netflix?" : "Already registered?"} <span onClick={toggleSignInForm} className='hover:underline cursor-pointer font-bold text-xl'>{isSignInForm ? "Sign up now." : "Sign in here."}</span></p>
                </div>
            </form>
        </div>
    )
}
