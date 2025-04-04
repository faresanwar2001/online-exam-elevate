import React from 'react'
import Image from "next/image";
import google from "../../../../../../public/assets/images/google.png";
import twitter from "../../../../../../public/assets/images/x.png";
import facebook from "../../../../../../public/assets/images/facebook.png";
import iphone from "../../../../../../public/assets/images/iphone.png";

function FooterForm() {
  return (
    <>
    {/* Heading */}
    <h4 className="continueH text-[#6C737F] ">Or Continue with</h4>
    <div className="flex gap-8 justify-center items-center mt-2">
        {/* Building image */}
      <Image
        src={google}
        alt="Google"
        className="  rounded-[15.38]    w-[23.57px] h-[23.57px]"
      />

      {/* Building image */}
      <Image
        src={twitter}
        alt="Twitter"
        className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
      />

      {/* Building image */}
      <Image
        src={facebook}
        alt="Facebook"
        className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
      />

      {/* Building image */}
      <Image
        src={iphone}
        alt="Facebook"
        className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
      />
    </div>
    </>
  )
}

export default FooterForm
