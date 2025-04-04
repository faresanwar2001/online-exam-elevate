"use client";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <>
      <div className="flex justify-center items-center ">
        <ClipLoader
          cssOverride={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size={50}
          color="black"
        />
      </div>
    </>
  );
}
