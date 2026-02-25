import { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import { addUser } from '../utils/userSlice.js';
import { useDispatch } from 'react-redux';
import { ADD_IMG, logo } from '../utils/constants.js'; // Ensure 'logo' here is your BG image, otherwise replace with direct URL
import google_logo from '../assets/google_logo.png';
import { Eye, EyeOff } from 'lucide-react';

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
                // Logic handled by Header onAuthStateChanged
            }).catch((error) => {
                setErrorMessage(error.message);
            });
    }

    const handleBtnClick = () => {
        const message = checkValidData(email.current.value, password.current.value, isSignInForm ? null : name.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: ADD_IMG
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use")
                        setErrorMessage("User already exists with this email address");
                    else
                        setErrorMessage(error.message);
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Logic handled by Header
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-credential")
                        setErrorMessage("Invalid user credentials");
                    else
                        setErrorMessage(error.message);
                });
        }
    }

    const handleKeyPress = ((event) => {
        if (event.key === "Enter") handleBtnClick();
    })

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
        if (email.current) email.current.value = "";
        if (password.current) password.current.value = "";
    }

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="relative min-h-screen bg-black">
            <Header />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={logo} // Assuming 'logo' is your background image variable. If not, swap this for the URL string.
                    className='h-full w-full object-cover opacity-60'
                    alt="background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            {/* Login Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    onKeyDown={handleKeyPress}
                    className="w-full max-w-[450px] p-16 bg-black/75 rounded-xl text-white shadow-2xl backdrop-blur-sm"
                >
                    <h1 className="text-3xl font-bold mb-8">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    <div className="flex flex-col gap-4">
                        {!isSignInForm && (
                            <input
                                ref={name}
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-4 bg-[#333] rounded text-white placeholder-gray-400 outline-none focus:bg-[#454545] transition-colors border-none"
                            />
                        )}

                        <input
                            ref={email}
                            type="text"
                            placeholder="Email Address"
                            className="w-full p-4 bg-[#333] rounded text-white placeholder-gray-400 outline-none focus:bg-[#454545] transition-colors border-none"
                        />

                        <div className="relative">
                            <input
                                ref={password}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-4 bg-[#333] rounded text-white placeholder-gray-400 outline-none focus:bg-[#454545] transition-colors border-none"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                onClick={togglePassword}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {errorMessage && (
                        <p className='text-[#e50914] font-medium text-sm mt-4 flex items-center gap-2'>
                            ⚠️ {errorMessage}
                        </p>
                    )}

                    <button
                        className="w-full mt-10 bg-[#e50914] hover:bg-[#c11119] text-white font-bold py-3 rounded transition-all duration-200"
                        onClick={handleBtnClick}
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-1 border-b border-gray-600"></div>
                        <span className="px-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-b border-gray-600"></div>
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white py-2 rounded transition-colors"
                        onClick={handleGoogleSignIn}
                    >
                        <img src={google_logo} alt="Google" className="w-5 h-5" />
                        <span className="text-sm font-medium">
                            {isSignInForm ? "Sign in with Google" : "Sign up with Google"}
                        </span>
                    </button>

                    <div className="mt-10 text-gray-400 text-base">
                        {isSignInForm ? "New to Netflix? " : "Already registered? "}
                        <span
                            onClick={toggleSignInForm}
                            className="text-white hover:underline cursor-pointer font-medium"
                        >
                            {isSignInForm ? "Sign up now." : "Sign in here."}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 leading-tight">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    </p>
                </form>
            </div>
        </div>
    );
}