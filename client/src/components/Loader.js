import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
export default function Loader({ loggedin, bg, size, msg }) {
  let backgroundcolor;
  if (bg === undefined || bg === null || bg === "") {
    backgroundcolor = "bg-gray-50";
  } else {
    backgroundcolor = bg;
  }
  return (
    <div className={`h-screen  ${backgroundcolor}`}>
      <div className=" h-[500px] flex items-center justify-center ">
        <ClipLoader
          color="red"
          loading={true}
          className="block mx-4 "
          size={size || 150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <br />
        {(msg !== null || (msg !== undefined && msg !== "")) && (
          <span className="text-[#E50914] block ">{msg}</span>
        )}
      </div>
    </div>
  );
}
