// import {useHistory } from 'react-router';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from '..axios/api/axios';
import axios from "../api/axios";
import {Link,NavLink,useNavigate} from 'react-router-dom'




const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /\S+@\S+.\S+/; 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Login = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()

    // const history = useHistory();


    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
const [validEmail, setValidEmail] = useState(false);
const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    // ************************************************* do settimeout function hein timeout1 isliye hau kuinki agar page ko redirect originol timeout krenge to to 5 sec se phlee hi signup page pe aa jata hai but hum use sign in page lejana hai
 useEffect(() => {
    if (success) {
      // Hide the success alert after 5 seconds
      const timeout = setTimeout(() => {
        setSuccess(false);
      
      }, 5000);
      const timeout1 = setTimeout(() => {
        navigate("/signin")

        // window.location.href = '/signin';
      
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [success]);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd,email, matchPwd])



    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2|| !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const name= user
            const password =pwd
            const response = await axios.post("http://localhost:5000/api/user/register",
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
            console.log("helllllllllllllo")
            // window.location.href = '/signin';
            // history.push('/signin');
            return(<>

            </>)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
  
            {success ? (
                            <section >  {success && (
                                                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                                    <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
                                                </div>
                    )}
                            
            <div className="flex items-center justify-center h-screen">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Successfully Registered</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Kindly Login with your credentials</p>
                <Link to="/signin"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    aria-current="page"> Login
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
            </div>

                            </section>
            ) : (
				<div class="h-screen flex items-center content-center justify-center">
                <section className="flex flex-col flex-initial p-4    bg-slate-100 dark:bg-gray-900  w-[28rem] rounded shadow-lg ">
                    <p ref={errRef} className={errMsg ? `text-cyan-600 p-2 mb-2 font-bold bg-slate-500` : `hidden`} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                    <form action="POST" onSubmit={handleSubmit}>
                        <label 
						htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? `text-green-500` : `hidden`} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? `hidden` : `text-red-500`} />
                        </label>
                        <input
						className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
						
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? ` text-xs text-white relative p-1 rounded-lg -bottom-2.5 bg-black mb-4` : `hidden`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? `text-green-500` : `hidden`} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? `hidden` : `text-red-500`} />
                </label>
                <input
					className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="emailnote" className={emailFocus && email && !validEmail ? ` text-xs text-white relative p-1 rounded-lg -bottom-2.5 bg-black mb-4` : `hidden`}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid email address.
                </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? `text-green-500` : `hidden`} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? `hidden` : `text-red-500`} />
                        </label>
                        <input
						className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
							
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? `text-xs text-white relative p-1 rounded-lg -bottom-2.5 bg-black mb-4` : `hidden`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? `text-green-500` : `hidden`} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? `hidden` : `text-red-500`} />
                        </label>
                        <input
						className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? `text-xs text-white relative p-1 rounded-lg -bottom-2.5 bg-black mb-4` : `hidden`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        
                        <button className="py-3 w-full mt-4 text-xl text-white bg-blue-500 rounded-2xl disabled:bg-slate-400"
						 disabled={!validName || !validPwd || !validMatch ? true : false} >Sign Up</button>
                    </form>
                    <p >
                        Already registered?<br />
                        <span className="underline">
                            {/*put router link here*/}

                            <Link to="/signin">Sign In</Link>
                            {/* <a href="/signin">Sign In</a> */}
                        </span>
                    </p>
                </section></div>
            )}
        </>
    )
}

export default Login


























































// import React from 'react'

// const Login = () => {
//   return (
//     <>
//         <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex justify-center items-center">

	
// 	<div className="py-12 px-12  bg-white dark:bg-g rounded-2xl shadow-xl z-20">
// 		<div>
// 			<h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Create An Account</h1>
// 			<p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
// 				account to enjoy all the services without any ads for free!</p>
// 		</div>
// 		<div className="space-y-4">
// 		<input type="text" placeholder="First Name" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
// 		<input type="text" placeholder="Last Name" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
// 			<input type="text" placeholder="Email Addres" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
// 			<input type="text" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
//     </div>
// 			<div className="text-center mt-6">
// 				<button className="py-3 w-64 text-xl text-white bg-blue-500 rounded-2xl">Create Account</button>
// 				<p className="mt-4 text-sm">Already Have An Account? <span className="underline cursor-pointer"> Sign In</span>
// 				</p>
// 			</div>
// 		</div>
		
// 	</div>
//     </>
//   )
// }

// export default Login