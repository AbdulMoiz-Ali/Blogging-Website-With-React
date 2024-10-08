import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../configration/firebaseconfig/firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [usname, setUsname] = useState(null);
  const [usemail, setUsemail] = useState(null);
  const [usdescription, setUsdescription] = useState(null);
  const [usurl, setUsurl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const getUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentUserDoc = docSnap.data()
        console.log("Document data:", currentUserDoc);
        setUsname(`${currentUserDoc.firstname} ${currentUserDoc.lastname}`);
        setUsemail(currentUserDoc.email);
        setUsurl(currentUserDoc.image);
        setUsdescription(currentUserDoc.description);
      } else {
        console.log("No such document!");
        setUsname(null);
        setUsemail(null);
        setUsurl(null);
        setUsdescription(null);
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid)
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const currentid = JSON.parse(localStorage.getItem("currentUser"));
  const updateprofile = (data) => {
    toggleSidebar()
    setIsLoading(false)
    console.log("submit")
    console.log(data)
    const image = watch("profileimage")
    const file = image[0]
    const desc = watch("description")
    console.log(desc)
    uploadImageToStorage(file, desc);
    // const storageRef = ref(storage, file.name);
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   getDownloadURL(storageRef).then((url) => {
    //     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //     const userdata = {
    //       desc,
    //       picture: url,
    //       createdBy: currentUser.uid,
    //     };
    //     addDoc(collection(db, "userdata"), userdata).then((snapshot) => {
    //       // loader display none
    //       alert("moiz")
    //     });
    //   });
    // })


  }
  const user = auth.currentUser;

  const uploadImageToStorage = async (file, desc) => {
    const storageRef = ref(storage, `user-profile-collection/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("File successfully uploaded");
      console.log(snapshot.metadata);

      const url = await getDownloadURL(storageRef);
      console.log(url);
      console.log(user.uid);

      const userRef = doc(db, "users", `${user.uid}`);
      if (userRef) {
        console.log(userRef);
        const docUpdate = await updateDoc(userRef, {
          image: url,
          description: desc
        });
      } else {
        console.log("User not found");
      }


    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(true)
      nav("/")
    }

  }



  // const getAllProducts = async () => {
  //   // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   const querySnapshot = await getDocs(collection(db, "userdata"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     const { createdBy, desc, picture } = doc.data();
  //     console.log(picture)
  //     console.log(desc)
  //     console.log(createdBy)
  //   });
  // };
  // getAllProducts();
  return (
    <>
      <div className='w-full dark:bg-gray-900'>
        {/* public/image-2@2x.jpg */}
        {isLoading ? <section className="dark:bg-gray-900">
          <div className="gap-8 items-center py-26 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img className="rounded-full w-96 h-96" src={user && usurl ? usurl : "https://i.ibb.co/ygKxdm8/image-2-2x.jpg"} alt="Profile" />
            <div className="mt-10 mb-10 md:mt-0">
              <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">{usname}</h2>
              <h2 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">{usemail}</h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                {usdescription}
              </p>
              <div className="text-center flex">
                <button
                  onClick={toggleSidebar}
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 inline-flex items-center text-white bg-purple-700 dark:bg-gray-800 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
                  type="button"
                >
                  Update Profile <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </section> : <div className='flex flex-wrap items-center justify-center h-96'><div className="loader"></div></div>}

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="bg-purple-300 fixed top-0 left-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto dark:bg-gray-800">
            <h5 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Update ProFile</h5>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            {/* onSubmit={updateprofile} */}
            <form onSubmit={handleSubmit(updateprofile)}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea required rows="8" {...register("description")} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter event description here">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input required id="dropzone-file" {...register("profileimage")} type="file" className="hidden" />
                  </label>
                </div>

              </div>
              <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                <button type="submit" className="w-full justify-center text-emerald-400 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900">
                  {/* <svg aria-hidden="true" class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> */}
                  Update
                </button>
                <a onClick={toggleSidebar} className="w-full justify-center hover:bg-purple-800 dark:text-white text-black bg-primary-700 dark:hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Cancel
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;