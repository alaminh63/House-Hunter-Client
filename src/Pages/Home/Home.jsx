import React, { useEffect } from "react";
import Houses from "./Houses/Houses";
import "./Home.css";
import "./Home2.css";
import Banner from "./Banner/Banner";
import Swiper from "swiper";
import "swiper/css/bundle";
import ParallaxStyle from "../../components/HomePage/ParallaxStyle";

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
      <customStyle>
        <section>
          <div class="content">
            <div class="info">
              <p>
                Join us for a fantastic{" "}
                <span class="movie-night">movie night</span> filled with
                popcorn, laughter, and great company! Whether you're a fan of
                thrilling action, heartwarming dramas, or side-splitting
                comedies, we've got a film lineup to cater to all tastes. Save
                the date and bring your favorite snacks to make it a memorable
                evening.
              </p>
              <button class="btn">Join</button>
            </div>
            <div class="swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <span>8.5</span>
                  <h2>The Queen's Gambit</h2>
                </div>

                <div class="swiper-slide">
                  <span>9.5</span>
                  <h2>Breaking Bad</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.1</span>
                  <h2>Wednesday</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.7</span>
                  <h2>Stranger Things</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.6</span>
                  <h2>Anne with an E</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.9</span>
                  <h2>Friends</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.6</span>
                  <h2>The Crown</h2>
                </div>

                <div class="swiper-slide">
                  <span>8.7</span>
                  <h2>House M.D.</h2>
                </div>

                <div class="swiper-slide">
                  <span>9.2</span>
                  <h2>Game of Thrones</h2>
                </div>
              </div>
            </div>
          </div>

          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
      </customStyle>
      <ParallaxStyle/>
    </div>
  );
};

export default Home;
