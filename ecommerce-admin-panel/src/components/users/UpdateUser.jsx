import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const UpdateUser = () => {
  // users stored in the global context (coming from db)
  const { users, updateUser } = useGlobalContext();

  // user being updated
  const { id } = useParams();
  const user = users.find((user) => user._id == id);

  // react hook from apis
  const {
    register,
    handleSubmit,
    formState: { error },
    setValue,
  } = useForm();

  // when submitting the form
  const onSubmit = async (data) => {
    const { first_name, last_name, role, email, phone_number } = data;
    const response = await axios.patch(
      `http://localhost:8000/users/${id}`,
      {
        first_name,
        last_name,
        role,
        email,
        phone_number,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    updateUser(response.data);

    toast.success("User updated successfully!");
  };

  useEffect(() => {
    setValue("first_name", user?.first_name);
    setValue("last_name", user?.last_name);
    setValue("email", user?.email);
    setValue("role", user?.role);
    setValue("phone_number", user?.phone_number);
  }, []);

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Update user
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs flex flex-wrap gap-[4rem] justify-between">
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="block text-xs font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                {...register("first_name")}
                type="text"
                id="firstName"
                placeholder="John"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="block text-xs font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                {...register("last_name")}
                type="text"
                id="lastName"
                placeholder="Doe"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
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
                htmlFor="phone"
                className="block text-xs font-medium text-gray-700"
              >
                Phone Number
              </label>

              <input
                {...register("phone_number")}
                type="text"
                id="phone"
                placeholder="0101706613"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="role"
                className="block text-xs font-medium text-gray-700"
              >
                Role
              </label>

              <input
                {...register("role")}
                type="text"
                id="role"
                placeholder="admin"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
          </article>
          <div className="my-[30px]">
            <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
              Save User
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateUser;
