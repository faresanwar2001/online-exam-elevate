"use client"
import Spinner from "@/app/components/common/spinner.constant";
import axios from "axios"
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import "../../../globals.css"


export default function AllExams(){

    //data
    const [exams, setExams] = useState<Exams[]>()
    //loading
    const [loading, setLoading] = useState<boolean>(true)
    

    //show popup
    const [showPopup, setShowPopup] = useState<boolean>(false)
    
    
    //popup open
    const openPopup = ()=>{
        setShowPopup(true)
    }
    
    
     //subject id from url params
    const {id } = useParams()    
        
    // fetch all exams from the API
    const allExams = async ()=>{
        setLoading(true)
        //get session from next-auth
        const session = await getSession()
             console.log(session?.token);
        const response = await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`,{
            headers:{
                token:session?.token
            }            
        })
        .then((response)=>{
            if(response.data.message==="success"){
                setExams(response.data.exams)
                setLoading(false)
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    useEffect(()=>{
        allExams()
    },[])



    return<>
    {loading?<>
        <div className="flex justify-center items-center ">
            <Spinner/>
        
    </div>
    </>:null}
    <div className="container rounded-md shadow-md p-3 mt-24 ml-56 ">
        {exams?.map((exam)=> <div key={exam?._id} className="flex shadow-sm rounded-md p-3 justify-between my-4 ">
            <div className="icon">
                <div className="img">
                </div>
                <div className="icon-title">
                    <h5 className="font-semibold">{exam?.title} </h5>
                    <p className="text-[#535353] mb-1">{exam?.numberOfQuestions} Questions</p>
                </div>
            </div>
            <div className="start">
                <h5 className="text-[#535353] mb-1">{exam?.duration} Minutes</h5>
                <Link 
                 className="bg-[#4461F2] py-[4px] px-[24px] rounded-[10px] text-white" href={''} 
                 onClick={()=>openPopup()}
                 >Start</Link>
            </div>
            {showPopup? <div className="popupOverlay">
                <div className="popupContent">
                <div className="p-3 rounded text-start">
                    <h2 className="text-lg font-semibold mb-4 text-start text-gray-900">Instructions</h2>
                    <ul className="list ml-6">
                        <li className="my-1 text-[#535353]">Select one correct answer for each question.</li>
                        <li className="my-1 text-[#535353]">You cannot go back to a previous question.</li>
                        <li className="my-1 text-[#535353]">You can skip a question if you are not sure about it.</li>
                        <li className="my-1 text-[#535353]">Your final score will be calculated based on the number of correct answers.</li>
                    </ul>
                    <div className="flex justify-between">
                         <Link href={`/dashboard/questions/${exam?._id}`}   className="bg-[#4461F2] text-center w-full py-[4px] px-[24px] rounded-[10px] text-white hover:bg-blue-500 focus:outline-none mt-3">start</Link>
     

                </div>
                </div>
                </div>
                </div> :null}
        </div>
        )}
       
    </div>
  
    
     

    
    </>
}