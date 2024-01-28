import React, { useEffect } from "react";
import Houses from "../../components/Houses/Houses";
import Banner from "../../components/Banner/Banner";
import Swiper from "swiper";
import "swiper/css/bundle";

const Home = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      effect: "cards",
      grabCursor: true,
      initialSlide: 2,
      speed: 500,
      loop: true,
      rotate: true,
      mousewheel: {
        invert: false,
      },
    });
  }, []);
  return (
    <div>
      <Banner />
      <Houses />
    </div>
  );
};

export default Home;
