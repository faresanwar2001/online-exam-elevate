"use client";

import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/components/common/loading.common";
import axios from "axios";
import { useRouter } from "next/navigation";
import FooterForm from "@/app/components/common/footer-form";

export default function ResetPassword() {
  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Form & Validation
  const resetPasswordSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is Invalid" }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "password is less than one character" }),
  });

  type InputForm = z.infer<typeof resetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Functions
  const handleSubmitForm: SubmitHandler<InputForm> = async (values) => {
    setLoading(true);
    const response = await axios
      .put("https://exam.elevateegy.com/api/v1/auth/resetPassword", values)

      .then((response) => {
        console.log(response);
        if (response.data.message === "success") {
          setLoading(false);
          router.push("/components/auth/login");
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
                placeholder="Enter New password"
                style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
                className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
                {...register("newPassword")}
              />

              {/*  validation password */}
              {errors.newPassword ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.newPassword?.message}
                </div>
              ) : null}

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
