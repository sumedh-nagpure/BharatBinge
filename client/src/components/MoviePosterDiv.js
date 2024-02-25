import React from "react";

export default function MoviePosterDiv({ backdrop_path }) {
  return (
    <div
      className="col-span-5 lg:col-span-2 px-3 bg-slate-950"
      style={{ height: "100%", width: "100%", maxHeight: "100%" }}
    >
      <img
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
        className="w-full h-full duration-300 ease-in-out rounded"
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt="Movie Poster"
      />
    </div>
  );
}
