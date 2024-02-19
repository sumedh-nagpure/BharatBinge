import React from "react";
export default function MoviePosterDiv({ backdrop_path }) {
   
  return (
    <div
      className="col-span-5 lg:col-span-2   border   "
      style={{ height: "100%" }}
    >
      <img
        style={{ height: "100%" }}
        className="  w-fit duration-300 ease-in-out rounded"
        src={`https://image.tmdb.org/t/p/original${
            backdrop_path !== undefined && backdrop_path
        }`}
      />
    </div>
  );
}
