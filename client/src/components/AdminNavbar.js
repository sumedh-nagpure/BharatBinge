

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/BB.png";
export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    async function logoutFunction() {

        localStorage.removeItem("adminLogin");
        navigate(`/`);
    }


    useEffect(() => {
        if (isNavOpen) {

            document.body.style.overflow = "hidden";
        }
        if (!isNavOpen) {

            document.body.style.overflow = "scroll";
        }
        // return () => {
        //     document.body.style.overflow = "scroll"
        // };
    }, [isNavOpen])

    
    let navigate = useNavigate();
    return (


        <div className="px-[30px] flex items-center justify-between border-b border-gray-400 py-8">
            <img
                onClick={() => {
                    document.body.style.overflow = "scroll";
                    navigate(`/admin-login`);
                }}
                src={logo}
                className="cursor-pointer h-10"
            />
            <nav>
                <section className="MOBILE-MENU flex lg:hidden">
                    <div
                        className="HAMBURGER-ICON space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <ul className="flex flex-col items-center justify-between min-h-[100px]">

                           
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
                    </div>
                </section>

                <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">


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
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      background: white;
      z-index: 10000;
      display: flex;
      padding-top: 30vh;
      flex-direction: column;
      justify-content: top;
      align-items: center;
    }
  `}</style>
        </div>

    );
}
