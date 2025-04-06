"use client";

import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/app/components/common/loading.common";
import axios from "axios";
import { useRouter } from "next/navigation";
import FooterForm from "@/app/components/common/footer-form";

type Code = {
  resetCode: string;
};

export default function VerifyPassword() {
  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Form
  const { register, handleSubmit } = useForm<Code>();

  // Functions
  const handleSubmitForm: SubmitHandler<Code> = async (values) => {
    setLoading(true);
    const response = await axios
      .post("https://exam.elevateegy.com/api/v1/auth/verifyResetCode", values)
      .then((response) => {
        console.log(response);

        if (response.data.status === "Success") {
          setLoading(false);
          router.push("/components/auth/ResetPassword");
        }
        console.log(response);
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* loading */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" flex flex-col gap-8 justify-center items-center h-full pr-40 w-max relative">
            {/* error API */}
            {error ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="   flex flex-col gap-6  "
            >
              {/* Heading */}
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "24.78px",
                  textAlign: "start",
                }}
              >
                Verify Code
              </h3>

              {/* Email  */}
              <input
                type="text"
                placeholder="Enter Code"
                style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
                className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
                {...register("resetCode")}
              />

              <p className="text-end">
                {/* Navigate forget password */}
                <Link
                  href={"/components/auth/forgetPassword"}
                  className="text-black"
                >
                  Didn't receive a code{" "}
                  <span className="text-[#4461F2] underline">Resend</span>{" "}
                </Link>
              </p>
              {/* Button submit */}
              <button
                style={{ backgroundColor: "rgba(68, 97, 242, 1)" }}
                className="rounded-[20px] p-[8px] w-[410px] h-[56px] text-[16px] text-white"
                type="submit"
              >
                {loading ? "Loading..." : "Verify"}
              </button>
            </form>
            {/* Form footer */}
            <FooterForm />
          </div>
        </>
      )}
    </>
  );
}
