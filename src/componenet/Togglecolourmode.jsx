import React, { useEffect, useState } from 'react';

const Togglecolourmode = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const htmlClass = document.querySelector('html').classList;
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            htmlClass.add('dark');
            setIsDarkTheme(true);
        } else {
            htmlClass.remove('dark');
            // Set default to dark mode if no theme is stored
            localStorage.setItem('theme', 'dark');
            htmlClass.add('dark');
            setIsDarkTheme(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkTheme((prevMode) => {
            const newMode = !prevMode;
            const htmlClass = document.querySelector('html').classList;

            if (newMode) {
                htmlClass.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlClass.remove('dark');
                localStorage.removeItem('theme');
            }
            return newMode;
        });
    };

    return (
        <>
            <main>
                <button
                    onClick={toggleDarkMode}
                    id="theme-toggle"
                    type="button"
                    className="text-white dark dark:text-gray-400 hover:bg-purple-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        className={`${isDarkTheme ? 'block' : 'hidden'} w-5 h-5`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                        id="theme-toggle-light-icon"
                        className={`${isDarkTheme ? 'hidden' : 'block'} w-5 h-5`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                    </svg>
                </button>
                {/* <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button> */}
            </main>
        </>
    );
};

export default Togglecolourmode