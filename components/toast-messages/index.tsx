"use client";

import { Toaster } from "react-hot-toast";

export const Toast = () => {
  return (
    <Toaster
      containerClassName=""
      containerStyle={{}}
      gutter={8}
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
        },
      }}
    />
  );
};
