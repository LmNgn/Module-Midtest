import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAuth, registerAuth } from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    username: z.string().min(3, { message: "Username at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password at least 6 characters" }),
    confirmPass: z
      .string()
      .min(6, { message: "Confirm password at least 6 characters" }),
  })
  .refine((data) => data.confirmPass === data.password, {
    message: "Confirm password incorrect",
    path: ["confirmPass"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password at least 6 characters" }),
});

const AuthForm = () => {
  //   const nav = useNavigate();
  const [login, setLogin] = useState(true);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(login ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await (login
        ? loginAuth(data)
        : registerAuth({ ...data, role: "client" }));
      toast.success(`${login ? "Login" : "Register"} successful`);
      reset();
      nav(login ? "/" : "/login");
    } catch (error) {
      reset();
      toast.error("Something went wrong. Please try again");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {login ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!login && (
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                {...register("username")}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {!login && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPass")}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.confirmPass && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPass.message}
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {login ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {login ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setLogin(!login)}
            className="text-blue-600 hover:underline font-medium"
          >
            {login ? "Register now" : "Login now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
