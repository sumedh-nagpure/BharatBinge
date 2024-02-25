import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reviews({reviews}) {
    const [showReviews , setShowReviews] = useState(false)

    return (
        <div className={` text-start text-white bg-slate-950  px-3  mx-0 `}>
        <div className="flex justify-between py-5 items-center duration-500">
          <span className="mx-3 md:mx-3 capitalize font-semibold  text-3xl  block">
            User Reviews 
          </span>
          <span
            className="cursor-pointer duration-300 text-3xl md:text-5xl "
            onClick={() => {
              setShowReviews(!showReviews);
            }}
          >
            <ion-icon
              name={`${
                showReviews ? "chevron-up-outline" : "chevron-down-outline"
              }`}
            ></ion-icon>
          </span>
        </div>
        {showReviews && (
          <div className="  duration-500 ease-in   px-2 md:px-8 w-full md:w-5/6 mx-auto ">
            {reviews.map((review) => {
              return (
                <>
                  {" "}
                  <div className="text-base border-b pb-3  border-gray-900   mt-3 md:mt-8 capitalize">
                    <span className="block tracking-wider mb-5 leading-relaxed   	">
                      {review.content}
                    </span>
                    <span className="block my-3  text-lg   ">
                      {review.author}
                    </span>
                    <span className="block my-3  text-sm  ">
                      {review.created_at}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    )
}