import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
	const { loginWithRedirect ,isAuthenticated } = useAuth0();
  return (
   <>
    <section >
	<div className=" bg-gradient-to-r from-gray-50 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 text-black border-gray-200 dark:bg-black dark:text-white py-20 h-[89.8vh]">
		<div className="container mx-auto flex flex-col md:flex-row items-center my-12">
			<div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
				<h1 className="text-3xl md:text-5xl p-2 text-blue-700 dark:text-yellow-300 tracking-loose">MindMap</h1>
				<h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Mind : The limitless Infinity
				</h2>
				<p className="text-sm md:text-base  text-gray-900 dark:text-gray-50 mb-4">Begin now, unleashing your endless imagination and skillfully chiseling your dreams into tangible existence.</p>
				{isAuthenticated?(<Link to="/dashboard" 
				className="bg-transparent text-blue-700 hover:bg-blue-500 dark:hover:bg-yellow-300 dark:text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border  border-blue-700 dark:border-yellow-300 hover:border-transparent"
				>Dashboard</Link>):(
				<button 
				className="bg-transparent text-blue-700 hover:bg-blue-500 dark:hover:bg-yellow-300 dark:text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border  border-blue-700 dark:border-yellow-300 hover:border-transparent"
             onClick={() => loginWithRedirect()}>Explore Now</button>
			 )}
				
			</div>
			<div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
				<div className="h-48 flex flex-wrap content-center gap-20">
					<div >
						<img className=" mt-28 hidden xl:block -rotate-[24deg] rounded-[6.8rem] w-40 h-64 hover:scale-105 hover:ease-in-out"  src="https://plus.unsplash.com/premium_photo-1695406461013-35e7327cef86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
						<div>
							<img className=" mt-28 hidden xl:block -rotate-[24deg] rounded-[6.8rem] scale-[1.5] w-32 h-64 hover:scale-[1.6] hover:ease-in-out"  src="https://images.unsplash.com/photo-1611410502206-f06ef260a129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWluZG1hcHxlbnwwfDF8MHx8fDA%3D"/></div>
							<div>
								<img className=" mt-28 hidden xl:block -rotate-[24deg] rounded-[6.8rem] w-40 h-64 hover:scale-105 hover:ease-in-out" src="https://images.unsplash.com/photo-1552664688-cf412ec27db2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
							</div>
						</div>
					</div>
				</div>
</section>
   </>
  )
}

export default Home