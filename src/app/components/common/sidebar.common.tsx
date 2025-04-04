"use client"
import { signOut } from "next-auth/react";
import { useState } from "react";



export default function Sidebar(){

  //show popup
  const [showPopup,setShowPopup]= useState<boolean>(false)

  //show popup
  const showPopupHandler = ()=>{
    setShowPopup(true)
  }

  //close popup
  const closePopup = ()=>{
    setShowPopup(false)
  }

  

    return <div className="lg:block hidden">
  
  <div>
  
    <aside id="default-sidebar" className="  lg:block hidden top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-6 py-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="#" className="flex items-center bg-[#4461F2] p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="w-5 h-5 text-white  transition duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3 hover:text-black ">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          
              <button className=""><i className="fa-regular mr-4 fa-clock"></i>Quiz History</button>
            </a>
          </li>
          <li>
              
              <button onClick={()=>showPopupHandler()}  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><i className="fa-solid mr-4 fa-right-from-bracket"></i> Log Out</button>
          </li>
      
        </ul>
      </div>
    </aside>
    
  </div>
  {showPopup?<div className="popupOverlay">
                <div className="popupContent">
                <div className="p-3 rounded text-start">
                    <h2 className="text-lg font-semibold text-start text-gray-900 mb-6">Are you sure you want to log out?</h2>
                    
                    <div className="flex justify-between px-6 gap-5">
                    <button className="outline outline-1 font-semibold text-[18px] px-[24px] py-[5px] rounded-lg w-[240px] text-[#4461F2]"
                    
                    onClick={()=>closePopup()}
                    >Cancel</button>     
                    <button
                     className="font-semibold text-[18px] px-[24px] py-[5px] rounded-lg w-[240px] bg-[#4461F2] text-[#fff]"
                     onClick={()=>signOut({
                       callbackUrl: "/components/auth/login",
                     })}
                     >LogOut</button>     

                </div>
                </div>
                </div>
                </div>:null}

 
  
  
  
  
      
      </div>
  }