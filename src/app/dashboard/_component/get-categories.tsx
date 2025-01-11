import GetAllSubjects from "@/lib/apis/subjects.api"
import Image from "next/image";
import Link from "next/link";


export default async function GetSubjects(){

    const subject = await GetAllSubjects()
    console.log(subject);
    

    return<>
        <div className="shadow-md rounded-md py-[32px] px-[16px] my-20 mr-6 w-full ">
          <div className="flex justify-between pb-4">
            <div className="quiz text-[#4461F2] text-[24px] text-Poppins">Quizzes</div>
            <div className="view text-[#4461F2] text-[24px] ">View All</div>
          </div>
          <div className="lg:grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-4 relative w-full">
          {subject?.subjects?.map((item)=><div key={item?._id} >
            <Link href={`/dashboard/exams/${item?._id}`}>
             
            <div
              className="relative rounded-xl overflow-hidden shadow-md "
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={330}
                height={292}
                className="w-full h-[292px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 m-4 bg-[#1935CA] bg-opacity-40 backdrop-blur-[27.01px] text-white rounded-xl">
                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
              </div>
            </div>

      
          </Link>
          </div>
        )}

          </div>
          </div>
         

    </>
}