"use client"

import Loading from "@/app/components/common/loading.common"
import axios from "axios"
import { getSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Questions(){
    //param
    const {id} = useParams()

    //Navigation
    const router = useRouter()

    //correct Answer   
    const [correctAnswer,setCorrectAnswer] = useState<string>()


    //questions
    const [questions,setQuestions] = useState<Question[]>([])

    //current Index
    const [index, setCurrentIndex] = useState<number>(0)

    //show popup
    const [showPopup,setShowPopup]= useState<boolean>(false)


    //fetch API
    const getQuestions= async()=> {
        //get token from session
        const session = await getSession()
        
        //fetch data from server
        const response = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`,{
            headers: {
                token: session?.token
            },
        })
        if(response.data.message === "success"){
            console.log(response);
            

            setQuestions(response?.data?.questions)
            setCorrectAnswer(response?.data?.questions?.correct)
        }
    }

    //handle next
    const nextQuestionHandler=()=>{
        if(index < questions.length -1){
            setCurrentIndex((prev)=>prev + 1)
        }else{
            router.push("/dashboard/result")
        }
    }

    //handle back
    const backQuestionHandler = ()=>{
        if(index > 0){
            setCurrentIndex((prev)=>prev - 1)
        }
    }


    //current index
    const question = questions[index]
    console.log(question);

    //handle answer
   const handleAnswer = ()=>{
    
   }
    

   
    useEffect(()=>{
        getQuestions()
    })

    return<>
    {!showPopup?
    <div className="popupOverlay">
        <div className="popupContent">
            <div className="container rounded-md text-start p-3 w-full mx-auto">
        <h3 className="my-4 font-normal text-[13px] text-[#4461F2]">{index} of {questions.length}</h3>
        <h2 className="my-4 font-semibold">{question?.question}</h2>
        {question?.answers?.map((answer)=>  <div className="options bg-[#EDEFF3] rounded-md p-2 my-4"  key={answer.key}>
        <input
          id={`${answer.key}`}
          type="radio"
          name={`question-${index}`}
        />
        <label htmlFor={`${answer.key}`} className="ml-2" >{answer.answer}.</label>
        </div>
        )}
        
        <div className="flex justify-between  my-3 px-5">
            <button className="border w-[250px] mr-4 text-[#4461F2] border-[#4461F2] px-[30px] py-[7px] rounded-[28px] "
            onClick={()=>backQuestionHandler()}
            >Back</button>

            <button className=" rounded-[28px] w-[250px] bg-[#4461F2] px-[30px] py-[7px] text-white "
            onClick={()=>nextQuestionHandler()}
            >
            {index === questions.length - 1 ? "Submit" : "Next"}
            
            </button>

        </div>

                </div>
                        
                   
        </div>
    </div>:null}
   
    
    

    </>
}