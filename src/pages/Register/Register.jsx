import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../configration/firebaseconfig/firebaseconfig';

function Signup() {
  const navigate = useNavigate();
  const firstname = useRef()
  const lastname = useRef()
  const email = useRef()
  const password = useRef()
  const [loder, setloder] = useState(null)

  const signupfoam = (e) => {
    e.preventDefault();
    setloder(true)
    const userdata = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      password: password.current.value
    };
    // console.log(userdata)

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), userdata).then((userRef) => {
          // console.log("succseass")
          console.log(user.uid)

        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);
      }).finally(() => {
        setloder(false);
        navigate("/")
      });
  }






  const logingo = () => {
    // Navigate to specific path
    navigate('/login')
  }
  return (
    <>
      {/* <Link to={"/"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"><button>back</button></Link> */}
      {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://i.ibb.co/RbVPLgH/todo.png" alt="todo" border="0" />

          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create An Account</h2>
        </div>
        {loder ? (
          <div className="loader mx-auto mt-4"></div>
        ) : (
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={signupfoam} className="space-y-6">
              <div className='mt-2'>
                <label className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                <div className="mt-2">
                  <input type="text" ref={name} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input type="email" ref={email} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input type="password" ref={password} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?
              <button onClick={logingo} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here...</button>
            </p>
          </div>)}
      </div> */}





      <section className="h-full bg-purple-300 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex py-8 justify-center px-4 mx-auto max-w-screen-xl lg:py-12 z-10 relative">
          <div className="w-full h-full lg:max-w-xl p-5 space-y-5 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Register to Blogging
            </h2>
            {loder ? (
              <div className="loader mx-auto mt-4"></div>
            ) : (
              <form onSubmit={signupfoam} className="mt-2 space-y-4">
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input ref={firstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input ref={lastname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input ref={email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                  <input ref={password} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex flex-col max-sm:gap-10 gap-5 items-center">
                  <button type="submit" className="bg-purple-900 w-50 px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {loder ? (
                    <div className="loader">loding................................</div>
                  ) : ("Login to your account")}</button>
                  <div className="text-sm max-sm:w-30 font-medium text-gray-900 dark:text-white">
                    Already have an account? <button onClick={logingo} className="text-blue-600 hover:underline dark:text-blue-500">Login here...</button>
                  </div>
                </div>
              </form>)}
          </div>
        </div>
      </section>

    </>
  )
}


// export default user
export default Signup