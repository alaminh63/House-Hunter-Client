import React, { useEffect, useRef } from 'react';
import './ParallaxStyle.css'; // Import your CSS file

const ParallaxStyle = () => {
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  const easing = 0.05;
  let startY = 0;
  let endY = 0;
  let raf;

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  const updateScroll = () => {
    startY = lerp(startY, endY, easing);
    galleryRef.current.style.height = `${trackRef.current.clientHeight}px`;
    trackRef.current.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
  };

  const startScroll = () => {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
  };

  const parallax = (card) => {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const { top } = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
  };

  const activateParallax = () => cardsRef.current.forEach(parallax);

  const init = () => {
    activateParallax();
    startScroll();
  };

  useEffect(() => {
    activateParallax();
    startScroll();

    window.addEventListener('load', updateScroll, false);
    window.addEventListener('scroll', init, false);
    window.addEventListener('resize', updateScroll, false);

    return () => {
      window.removeEventListener('load', updateScroll, false);
      window.removeEventListener('scroll', init, false);
      window.removeEventListener('resize', updateScroll, false);
    };
  }, []);

  return (
    <main ref={galleryRef} className='gallery'>
      <div ref={trackRef} className='gallery-track'>
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)} className='card'>
            <div className='card-image-wrapper'>
              <img
                src={
                  index === 0
                    ? 'https://s.yimg.com/ny/api/res/1.2/azcZZF4nHN43ZrAv2mgtpg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyOQ--/https://media.zenfs.com/en/the_week_574/a772f9c498b161443bbfa0dd9897eb13'
                    : 'https://i.pinimg.com/736x/1a/16/2c/1a162ca2f756d8417c6e8cc977bc7fbc.jpg'
                }
                alt={`Image ${index}`}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ParallaxStyle;
