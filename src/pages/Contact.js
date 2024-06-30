import React, { useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';



const EMAIL_REGEX = /\S+@\S+.\S+/; 

const Contact = () => { 
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [regarding, setregarding] = useState(''); 
    const [responseMessage, setResponseMessage] = useState('');
    const [success, setSuccess] = useState(false);

const handleSubmit = (e) => { e.preventDefault();

 
if (!EMAIL_REGEX.test(email)) {
  alert('Invalid email address');
  return;
}

const data = {
  name,
  email,
  regarding
};



axios
  .post('http://localhost:5000/api/contactus', data)
  .then((response) => {

    if(response.data.msg == "success"){
       
        setSuccess(true)
    }
    else if (response.data.msg == "fail" ){
        // setfail(true)
    }

    // if (response.data.success) {
    //   setResponseMessage('Form submitted successfully');
    //   setSuccess(true)
    // } else {
    //   setResponseMessage('Form submission failed');
    // }
  })
  .catch((error) => {
    console.error(error);
    setResponseMessage('An error occurred while submitting the form');
  }
  
  
  );
};

return ( <> 
{success ? (
                            <section className='dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500' >  {success && (
                                                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                                    <span className="font-medium">Success alert!</span> Successfully Submitted We Will Get Back To You Shortly.
                                                </div>
                    )}
                            
            <div className="flex items-center justify-center h-[80vh]">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Successfully Submitted</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We Will Contact You Shortly</p>
                <Link to="/"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    aria-current="page"> Home
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
            </div>

                            </section>
            ) :




(<div className="py-16 bg-gradient-to-r from-gray-50 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 text-black dark:bg-black dark:text-white  h-[91vh]"> <div className="max-w-6xl mx-auto sm:px-6 lg:px-8"> <div className="mt-8 overflow-hidden"> <div className="grid grid-cols-1 md:grid-cols-2"> <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg"> <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight"> Get in touch </h1> <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2"> Fill in the form to start a conversation </p>

 
            <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                House no.-123, abc colony, New Delhi
              </div>
            </div>

            <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                +91 1234567890
              </div>
            </div>

            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                mindmap@org.com
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 flex flex-col justify-center"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="hidden">
                Full Name
              </label>
              <input
              
                type="name"
                name="name"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required="true"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
              required="true"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800  font-semibold dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="text" className="hidden">
                regarding
              </label>
              <input
                type="text"
                name="text"
                id="text"
                placeholder="About Query"
                value={regarding}
                onChange={(e) => setregarding(e.target.value)}
                required="true"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-gray- dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>)}
</>
); };

export default Contact;