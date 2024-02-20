import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
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

function LatestMovie({ latestMovies }) {
  return (
    <>
      <div className="text-start my-5 mx-5">
        <span className="mx-3 md:mx-3 capitalize font-semibold text-3xl block">
          Latest Movies
        </span>
        <span className="mt-3 block mx-2 md:mx-3">
          {/* Additional information */}
        </span>
        <div className="py-3">
          <Carousel responsive={responsive}>
            {latestMovies.map((latest, index) => {
              return (
                <div
                  key={index}
                  className={`h-72 hover:brightness-75 mx-2 border bg-cover cursor-pointer duration-100 bg-center bg-no-repeat rounded shadow-lg`}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${
                      latest && latest.backdrop_path
                    })`,
                  }}
                  onClick={() => {
                    window.location.href = `http://localhost:3000/movie/${latest.id}`;
                  }}
                ></div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default LatestMovie;
