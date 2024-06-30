import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "./context/AuthProvider";
import {Link,NavLink, useNavigate} from 'react-router-dom'

import axios from '../api/axios';
// const LOGIN_URL = '/auth';

const SignIn = () => {
    // const { setAuth } = useContext(AuthContext);
    const navigate =useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [fail, setfail] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name= user
        const password =pwd
        const response = await axios.post("http://localhost:5000/api/auth",
            JSON.stringify({ name, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            } );

            if(response.data.msg == "success"){
                navigate("/dashboard")
                
                setSuccess(true)
            }
            else if (response.data.msg == "fail" ){
                setfail(true)
            }

            console.log(response)
        // try {
        //     const response = await axios.post(LOGIN_URL,
        //         JSON.stringify({ user, pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     //console.log(JSON.stringify(response));
        //     const accessToken = response?.data?.accessToken;
        //     const roles = response?.data?.roles;
        //     setAuth({ user, pwd, roles, accessToken });
        //     setUser('');
        //     setPwd('');
        //     setSuccess(true);
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }
    }









    return (
        <>



            {fail ? (
                  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">401</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Unvalid Credentials.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Kindly put valid Credentials. </p>
        </div>   
    </div>
</section>
            ) : (
                <div class="h-screen flex items-center justify-center">
                <section className="flex flex-col flex-initial p-4    bg-slate-100 dark:bg-gray-900  w-[28rem] rounded shadow-lg ">
                    <p ref={errRef} className={errMsg ? `text-cyan-600 p-2 mb-2 font-bold bg-slate-500` : `hidden`} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                      
                        <button className="mt-4 py-3 w-full text-xl text-white bg-blue-500 rounded-2xl disabled:bg-slate-400">Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="underline">
                            {/*put router link here*/}
                            <Link to="/signup">Sign Up</Link>

                            {/* <a href="/sign_up">Sign Up</a> */}
                        </span>
                    </p>
                </section>
                </div>
            )}
        </>
    )
}

export default SignIn