import React, { useState } from 'react'

function ProfileBlogCard({ updateclick, clickdelete }) {


    return (
        <>
            {/* <div className="cursor-pointer">
                <FaEllipsisVertical
                            className="text-[#542F84] text-2xl"
                            onClick={() => setShowMenu(!showMenu)}
                        />
                <div
                    className="text-[#542F84] text-2xl"
                    onClick={() => setShowMenu(!showMenu)}>
                    menu
                </div>
            </div> */}
            {/* {showMenu ? ( */}
            <div className='flex'>
                <button className='block rounded-md px-3 py-2 hover:text-green-500 font-medium text-gray-300 hover:bg-gray-700 hover:text-white' onClick={updateclick}>Update</button>
                <button
                    onClick={clickdelete}
                    className='block rounded-md px-3 py-2 text-red-500 font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                >
                    Delete
                </button>
            </div>
            {/* ) : null} */}
        </>
    )
}

export default ProfileBlogCard

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEllipsisVertical } from "react-icons/fa6";
// import { deleteDocument } from "../../../../configs/firebase/firebaseMethods";
// function BlogCard({
//   id,
//   blogId,
//   blogTitle,
//   blogDescription,
//   blogImage,
//   authorImage,
//   authorName,
//   creationDate,
//   updationState,
// }) {
//   console.log(id);
//   const [showMenu, setShowMenu] = useState(false);
//   const handleDeleteBlog = async () => {
//     try {
//       const deleteResponse = await deleteDocument("blogs", id);
//       console.log(deleteResponse);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <article
//         className="w-[100%] h-[fit-content] bg-[#fff] mt-3 py-6 px-4 rounded relative"
//         style={{
//           boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
//         }}
//       >
//         <div className="flex gap-2 w-[fit-content]">
//           <img className="w-[200px] h-[100%]" src={blogImage} alt="image" />
//           <div className="w-[fit-content] flex flex-col p-2">
//             <h1 className="text-[30px] font-bold w-[fit-content]">
//               {blogTitle?.length > 30
//                 ? blogTitle?.slice(0, 50) + "..."
//                 : blogTitle}
//             </h1>
//             <div className="flex items-center gap-2">
//               <div>
//                 <img
//                   className="w-[50px] h-[50px] rounded-full"
//                   src={authorImage}
//                   alt="author-image"
//                 />
//               </div>
//               <div className="flex flex-col justify-center gap-0">
//                 <p className="text-[14px] text-[#525252] font-bold">
//                   Created by -<span> {authorName}</span>
//                 </p>
//                 <p className="text-[14px] text-[#525252] font-bold">
//                   Created on -<span> {creationDate}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="py-2 px-4 text-[#272727]">
//           <p className="text-[18px] font-semibold text-justify">
//             {blogDescription?.length > 600
//               ? blogDescription.slice(0, 600) + "..."
//               : blogDescription}
//           </p>
//         </div>
//         <div className="flex items-center justify-end px-5">
//           <button className="bg-[#542F84] text-[#fff] py-1 px-5 rounded font-bold">
//             <Link to={`/SingleBlog/${id}`}>Read</Link>
//           </button>
//         </div>
// {updationState === "true" ? (
//   <div>
//     <div className="absolute top-5 right-4 cursor-pointer">
//       <FaEllipsisVertical
//         className="text-[#542F84] text-2xl"
//         onClick={() => setShowMenu(!showMenu)}
//       />
//     </div>
//     {showMenu ? (
//       <div
//         className="w-[150px] flex flex-col bg-[rgba(0,0,0,0.5)] text-[#dbdbdb] text-[17px] font-bold rounded items-center justify-center absolute top-14 right-10 py-4 px-1 cursor-pointer"
//         style={{
//           boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
//         }}
//       >
//         <div
//           className="w-[100%] flex items-center justify-center py-2"
//           style={{
//             borderBottom: "1px solid #dbdbdb",
//           }}
//         >
//           <Link to={`/Profile/${id}/UpdateBlog/${blogId}`}>Update</Link>
//         </div>
//         <div
//           className="w-[100%] flex items-center justify-center py-2"
//           onClick={handleDeleteBlog}
//         >
//           Delete
//         </div>
//       </div>
//     ) : null}
//   </div>
// ) : null}
//       </article>
//     </>
//   );
// }

// export default BlogCard;