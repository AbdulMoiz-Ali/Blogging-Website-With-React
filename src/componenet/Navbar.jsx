import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../configration/firebaseconfig/firebaseconfig';
import Togglecolourmode from './Togglecolourmode';
function Navbar() {
    const user = auth.currentUser;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuleft, setIsMenuleft] = useState(false);
    const [proshow, setproshow] = useState(false);
    const [authbtn, setauthbtn] = useState(true);
    const [username, setusername] = useState(false);
    const [usname, setusname] = useState(null);
    const [usemail, setusemail] = useState(null);
    const [url, seturl] = useState(null);
    const navigator = useNavigate()
    // Toggle function to show/hide the menu
    const toggleMenu = () => {
        setIsMenuVisible(prevState => !prevState);
    };
    const toggleMenuleft = () => {
        setIsMenuleft(prevState => !prevState);
    };
    const logoclick = () => {
        navigator("")
    };
    const godashboard = () => {
        navigator("dashboard")
    };
    const goprofile = () => {
        navigator("profile")
    };
    const logoutbtn = () => {

        signOut(auth)
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("currentUser");
                setproshow(false);
                setusername(false);
                setauthbtn(true);
                setusname(null);
                setusemail(null);
                seturl(null);
                console.log("log out")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // console.log(uid)
            getDoc(doc(db, "users", uid))
                .then((snapshot) => {
                    const userData = snapshot.data();
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify({ uid, firstName: userData.firstname })
                    );
                    setproshow(true);
                    setusername(true);
                    setauthbtn(false);
                    setusname(userData.firstname + " " + userData.lastname);
                    setusemail(userData.email);
                    seturl(userData.image);
                })
                .catch((err) => {
                    console.log(err);
                    setproshow(false);
                    setusername(false);
                    setauthbtn(true);
                    setusname(null);
                    setusemail(null);
                    seturl(null);
                })
        }
    })
    return (
        <>
            <nav className="bg-purple-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button onClick={toggleMenuleft} type="button" className="hover:bg-purple-500 relative inline-flex items-center justify-center rounded-md p-2 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div style={{ cursor: "pointer" }} onClick={logoclick} className="flex flex-shrink-0 items-center">
                                <img className="h-10 w-auto" src="https://i.ibb.co/VDtzyz9/In-Shot-20240928-221732248.png" alt="todo" border="0" />
                                {/* <img className="h-8 w-auto" src="src/component/images/todo.svg" alt="Your Company" /> */}
                                <h2 className="text-2xl hidden font-bold leading-7 mx-5 text-green-100 sm:truncate sm:text-3xl sm:tracking-tight sm:block">Blogging App</h2>
                            </div>
                            {/* <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                                </div>
                            </div> */}
                        </div>
                        <Togglecolourmode />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {username === false ? <button type="button" className="relative rounded-full dark:bg-gray-800 p-1 dark:text-gray-400 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <div style={{ display: authbtn ? 'flex' : 'none', }} className="max-sm:hidden space-x-4">
                                    <Link to={"login"} className="rounded-md px-3 py-2 text-sm font-medium dark:text-gray-300 hover:bg-purple-500 dark:hover:bg-gray-700 hover:text-white hidden sm:block">Log in</Link>
                                    <Link to={"signup"} className="bg-purple-900 rounded-md dark:bg-gray-900 px-3 py-2 text-sm font-medium dark:text-white hidden sm:block" aria-current="page">Sign Up</Link>
                                </div>
                            </button> : <h2 className="text-sm font-bold leading-7 mx-5 hidden text-green-100 sm:truncate sm:text-lg sm:tracking-tight sm:block">{usname}</h2>}




                            <div style={{ display: proshow ? 'block' : 'none', }} className="relative ml-3">
                                {/* "https://i.ibb.co/BNS6fNz/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" */}
                                <div>
                                    <button onClick={toggleMenu} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={user && url ? url : "https://i.ibb.co/BNS6fNz/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"} alt="png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail" border="0" />
                                        {/* <img className="h-8 w-8 rounded-full" src="./public/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="" /> */}
                                    </button>
                                </div>


                                <div style={{ display: isMenuVisible ? 'flex' : 'none', }} className="items-center flex-col justify-around absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-nonez-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 bg-purple-400" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                    {/* <button onClick={godashboard} className="fzlex items-center gap-12 font-medium px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1"><span>Dashboard</span></button> */}
                                    {/* <button onClick={goprofile} className="fzlex items-center gap-12 font-medium px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1"><span>Profile</span></button> */}
                                    {/* <button onClick={logoutbtn} className="fzlex items-center gap-12 font-medium px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1"><span>Log Out</span><span style={{ width: "10px", height: "20px" }} className="loader"></span></button> */}
                                    {/* <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown"> */}
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 font-bold dark:text-white">{usname}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{usemail}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <button onClick={godashboard} className="block px-4 py-2 text-sm text-black hover:bg-purple-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</button>
                                        </li>
                                        <li>
                                            <button onClick={goprofile} className="block px-4 py-2 text-sm text-black hover:bg-purple-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</button>
                                        </li>
                                        <li>
                                            <button onClick={logoutbtn} className="block px-4 py-2 text-sm text-black hover:bg-purple-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log Out</button>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: isMenuleft ? 'block' : 'none', }} className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link to={"login"} className="block rounded-md dark:bg-gray-900 px-3 py-2 bg-purple-900 text-base font-medium text-white" aria-current="page">Log in</Link>
                        <Link to={"signup"} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign Up</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar