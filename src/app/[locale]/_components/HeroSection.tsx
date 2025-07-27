import React from "react";
import bgImage from "../../../../public/images/16fb6ac02ec32d408b1e2a37b4a78c241610b23b.jpg";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className="relative bg-cover  bg-center   h-screen  bg-no-repeat 
    "
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
    </section>
  );
};

export default HeroSection;
