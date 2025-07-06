/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacer: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* text */}
      <div className="capitalize relative mb-8 mt-36 flex items-center gap-5 flex-col">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          {" "}
          welcome to zentry{" "}
        </h2>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext mt-44">
          <p>the game of games begins your life, now you start it!</p>
          <p>Zentry unites every player from countless games and platforms </p>
        </div>
      </div>

      {/* img */}
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path  absolute left-1/2 top-0 z-20 h-[60vh] w-full origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw]">
          <img
            src="img/about.webp"
            alt="main background image"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
