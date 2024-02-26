import React, { useRef, useEffect } from 'react';
export default function MovieVideoDiv() {


    const videoRef = useRef(null);
    useEffect(() => {
        const video = videoRef.current;
        video.loop = true;
    }, []);


    return (
        <div
            className="col-span-5 lg:col-span-2   border   "
            style={{ height: "100%" }}
        >

            <video ref={videoRef} controls height="700px"  >
                <source src="/wave.mp4" type="video/mp4" />
            </video>

        </div>
    );
}