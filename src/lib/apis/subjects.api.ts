import { cookies } from "next/headers"
import { EXAM_TOKEN, JSON_HEADER } from "../constants/api.constant"

export default async function GetAllSubjects(){
    //Get Token
    const token = cookies().get(EXAM_TOKEN)?.value
    
    // fetch data from server
    const response = await fetch(process.env.API + '/subjects',{
        method: 'GET',  
        headers: {
             token, 
            ...JSON_HEADER
        },
    })
    const data:ApiResponse<SubjectsType[]> = await response.json()
    
    return data
}