import React from "react";

function ButtonLogin({ ...props }) {
  const { icon, content, onClick } = props;

  return (
    <button
      className="w-full h-[60px] border-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100  active:bg-gray-200 transition-all"
      onClick={onClick}
    >
      <div className="text-[20px]">{icon}</div>
      <p className="text-gray-500 text-[16px] font-medium">{content}</p>
    </button>
  );
}

export default ButtonLogin;
