import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Likes({ accountinformation, getAccountInformation }) {
  let navigate = useNavigate();

  async function goToMovie(id) {
    navigate(`/movie/${id}`);
  }

  async function updateLikes(movie) {
    let token = localStorage.getItem("moviesToken");

    let response = await axios.post(
      `http://localhost:8000/users/updateLikes`,
      { movie },
      {
        headers: {
          authorization: `token ${token}`,
        },
      }
    );
    
    if (response && response.status === 200) {
      swal("Deleted ", response.data.message, "success").then((response) => {
        getAccountInformation();
      });
    }
  }

  return (
    <div className="px-3 my-2 lg:my-0 lg:px-10 h-screen">
      <span className="block text-start text-3xl">Likes </span>
      <div className="grid grid-cols-2 lg:grid-cols-4 my-8">
        {accountinformation.likes && accountinformation.likes.length > 0 ? (
          accountinformation.likes.map((like, index) => {
            return (
              <div
                onClick={() => {
                  goToMovie(like.originalId);
                }}
                className={`border bg-center bg-no-repeat bg-cover h-72 bg-[url(https://image.tmdb.org/t/p/original${
                  like && like.movieBackdropPath
                })]`}
              >
                <div className="flex justify-between mt-1 font-semibold text-white">
                  <span className="text-xs px-2 py-1 rounded-full hover:text-black hover:bg-gray-300 duration-200 cursor-pointer">
                    {like.movieName}
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling to the outer div
                      updateLikes(like);
                    }}
                    className="text-red-500 text-2xl hover:text-3xl duration-100 mr-1 mt-1 cursor-pointer"
                  >
                    <ion-icon name="close-circle-outline"></ion-icon>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-start block my-8 text-gray-200">
            Nothing in the likes
          </span>
        )}
      </div>
    </div>
  );
}
