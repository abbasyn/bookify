import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Yup } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFirebase } from "../context/firebase";

const userSchema = object({
  password: string().min(6).required("Password is required"),
  email: string().email().required("Email is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // redirect to home page
      navigate("/");
    }
  }, [firebase, navigate]);

  console.log(firebase);

  const onSubmit = async (data) => {
    console.log("Sign In a User...", data);

    try {
      await firebase
        .loginUserWithEmailAndPassword(data.email, data.password)
        .then((userAuth) => console.log(userAuth))
        .catch((error) => console.error(error.message));
      // Login successful, perform desired actions
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div className="bg-yellow-100 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl">
        <div className="bg-blue-400 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <p>Login</p>
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center text-lg mb-6 md:mb-2">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              type="email"
              id="username"
              {...register("email")}
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Email...."
            />
          </div>
          <p className="mb-6 text-red-600">{errors.email?.message}</p>

          <div className="flex items-center text-lg mb-6 md:mb-2">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type="password"
              id="password"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <p className="mb-6 text-red-600">{errors.password?.message}</p>

          {errors.exampleRequired && <span>This field is required</span>}

          <button
            type="submit"
            disabled={errors.length > 0}
            className="bg-gradient-to-b from-gray-700 to-blue-400 font-medium p-2 md:p-4 text-white uppercase w-full"
          >
            Login
          </button>
        </form>

        <button
          onClick={firebase.loginWithGoogle}
          className="px-4 py-2 m-5  border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
