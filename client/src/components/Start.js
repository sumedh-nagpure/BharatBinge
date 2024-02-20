import React, { useRef, useEffect, useState } from 'react';

const Start = () => {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true); // Initially set to true to start immediately

  useEffect(() => {
    const video = videoRef.current;
    video.loop = false; // Set loop to false to play video only once

    // Set the playback rate to make the video play fast forward
    video.playbackRate = 2;

    // Play the video
    video.play().catch(error => {
      console.error('Video playback error:', error);
    });

    // After 2 seconds, navigate to the next page
    const timeout = setTimeout(() => {
      window.location.href = '/homepage'; // Navigate to homepage
    }, 2000); // Adjust the duration of the video (in milliseconds) here

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay>
        <source src="/Theater.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Start;
