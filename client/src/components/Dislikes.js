import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function Dislikes({
  accountinformation,
  getAccountInformation,
}) {
  // useEffect(() => {
  //   getAccountInformation();
  // }, []);
  let totalitems = accountinformation.dislikes.length;

  async function updateDislikes(movie) {
   
    let token = localStorage.getItem("moviesToken");

    let response = await axios.post(
      `http://localhost:8000/users/updateDislikes`,
      { movie },
      {
        headers: {
          authorization: `token ${token}`,
        },
      }
    );
    if (response) {
     
      if (response.status === 200) {
      
        swal("Deleted ", response.data.message, "success").then((response) => {
          getAccountInformation();
        });
      }
    }
  }
  return (
    <div className="  px-3 my-2 lg:my-0 lg:px-10 h-screen">
      <span className="block text-start text-3xl ">Dislikes </span>
      <div className="grid grid-cols-2 lg:grid-cols-4 my-8 ">
        {accountinformation.dislikes && accountinformation.dislikes.length > 0 ? (
          accountinformation.dislikes.map((like, index) => {
            return (
              <div
                className={`border bg-center bg-no-repeat bg-cover  h-72 bg-[url(https://image.tmdb.org/t/p/original${
                  like && like.movieBackdropPath
                })]  `}
              >
                <div className="flex  justify-between  mt-1 font-semibold text-white ">
                  <span className="text-xs px-2 py-1 rounded-full hover:text-black hover:bg-gray-300 duration-200 cursor-pointer ">
                    {like.movieName}
                  </span>
                  <span
                    onClick={() => {
                      updateDislikes(like);
                    }}
                    className="text-red-500 text-2xl hover:text-3xl duration-100  mr-1 mt-1 cursor-pointer "
                  >
                    <ion-icon name="close-circle-outline"></ion-icon>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-start block  my-8 text-gray-200">
            Nothing in the dislikes
          </span>
        )}
      </div>
    </div>
  );
}
