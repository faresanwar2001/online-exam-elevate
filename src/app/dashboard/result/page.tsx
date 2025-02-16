"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Result() {
  //navigation
  const router = useRouter();

  //show popup
  const [showPopup, setShowPopup] = useState<boolean>(false);

  //closePopup
  const closePopup = () => {
    router.push("/dashboard");
  };

  return (
    <>
      {!showPopup ? (
        <div className="popupOverlay">
          <div className="popupContent">
            <div className="p-3 rounded text-start">
              <div className="p-5 shadow-md rounded-md">
                <div className="correctAnswer bg-[#F8D2D2] p-2 rounded-md">
                  <h2 className="text-lg font-semibold text-white text-center">
                    Correct Answer
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Your answer is: {/* insert selected answer */}
                  </p>
                </div>
              </div>
              <button
                onClick={() => closePopup()}
                className=" font-semibold text-[18px] px-[24px] py-[5px] bg-[#4461F2] rounded-lg w-[240px] text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
