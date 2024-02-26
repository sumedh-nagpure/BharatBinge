
import { useRef, useEffect } from "react";
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