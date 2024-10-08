import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db, storage } from '../configration/firebaseconfig/firebaseconfig';
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Updateblog({ bloid }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useNavigate()
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const sendDatatoFirestore = async (data) => {
        setIsLoading(false);


        console.log("blog id", bloid)
        const blogfile = watch("blogimage");
        const blogimg = blogfile[0];
        const blogname = watch("blogtitle");
        const blogdesc = watch("blogdescription");
        // console.log(blogfile, blogimg, blogname, blogdesc)

        const storageRef = ref(storage, `user-profile-collection/${blogimg.name}`);

        uploadBytes(storageRef, blogimg).then(async (snapshot) => {
            const url = await getDownloadURL(storageRef);
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const washingtonRef = doc(db, "blogs", bloid);
            updateDoc(washingtonRef, {
                uid: currentUser.uid,
                title: blogname,
                description: blogdesc,
                imageUrl: url,
                id: bloid
            });
            setIsLoading(true);
            toggleModal();
            // alert("Blog update successfully");
            navigator('/')
        })

    };
    return (
        <>

            {isOpen && (
                <div
                    id="defaultModal"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative p-4 bg-purple-300 rounded-lg shadow dark:bg-gray-800">
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Update Blog
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {isLoading ? <form id="create-model" onSubmit={handleSubmit(sendDatatoFirestore)}>
                                <div className="flex flex-col grid gap-4 mb-4 sm:grid-cols-2">
                                    <div className='sm:col-span-2'>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            {...register("blogtitle")}
                                            className="bg-purple-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Type product name"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Description
                                        </label>
                                        <textarea
                                            rows="4"
                                            {...register("blogdescription")}
                                            className="block bg-purple-50 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Write product description here"
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center justify-center w-full sm:col-span-2">
                                        <label htmlFor="dropzone-file" className="flex bg-purple-50 flex-col items-center justify-center w-full h-54 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                            <input {...register("blogimage")} id="dropzone-file" type="file" required className="hidden" />
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white flex hover:bg-purple-900 bg-purple-800 dark:bg-blue-500 inline-flex items-center dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                    </svg>
                                    Add new Blog
                                </button>
                            </form> : <div className='flex flex-wrap items-center justify-center'><div className="loader"></div></div>}
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default Updateblog