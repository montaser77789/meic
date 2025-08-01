import React from "react";
import Form from "./_components/Form";
import bgImage from "../../../../../public/images/16fb6ac02ec32d408b1e2a37b4a78c241610b23b.jpg";

const SigninPage = () => {
  return (
    <main
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
      dir="rtl"
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          تسجيل الدخول
        </h2>
        <Form />
      </div>
    </main>
  );
};

export default SigninPage;
