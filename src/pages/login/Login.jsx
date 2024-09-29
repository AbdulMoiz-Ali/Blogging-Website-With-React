import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configration/firebaseconfig/firebaseconfig';

function Login() {
    const navigate = useNavigate();
    const email = useRef()
    const password = useRef()
    const [loder, setloder] = useState(null)
    // function loders(bloen) {
    //     if (bloen === true) {
    //         <div class="loader"></div>
    //     }

    // }
    const loginfoam = (e) => {
        e.preventDefault();
        setloder(true)
        // console.log(email.current.value, password.current.value);

        signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // setloder()
                <div className="loader hidden"></div>
                // console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                // console.log(errorMessage);
            }).finally(() => {
                setloder(false);
            });
    }



    const signupgo = () => {
        // Navigate to specific path
        navigate('/signup')
    }

    return (
        <>
            <section className="h-full bg-purple-300 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
                <div className="flex py-8 justify-center px-4 mx-auto max-w-screen-xl lg:py-16 z-10 relative">
                    <div className="w-full h-full lg:max-w-xl p-10 space-y-11 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">

                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Sign in to Blogging
                        </h2>

                        <form onSubmit={loginfoam} className="mt-2 space-y-7">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input ref={email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input ref={password} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-start">

                                <a href="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot Password?</a>
                            </div>
                            <div className="flex max-sm:gap-10 justify-between items-center">
                                <button type="submit" className="bg-purple-900 w-50 px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {loder ? (
                                    <div className="loader">loding................................</div>
                                ) : ("Login to your account")}</button>
                                <div className="text-sm max-sm:w-30 font-medium text-gray-900 dark:text-white">
                                    Not registered yet?   <button onClick={signupgo} className="text-blue-600 hover:underline dark:text-blue-500">Create account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login