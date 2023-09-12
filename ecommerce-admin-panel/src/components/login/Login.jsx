import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const Login = () => {
  const { login } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post(
        "http://localhost:8000/users/dashboard/login",
        { email, password }
      );
      login(response.data.user);
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!");
    } catch (e) {
      console.log(e.response?.data.message);
    }
  };

  return (
    <>
      <section className="absolute w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-[30px] shadow-md shadow-indigo-500/40 bg-[#f5f5f5] pr-[30px] rounded"
        >
          <img
            src={`assets/login-${Math.floor(Math.random() * 3) + 1}.jpg`}
            alt=""
            className="w-[400px]"
          />
          <article className="flex flex-col justify-center items-center gap-[30px]">
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="john-doe@gmail.com"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder=""
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-3 md:mt-0">
              <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
                Login
              </button>
            </div>
          </article>
        </form>
      </section>
    </>
  );
};

export default Login;
