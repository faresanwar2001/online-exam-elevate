"use client";

import Image from "next/image";
import google from "../../../../../../public/assets/images/google.png";
import twitter from "../../../../../../public/assets/images/x.png";
import facebook from "../../../../../../public/assets/images/facebook.png";
import iphone from "../../../../../../public/assets/images/iphone.png";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/components/common/loading.common";

export default function LoginForm() {
  //error
  const [error, setError] = useState<string | null>(null);

  //loading
  const [loading, setLoading] = useState<boolean>(false);

  //validation
  const loginSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is Invalid" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "password is less than one character" }),
  });

  type InputForm = z.infer<typeof loginSchema>;

  //form submit
  const handleSubmitForm: SubmitHandler<InputForm> = async (values) => {
    setLoading(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    //If the login process was successful
    if (response?.ok) {
      window.location.href = response.url || "/dashboard";
      setLoading(false);
      return;
    } else {
      setError(response?.error || "Failed to sign in");
    }
  };

  //react form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(loginSchema),
  });

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
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "24.78px",
                  textAlign: "start",
                }}
              >
                Sign In
              </h3>

              {/* Email  */}
              <input
                type="email"
                placeholder="Enter Email"
                style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
                className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
                {...register("email")}
              />

              {/* validation email */}
              {errors.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.email?.message}
                </div>
              ) : null}

              {/* password  */}
              <input
                type="password"
                placeholder="password"
                style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
                className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
                {...register("password")}
              />

              {/*  validation password */}
              {errors.password ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.password?.message}
                </div>
              ) : null}

              <p className="text-end">
                <Link
                  href={"/components/auth/forgetPassword"}
                  className="text-[#4461F2]"
                >
                  Forget Your Password ?
                </Link>
              </p>

              <button
                style={{ backgroundColor: "rgba(68, 97, 242, 1)" }}
                className="rounded-[20px] p-[8px] w-[410px] h-[56px] text-[16px] text-white"
                type="submit"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </form>

            <h4 className="continueH text-[#6C737F] ">Or Continue with</h4>
            <div className="flex gap-8 justify-center items-center mt-2">
              <Image
                src={google}
                alt="Google"
                className="  rounded-[15.38]    w-[23.57px] h-[23.57px]"
              />
              <Image
                src={twitter}
                alt="Twitter"
                className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
              />
              <Image
                src={facebook}
                alt="Facebook"
                className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
              />
              <Image
                src={iphone}
                alt="Facebook"
                className=" rounded-[15.38]  w-[23.57px] h-[23.57px]"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
