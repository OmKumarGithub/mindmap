import React from 'react'

const About = () => {
  return (
    <>
        <div className="py-16 bg-gradient-to-r from-gray-50 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 text-black dark:bg-black dark:text-white  h-[91vh]">  
  <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:5/12 lg:w-5/12">
          <img src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" loading="lazy" width="" height="" className='cursor-pointer rounded-md drop-shadow-md hover:scale-105 ease-linear blur-sm hover:blur-none '/>
        </div>
        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-2xl text-gray-900  dark:text-gray-50 font-bold md:text-4xl">Unleash the power of your mind with our interactive Mind Mapping tool</h2>
          <p className="mt-6 text-gray-600  dark:text-gray-300">MindMap was created with the aim of providing students and learners with a powerful tool to enhance their learning experience. </p>
          
          <p className="mt-4 text-gray-600  dark:text-gray-300">As a student myself, I have personally faced the struggles of organizing complex information and staying focused during the learning process. This website serves as a culmination of my passion for knowledge and my desire to help fellow learners overcome similar difficulties.</p>
          <p className="mt-4 text-gray-600  dark:text-gray-300">Thank you for choosing MindMap.</p>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium"><span className='font-bold'>Om Kumar</span> Founder of MindMap</p>
        </div>
      </div>
  </div>
</div>
    </>
  )
}

export default About