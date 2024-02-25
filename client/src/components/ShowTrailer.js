
import React, { Component } from "react";
import { useRef, useEffect } from "react";
import axios from "axios";
import Recommendations from "./Recommendations";
import MovieVideoDiv from "./MovieVideoDiv";
import Reviews from "./Reviews";
import NavbarLogout from "./NavbarLogout";
import NavbarLogin from "./NavbarLogin";
import Loader from "./Loader";
import MoviePosterDiv from "./MoviePosterDiv";
import MovieInformationDiv from "./MovieInformationDiv";
import { ThumbsUp, ThumbsDown, BookmarkSimple,Play } from "@phosphor-icons/react";
export default function ShowTrailer() {

  const videoRef = useRef(null);
  useEffect(() => {
      const video = videoRef.current;
      video.loop = true;
      video.play().catch(error => {
          console.error('Video playback error:', error);
      });
  }, []);



  return (
    <div>
    
        <div>
         
          

              <video ref={videoRef} controls height="100%"  >
                <source src="/wave.mp4" type="video/mp4" />
              </video>
        
    


        </div>
 
    </div>
  );

};