'use client'

import Image from "next/image"
import Link from "next/link"
import img from "../../../../../public/assets/images/bro.png"


export default function StyleAuth(){

    return<>
    
    <div className="login grid  space-y-10 h-screen w-max">
      <div className="welcome-elevate flex h-full flex-col justify-center bg-[#F0F4FC] col-span-1 py-8 px-8 shadow-lg rounded-tr-[100px] rounded-br-[100px]">
        <h1 className="text-5xl font-semibold leading-tight">
          Welcome to{" "}
          <span className="block text-[#122D9C] leading-loose">Elevate</span>
        </h1>
        <p className="text-lg font-normal">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
        <Image width={708} className="w-full" height={308} src={img} alt="elevate" />
      </div>
    
    </div>

    </>
}