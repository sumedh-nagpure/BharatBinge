import React from "react";
import { useParams } from "react-router-dom";

export default function VideoPage() {
  let { movieId } = useParams();

  return (
    <div className="video-page-container">
      <h1>Video Page for Movie ID: {movieId}</h1>
      <div className="video-player">
        <video controls>
        <source src="/wave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
