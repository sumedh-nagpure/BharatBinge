import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/BB.png"
export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className="flex justify-between px-6 py-3 bg-slate-950">
      <div className="">
        <img onClick={() => {
            navigate(`/`);
          }} src = {logo} className="cursor-pointer h-12"/>
      </div>
      <div className="md:hidden">
        <span className="text-[#E50914] text-4xl "><ion-icon name="list-outline"></ion-icon></span>
      </div>
      
    </div>
  );
}
