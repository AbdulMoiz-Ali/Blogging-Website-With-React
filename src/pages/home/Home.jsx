import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../configration/firebaseconfig/firebaseconfig'; // Ensure this path is correct
import Herocard from '../../componenet/herocard';

function Home() {
    const user = auth.currentUser;
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return []; // Return an empty array on error
        }
    };

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching users:", error);
            return []; // Return an empty array on error
        }
    };

    useEffect(() => {
        setIsLoading(false);
        const loadBlogs = async () => {
            const [fetchedBlogs, fetchedUsers] = await Promise.all([fetchBlogs(), fetchUsers()]);

            // Combine blogs with user data
            const combinedData = fetchedBlogs.map(blog => {
                const user = fetchedUsers.find(user => user.id === blog.uid); // Assuming blog has a userId field
                return {
                    ...blog,
                    profileimg: user ? user.image : '', // Assuming user has an imageUrl field
                    profilefirstname: user ? user.firstname : 'Unknown', // Assuming user has firstname field
                    profilelastname: user ? user.lastname : 'Unknown' // Assuming user has firstname field
                };
            });

            setBlogs(combinedData);
            setIsLoading(true);

        };

        loadBlogs();
    }, []);

    return (
        <section className="dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">All Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                </div>


                {isLoading ? <div className="flex flex-wrap items-center justify-center">
                    {blogs.map((item) => (
                        <div key={item.id}>
                            <Herocard
                                title={item.title}
                                description={item.description}
                                image={item.imageUrl}
                                link={item.id}
                                profileimg={user && item.profileimg ? item.profileimg : "https://i.ibb.co/BNS6fNz/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"}
                                profilename={item.profilefirstname + " " + item.profilelastname}
                            />
                        </div>
                    ))}
                </div> : <div className='flex flex-wrap items-center justify-center'><div className="loader"></div></div>}


            </div>
        </section>
    );
}

export default Home;