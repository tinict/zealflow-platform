"use client";

import { Spacer } from "@nextui-org/react";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoMicrosoft } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import ButtonLogin from "../buttons/ButtonLogin";

import { RedirectGoogleAuth } from "@/common/api/sso/google/auth.redirect";

const FormLogin = () => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <div className="md:block hidden w-1/2 h-[80vh] overflow-hidden ">
        <img
          alt="login"
          className="w-full h-full object-cover object-center"
          src="https://i.pinimg.com/564x/4a/90/33/4a903338c0e478248153bd8f3f6f6745.jpg"
        />
      </div>
      <div className="md:w-[50%] sm:px-10 w-full px-0">
        <div className="flex gap-5">
          <p className="text-[32px] text-gray-500 font-medium mb-5">Register</p>
          <p className="text-[32px] font-medium mb-5">Login</p>
        </div>
        <ButtonLogin
          content={"Login with Google"}
          icon={<FcGoogle />}
          onClick={RedirectGoogleAuth}
        />
        <Spacer y={4} />
        <ButtonLogin
          content={"Login with Facebook"}
          icon={<FaFacebook className="text-blue-600" />}
        />
        <Spacer y={4} />
        <ButtonLogin
          content={"Login with Microsoft"}
          icon={<IoLogoMicrosoft className="text-blue-500" />}
        />
        <Spacer y={4} />

        <p>
          Don't have an account? <a className="text-blue-500">Sign up</a> now!
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
