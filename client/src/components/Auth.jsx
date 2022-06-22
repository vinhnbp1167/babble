import React, { useState, useRef } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import '../App.css';
import { Alert } from "react-bootstrap"

import { auth } from "../firebase";
import firebase from "firebase/app";
import './index.css'
import signinImage from '../assets/signup.jpg';
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSignup) {
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }
            try {
                setError("")
                await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            } catch {
                setError("Failed to create an account")
            }
        }
        else {
            try {
                setError("")
                await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            } catch {
                setError("Failed to log in")
            }
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="email">Email</label>
                            <input 
                                name="email" 
                                type="email"
                                placeholder="Email"
                                ref={emailRef}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={passwordConfirmRef}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                        
                    <br />
                    <div
                        className='login-button google'
                        onClick={async () => await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                        <GoogleOutlined /> Sign In With Google
                    </div>
                    <br />
                    <div 
                        className='login-button facebook'
                        onClick={async () => await auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                    >
                        <FacebookOutlined /> Sign In With Facebook
                    </div>

                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? ' Sign In' : ' Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth;
