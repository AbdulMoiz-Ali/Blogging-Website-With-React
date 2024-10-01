import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../configration/firebaseconfig/firebaseconfig';

function Singleblog() {
    const [data, setData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const { id } = useParams();
    const user = auth.currentUser;
    useEffect(() => {
        const fetchBlogAndUser = async () => {
            try {
                const blogRef = doc(db, "blogs", id);
                const blogSnap = await getDoc(blogRef);

                if (blogSnap.exists()) {
                    const blogData = blogSnap.data();
                    setData(blogData);

                    const userRef = doc(db, "users", blogData.uid);
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
        return <div className='flex flex-wrap items-center justify-center h-96'><div className="loader"></div></div>;
    }

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img className="mr-4 w-16 h-16 rounded-full" src={user && userProfile.image ? userProfile.image : "https://i.ibb.co/BNS6fNz/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"} alt="Jese Leos" />
                                    <div>
                                        <a href="#" rel="author" className="text-3xl font-bold text-gray-900 dark:text-white">{`${userProfile.firstname}  ${userProfile.lastname}`}</a>
                                        <p className="text-base font-bold text-purple-900 dark:text-gray-400">{userProfile.description}</p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{data.title}</h1>
                        </header>
                        <p className="lead dark:text-white">{data.description}</p>

                        <img className='my-5 rounded-lg w-full' src={data.imageUrl} alt={data.title} />
                    </article>
                </div>
            </main>
        </>
    );
}

export default Singleblog;
