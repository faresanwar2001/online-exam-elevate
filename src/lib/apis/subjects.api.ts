import { cookies } from "next/headers"
import { EXAM_TOKEN, JSON_HEADER } from "../constants/api.constant"

export default async function GetAllSubjects(){
    //Get Token
    const token = cookies().get(EXAM_TOKEN)?.value
    console.log("token is",token);
    
    
    // fetch data from server
    const response = await fetch(process.env.API + '/subjects',{
        method: 'GET',  
        headers: {
             token, 
            ...JSON_HEADER
        },
    })
    const data:ApiResponse<PaginatedResponse<{subjects:SubjectsType[]}>> = await response.json()

    if("code" in data){
        throw new Error(data.message)
    }
    
    return data
}