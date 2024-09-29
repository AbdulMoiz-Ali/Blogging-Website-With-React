import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configration/firebaseconfig/firebaseconfig';

function Singleblog() {
    const [data, setData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlogAndUser = async () => {
            try {
                // Fetch the blog document by ID
                const blogRef = doc(db, "blogs", id);
                const blogSnap = await getDoc(blogRef);

                if (blogSnap.exists()) {
                    const blogData = blogSnap.data();
                    setData(blogData);

                    // Fetch the user profile using the uid from the blog
                    const userRef = doc(db, "users", blogData.uid); // Assuming user profiles are stored in a "users" collection
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserProfile(userSnap.data());
                    } else {
                        console.error("User not found");
                    }
                } else {
                    console.error("Blog not found");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchBlogAndUser();
    }, [id]);

    if (!data || !userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900 antialiased">
                <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header class="mb-4 lg:mb-6 not-format">
                            <address class="flex items-center mb-6 not-italic">
                                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img class="mr-4 w-16 h-16 rounded-full" src={userProfile.imageUrl} alt="Jese Leos" />
                                    <div>
                                        <a href="#" rel="author" class="text-3xl font-bold text-gray-900 dark:text-white">{`${userProfile.firstname}  ${userProfile.lastname}`}</a>
                                        <p class="text-base font-bold text-purple-900 dark:text-gray-400">{userProfile.description}</p>
                                        <p class="text-base text-black dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                                    </div>
                                </div>
                            </address>
                            <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{data.title}</h1>
                        </header>
                        <p class="lead dark:text-white">{data.description}</p>

                        <img className='my-5 rounded-lg w-full' src={data.imageUrl} alt={data.title} />

                    </article>
                </div>
            </main>
        </>
    );
}

export default Singleblog;
