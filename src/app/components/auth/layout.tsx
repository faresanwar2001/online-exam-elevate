import Link from "next/link";
import StyleAuth from "./_component/style.auth";


type AuthLayoutProps = {
    children: React.ReactNode;
  } ;
export default function AuthLayout( {children} : AuthLayoutProps){

    return<main className="flex grid-cols-2 justify-between items-center relative">
     <div className="links flex gap-6 justify-end absolute top-7 right-8">
          <Link
            href=""
            className="text-black text-[20px] font-medium cursor-pointer"
          >
            <select name="" id="">
            <option value="English">English</option>
            </select>
           
          </Link>
          <Link
            href="/components/auth/login"
            className="px-4 font-bold text-[#4461F2] rounded-xl cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            href="/components/auth/register"
            className="border px-4 font-light text-[#4461F2] rounded-2xl cursor-pointer"
          >
            Register
          </Link>
        
        </div>
    <StyleAuth/>
   
    {children}

    </main>
}