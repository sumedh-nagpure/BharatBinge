import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import Navbar from "./Navbar";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function UpcomingMovies({ upcoming_movies }) {
  return (
    <>
      <div className=" text-start  my-5 mx-5 ">
        <span className="mx-3 md:mx-3 capitalize font-semibold  text-3xl  block ">
          Upcoming Movies
        </span>
        <span className=" mt-3 block mx-2 md:mx-3  ">
          {/* Movies similar to - {title} */}
        </span>
        <div className="py-3     ">
          <Carousel responsive={responsive}>
            {upcoming_movies.map((reco, index) => {
              return (
                <>
                <div
                  className={` h-72 hover:brightness-75 mx-2  border  bg-cover cursor-pointer  duration-100  bg-center bg-no-repeat rounded shadow-lg bg-[url(https://image.tmdb.org/t/p/original${reco && reco.backdrop_path
                    })]  `}
                  onClick={() => {

                    window.location.href = `http://localhost:3000/movie/${reco.id}`;
                    // navigate(`/movie/${reco.id}`);
                  }}
                >
                </div>
                <div className="flex  justify-between px-2 mt-1 font-semibold text-white ">
                    <span className="text-xl px-2 py-1 rounded hover:text-black hover:bg-red-600">
                      {reco.original_title}
                    </span>
                  </div>
                </>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
}


export default UpcomingMovies;
