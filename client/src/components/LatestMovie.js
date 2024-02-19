import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function LatestMovie({ latest_movie }) {
  let navigate = useNavigate();
  
  return (
    <>
   
      {latest_movie.length > 0 ? (
        <>
        <Carousel responsive={responsive}>
          {latest_movie.map((latest, index) => {
            return (
              <div
                className={` h-[400px] brightness-50 bg-cover cursor-pointer duration-100 bg-center bg-no-repeat rounded shadow-lg bg-[url(https://image.tmdb.org/t/p/original${
                  latest && latest.backdrop_path
                })]  `}
                onClick={() => {
              
                  window.location.href = `http://localhost:3000/movie/${latest.id}`;
                  // navigate(`/movie/${reco.id}`);
                }}
              ></div>
            );
          })}
        </Carousel></>
      ) : (
        "loading"
      )}
    </>
  );
}

export default LatestMovie;
