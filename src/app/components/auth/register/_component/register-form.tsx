"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FooterForm from "@/app/components/common/footer-form";

export default function RegisterForm() {
  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | boolean>(true);

  // Form & Validation
  const registerSchema = z
    .object({
      username: z
        .string({ required_error: "Username is required" })
        .min(1, "username is less thane one character"),
      firstName: z
        .string({ required_error: "firstName is required" })
        .min(1, { message: "firstNme is less than one character" }),
      lastName: z
        .string({ required_error: "lastName is required" })
        .min(1, { message: "lastName is less than one character" }),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Email is Invalid" }),
      password: z
        .string({ required_error: "Password is required" })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/, {
          message: "password is invalid",
        }),
      rePassword: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "rePassword is less than one character" }),
      phone: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "phone is less than one character" }),
    })
    .refine((input) => input.password === input.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  type InputForm = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(registerSchema),
  });

  // Functions
  const handleSubmitForm: SubmitHandler<InputForm> = async (values) => {
    setLoading(true);
    await axios
      .post("https://exam.elevateegy.com/api/v1/auth/signup", values)
      .then((response) => {
        console.log(response);
        setLoading(false);
        router.push("/components/auth/login");
      })
      .catch((response) => {
        setError(response?.response?.data?.message);
      });
  };

  return (
    <>
      <div className=" flex flex-col gap-8 justify-center items-center  pr-40 w-max relative">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5 pt-10  "
        >
          {/* Heading */}
          <h3
            style={{
              fontWeight: "700",
              fontSize: "24.78px",
              textAlign: "start",
            }}
          >
            Sign Up
          </h3>
          {/* error API */}
          {error ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          {/* username  */}
          <input
            type="text"
            placeholder="Enter username"
            style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
            className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
            {...register("username")}
          />

          {/* validation username */}
          {errors.username ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.username?.message}
            </div>
          ) : null}

          {/* firstName  */}
          <input
            type="text"
            placeholder="Enter firstName"
            style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
            className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
            {...register("firstName")}
          />

          {/* validation firstName */}
          {errors.firstName ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.firstName?.message}
            </div>
          ) : null}

          {/* lastName  */}
          <input
            type="text"
            placeholder="Enter lastName"
            style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
            className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
            {...register("lastName")}
          />

          {/* validation lastName */}
          {errors.lastName ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.lastName?.message}
            </div>
          ) : null}

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

          {/* rePassword  */}
          <input
            type="password"
            placeholder="rePassword"
            style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
            className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
            {...register("rePassword")}
          />

          {/*  validation rePassword */}
          {errors.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.rePassword?.message}
            </div>
          ) : null}

          {/* phone  */}
          <input
            type="tel"
            placeholder="phone"
            style={{ border: "1px solid rgba(224, 224, 233, 1)" }}
            className="gap-[2.79] w-[410px] rounded-[9.91px] p-[11.98px] h-[55.5px]"
            {...register("phone")}
          />

          {/*  validation phone */}
          {errors.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.phone?.message}
            </div>
          ) : null}

          <p className="text-end">
            <Link href={"/user/forgetPassword"} className="text-[#4461F2]">
              Forget Your Password ?
            </Link>
          </p>
          <button
            style={{ backgroundColor: "rgba(68, 97, 242, 1)" }}
            className="rounded-[20px] p-[8px] w-[410px] h-[56px] text-[16px] text-white"
            type="submit"
          >
            Create new Account
          </button>
        </form>
        {/* Form footer */}
        <FooterForm />
      </div>
    </>
  );
}
