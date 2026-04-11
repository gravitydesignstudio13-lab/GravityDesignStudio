import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        
        {/* 404 Number */}
        <h1 className="text-[120px] font-bold text-slate-900 leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mt-4">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-slate-500 mt-3 leading-7">
          The page you are looking for doesn’t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <button
            onClick={() => nav(-1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => nav("/")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f1720] text-white hover:bg-[#1d2939] transition"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>

        {/* Footer text */}
        <p className="text-xs text-slate-400 mt-10">
          Gravity Design Studio • Interior & Architecture
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;