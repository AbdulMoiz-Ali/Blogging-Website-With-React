import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../configration/firebaseconfig/firebaseconfig'; // Ensure this path is correct
import Herocard from '../../componenet/herocard';

function Home() {
    const fetchBlogs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return blogs;
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const [blogs, setBlogs] = useState([]);
    

    useEffect(() => {
        const loadBlogs = async () => {
            const fetchedBlogs = await fetchBlogs();
            if (fetchedBlogs) {
                setBlogs(fetchedBlogs);
            }
        };
        loadBlogs();
    }, []);

    return (
        <>
            <section className="dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">All Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                    </div>

                    <div class="flex flex-wrap items-center justify-center">
                        {blogs.map((item) => (
                            <div key={item.id}>
                                <Herocard title={item.title} description={item.description} image={item.imageUrl} link={item.id} />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </>
    );
}

export default Home;