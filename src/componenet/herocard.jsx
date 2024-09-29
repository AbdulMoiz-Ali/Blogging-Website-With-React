import React from 'react'
import { Link } from 'react-router-dom'

function Herocard({ image, title, description, link, profileimg, profilename }) {
    return (
        <>
            <div className="w-96 m-3 items-center sm:flex-col rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <img className="w-full h-72 rounded-lg sm:rounded-none sm:rounded-t-lg" src={image} alt="Bonnie Avatar" />
                <article className="p-6 bg-purple-400 rounded-b-lg border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                    <p className="mb-5 font-light text-gray-900 dark:text-gray-400">{description.slice(0, 130) + "....."}</p>
                    <div className="flex mb-6 justify-between gap-20 items-center">
                        <div className="flex items-center space-x-4">
                            <img className="w-7 h-7 rounded-full" src={profileimg} alt="Jese Leos avatar" />
                            <span className="font-medium dark:text-white">{profilename}</span>
                        </div>
                        <Link to={link} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            Read more
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                </article>
            </div>
        </>
    )
}

export default Herocard