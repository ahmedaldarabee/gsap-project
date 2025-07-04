import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button"; // Make sure you have this Button component
import { HiCursorClick } from "react-icons/hi";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null); // Added a separate ref for the current video

  // Function to get video source
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Handler for clicking the small video
  const handleMinVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // Handler for when a video has loaded
  const handleVideoLoaded = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  // Effect to hide the loader when all videos are ready
  useEffect(() => {
    if (loadedVideo >= totalVideos) {
      // Changed to check if all videos are loaded
      setIsLoading(false);
    }
  }, [loadedVideo]);

  // GSAP animation for video transition
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          ease: "power1.inOut",
          duration: 1,
          onStart: () => {
            if (nextVideoRef.current) {
              nextVideoRef.current.play();
            }
          },
        });

        // This animation seems to target the wrong element, it should likely fade out the old video
        // For now, it's left as is from your original code.
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex, hasClicked], revertOnUpdate: true }
  );

  // GSAP animation for the scroll-based clip-path effect
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75"
      >
        {/* Videos Container */}
        <div>
          {/* Background Video */}
          <video
            key={`bg-${currentIndex}`} // Add key to re-render on change
            src={getVideoSrc(currentIndex)}
            loop
            muted
            autoPlay
            playsInline // Important for autoplay on mobile
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />

          {/* Upcoming Video (Small Preview) */}
          <div
            onClick={() => {
              handleMinVdClick();
              // add style hidden if clicked
              if (hasClicked) {
                document.querySelector(
                  ".absolute.z-50.left-1\\/2.top-1\\/2.-translate-1\\/2"
                ).style.display = "none";
              }
            }}
            className="absolute z-50 left-1/2 top-1/2 -translate-1/2"
          >
            <HiCursorClick className="text-4xl text-blue-100 animate-pulse" />
          </div>
          <div
            onClick={() => {
              handleMinVdClick();
              document.querySelector(
                ".absolute.z-50.left-1\\/2.top-1\\/2.-translate-1\\/2"
              ).style.display = "none";
            }}
            className="mask-clip-path absolute-center absolute z-50 w-1/2 h-1/2 opacity-0 cursor-pointer overflow-hidden rounded-lg"
          >
            {/* <div
              onClick={handleMinVdClick}
              className="origin-center transition-all duration-500 ease-in hover:scale-110"
            >
               <video
                ref={currentVideoRef}
                key={`thumb-${upcomingVideoIndex}`} // Add key to re-render on change
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                autoPlay
                playsInline
                id="current-video"
                className="size-full origin-center object-cover object-center"
                onLoadedData={handleVideoLoaded}
              /> 
            </div> */}
          </div>

          {/* Primary Transitioning Video (Initially hidden) */}
          <video
            ref={nextVideoRef}
            key={`next-${currentIndex}`} // Add key to ensure it remounts with new src
            src={getVideoSrc(currentIndex)}
            muted
            loop
            playsInline
            id="next-video"
            className="absolute-center invisible absolute z-20 w-48 h-48 sm:w-64 sm:h-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />

          {/* Preload other videos */}
          <div style={{ display: "none" }}>
            <video src={getVideoSrc(1)} onLoadedData={handleVideoLoaded} />
            <video src={getVideoSrc(2)} onLoadedData={handleVideoLoaded} />
            <video src={getVideoSrc(3)} onLoadedData={handleVideoLoaded} />
            <video src={getVideoSrc(4)} onLoadedData={handleVideoLoaded} />
          </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute left-0 top-0 z-40 flex h-full w-full flex-col justify-between p-5">
          <div className="mt-16 sm:mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-xs sm:max-w-64 font-robert-regular text-sm sm:text-base text-blue-100">
              Enter the meta game layer <br /> Unleash the play economy
            </p>
            <Button
              containerClass="!bg-yellow-300 flex-center gap-1"
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
            />
          </div>
          <h1 className="special-font hero-heading self-end text-blue-100">
            G<b>a</b>ming
          </h1>
        </div>
      </div>

      {/* Background Text (Visible after scroll) */}
      <h1 className="special-font hero-heading absolute right-5 bottom-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
