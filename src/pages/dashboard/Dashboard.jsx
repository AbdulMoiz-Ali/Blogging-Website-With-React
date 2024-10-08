import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../configration/firebaseconfig/firebaseconfig.js';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import Updateblog from '../../componenet/updateblog.jsx';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [isOpen, setIsOpen] = useState(false);
    const [isupdatemodel, setisupdatemodel] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [cardLoading, setcardLoading] = useState(true);
    const [updateblogid, setupdateblogid] = useState(null);
    const navigator = useNavigate()

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const updatemodel = (blogid) => {
        console.log(blogid)
        setupdateblogid(blogid)
        setisupdatemodel(!isupdatemodel);
    };
    const fetchBlogs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return blogs;
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const loadBlogs = async () => {
            const fetchedBlogs = await fetchBlogs();
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (fetchedBlogs) {
                // Filter blogs to only include those from the current user
                const userBlogs = fetchedBlogs.filter(blog => blog.uid === currentUser.uid);
                setBlogs(userBlogs);
            }
        };

        loadBlogs();
    }, []);

    const deleteblog = async (blogid) => {
        setcardLoading(false);
        await deleteDoc(doc(db, "blogs", blogid));
        setcardLoading(true);
        navigator("/")
    }

    const sendDatatoFirestore = async (data) => {
        setIsLoading(false);
        toggleModal();
        const blogfile = watch("blogimage");
        const blogimg = blogfile[0];
        const blogname = watch("blogtitle");
        const blogdesc = watch("blogdescription");

        const storageRef = ref(storage, `user-profile-collection/${blogimg.name}`);

        uploadBytes(storageRef, blogimg).then(async (snapshot) => {
            const url = await getDownloadURL(storageRef);
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const docRef = await addDoc(collection(db, "blogs"), {
                uid: currentUser.uid,
                title: blogname,
                description: blogdesc,
                imageUrl: url,
            });
            await updateDoc(docRef, { id: docRef.id });
            setIsLoading(true);
            alert("Blog added successfully");
            // Reload blogs to update the list
            const fetchedBlogs = await fetchBlogs();
            const userBlogs = fetchedBlogs.filter(blog => blog.uid === currentUser.uid);
            setBlogs(userBlogs);
        });
    };

    return (
        <>
            <div>
                {isLoading ? <div onClick={toggleModal} className='py-10 px-10'>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-4 border-purple-700 hover:border-solid border-dashed rounded-lg cursor-pointer bg-purple-400 hover:bg-purple-500 dark:bg-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-solid dark:hover:border-black dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 sm:text-2xl text-sm text-purple-900 text-black font-bold dark:text-black"><span className="font-bold text-black dark:text-gray-400">Click to upload</span> Add Blog</p>
                            </div>
                        </label>
                    </div>
                </div> : <div className='flex flex-wrap items-center justify-center'><div className="loader"></div></div>}


                {/* <button
                    onClick={toggleModal}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    type="button"
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Create Blog
                    </span>
                </button> */}

                {isOpen && (
                    <div
                        id="defaultModal"
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl">
                            <div className="relative p-4 bg-purple-300 rounded-lg shadow dark:bg-gray-800">
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Add Blog
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

                                <form id="create-model" onSubmit={handleSubmit(sendDatatoFirestore)}>
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
                                                {...register("blogdescription")}
                                                rows="4"
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
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* update foam open */}

            {isupdatemodel && (
                <Updateblog bloid={updateblogid} />
            )}

            {/* update foam close */}

            <section className="dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white">Dashboard</h2>
                    </div>
                    {cardLoading ? <div className="flex flex-wrap items-center justify-center">
                        {blogs.length > 0 ? (
                            blogs.map(blog => (
                                <div key={blog.id}>
                                    {/* <ProfileBlogCard /> */}
                                    <div className="m-3 bg-purple-400 w-96 items-center bg-gray-50 flex-col rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

                                        <img className="w-full h-72 rounded-lg sm:rounded-none sm:rounded-t-lg" src={blog.imageUrl} alt="Bonnie Avatar" />
                                        <article className="p-6 rounded-b-lg border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h2>
                                            <p className="mb-5 font-semibold text-black dark:text-gray-400">{blog.description.slice(0, 130) + "....."}</p>
                                            {/* <ProfileBlogCard updateclick={updatemodel} clickdelete={toggleModal} /> */}
                                            <div className='flex'>
                                                <button className='block rounded-md px-3 py-2 hover:text-green-500 font-medium text-gray-300 hover:bg-gray-700 hover:text-white' onClick={() => updatemodel(blog.id)}>Update</button>
                                                <button
                                                    onClick={() => deleteblog(blog.id)}
                                                    className='block rounded-md px-3 py-2 text-red-500 font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-wrap font-bold text-white text-2xl items-center dark:text-black justify-center'>Blogs Not Found!</div>
                        )}
                    </div> : <div className='flex flex-wrap items-center justify-center'><div className="loader"></div></div>}
                </div>
            </section>
        </>
    )
}


export default Dashboard
