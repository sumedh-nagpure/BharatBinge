import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/BB.png";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  let navigate = useNavigate();

  async function logoutFunction() {
    localStorage.removeItem("moviesToken");
    navigate(`/login`);
    //
  }

  async function goToDashboard() {
    navigate(`/dashboard`);
  }

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isNavOpen]);

  return (
    <div className="px-[25px] flex items-center justify-between bg-slate-950 py-3">
      <img
        onClick={() => {
          document.body.style.overflow = "scroll";
          navigate(`/`);
        }}
        src={logo}
        className="cursor-pointer h-10"
      />
      <nav>
        <section className="MOBILE-MENU flex lg:hidden relative">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <ul className="flex flex-col items-start bg-gray-800 rounded-lg p-4 inline-block">
              <button
                onClick={() => {
                  goToDashboard();
                }}
                className="my-2 w-full duration-100 cursor-pointer px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                style={{ whiteSpace: "nowrap" }}
              >
                Go to dashboard
              </button>
              <button
                onClick={() => {
                  logoutFunction();
                }}
                className="my-2 w-full duration-100 cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-2 lg:flex">
          <button
            onClick={() => {
              goToDashboard();
            }}
            className="mx-2 duration-100 cursor-pointer px-8 rounded border-[#E50914] text-[#E50914] border-2 "
          >
            Go to dashboard
          </button>
          <button
            onClick={() => {
              logoutFunction();
            }}
            className="text-white text-xl px-8 duration-100 cursor-pointer mx-2 rounded"
            style={{ backgroundColor: "#E50914" }}
          >
            Logout
          </button>
        </ul>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          top: 64px;
          left: -150px; /* Adjust this value to move the dropdown menu to the left */
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 10000;
          border-bottom-right-radius: 12px;
          border-bottom-left-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>

  );
}
