import React from 'react'
import {NavLink, Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import brain from '../assests/Home_photo.png'
import signin from './SignIn';
const Home = () => {
	const { loginWithRedirect ,isAuthenticated } = useAuth0();
  return (
   <>
    <section >
	<div className=" bg-gradient-to-r from-gray-50 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 text-black border-gray-200 dark:bg-black dark:text-white py-20 h-[89.8vh]">
		<div className="container mx-auto flex flex-col md:flex-row items-center my-12">
			<div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
				<h1 className="text-3xl md:text-5xl p-2 text-blue-700 dark:text-blue-500 tracking-loose">MindMap</h1>
				<h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Mind : The limitless Infinity
				</h2>
				<p className="text-sm md:text-base z-10 text-gray-900 dark:text-gray-50 mb-4">Begin now, unleashing your endless imagination and skillfully chiseling your dreams into tangible existence.</p>
				{isAuthenticated?(<Link to="/dashboard" 
				className="bg-transparent text-blue-700 hover:bg-blue-500 dark:hover:bg-yellow-300 dark:text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border  border-blue-700 dark:border-yellow-300 hover:border-transparent"
				>Dashboard</Link>):(
					
				<NavLink to="/signin" >
				<button 
				className="bg-transparent z-10  text-white bg-zinc-800 hover:bg-blue-500  hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border  border-blue-700 dark:border-blue-300 hover:border-transparent">
				
				
				Explore Now
				
				</button></NavLink>
			 )}
				
			</div>
			<div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
				<div className="h-48   flex flex-wrap content-center gap-20">
			 <img className="w-96 animate-bounce-short rounded-lg drop-shadow-lg grayscale-0 " src={brain}/>
							</div>
						</div>
					</div>
				</div>
</section>
   </>
  )
}

export default Home