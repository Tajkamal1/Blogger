import React, { useRef } from 'react';
import './SmokeEffect.css';

const SmokeEffect = () => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    // Redirect to '/Home' when the video ends
    window.location.href = '/Home';
  };

  return (
    <section>
      <video ref={videoRef} src={`${process.env.PUBLIC_URL}/smoke.mp4`} autoPlay muted onEnded={handleVideoEnd}></video>
      <h1>
        <span>B</span>
        <span>L</span>
        <span>O</span>
        <span>G</span>
        <span>G</span>
        <span>E</span>
        <span>R</span>
        <span>A</span>
        <span>P</span>
        <span>P</span>
        <br></br>
      </h1>
    </section>
  );
};

export default SmokeEffect;
