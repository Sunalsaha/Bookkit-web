'use client';

import { useEffect, useRef } from 'react';
import videoSrc from "../assets/video.mp4";
import playstoreImg from "../assets/Playstore.png";
import logoImg from "../assets/bookKit-logo.png";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Mistrully';
            src: local('Mistrully'), url('./fonts/Mistrully-Regular.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }

          /* ===== HERO SECTION ===== */
          .hero-section {
            width: 100vw;
            height: 100vh;
            position: relative;
            overflow: hidden;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-video-youtube {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100vw;
            height: 56.25vw;
            min-height: 100vh;
            min-width: 177.77vh;
            opacity: 1;
            animation: videoZoom 20s ease-in-out infinite alternate;
          }

          @keyframes videoZoom {
            0% { transform: translate(-50%, -50%) scale(1); }
            100% { transform: translate(-50%, -50%) scale(1.1); }
          }

          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(226, 55, 68, 0.1) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(226, 55, 68, 0.1) 100%);
            z-index: 1;
            animation: overlayPulse 8s ease-in-out infinite;
          }

          @keyframes overlayPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          .hero-content {
            position: relative;
            text-align: center;
            z-index: 2;
            width: 90%;
            max-width: 900px;
            padding: 2rem 1.25rem;
          }

          .hero-logo {
            width: auto;
            height: 120px;
            margin: 0 auto 1.5rem;
            display: block;
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.8))
                    drop-shadow(0 5px 15px rgba(226, 55, 68, 0.6))
                    drop-shadow(0 0 40px rgba(255, 255, 255, 0.3));
            animation: logoFloat 3s ease-in-out infinite, fadeInScale 1.2s ease-out;
          }

          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }

          @keyframes fadeInScale {
            0% { opacity: 0; transform: translateY(30px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .hero-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1.25rem;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9),
                         0 0 20px rgba(226, 55, 68, 0.5);
            animation: slideInLeft 1s ease-out 0.3s both;
          }

          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .hero-content p {
            font-size: 1rem;
            color: #ffffff;
            max-width: 600px;
            margin: 0 auto 2rem;
            font-weight: 500;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
            animation: slideInRight 1s ease-out 0.6s both;
            line-height: 1.6;
          }

          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .playstore-badge {
            display: inline-block;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: fadeInUp 1s ease-out 0.9s both;
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .playstore-badge img {
            height: 60px;
            width: auto;
            filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));
            transition: all 0.4s ease;
          }

          .playstore-badge:hover {
            transform: translateY(-8px) scale(1.05);
          }

          .playstore-badge:hover img {
            filter: drop-shadow(0 15px 35px rgba(226, 55, 68, 0.6))
                    drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
          }

          .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            color: #ffffff;
            animation: bounce 2s infinite, glow 2s ease-in-out infinite alternate;
            z-index: 2;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .scroll-indicator:hover {
            transform: translateX(-50%) scale(1.2);
            color: #e23744;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-15px); }
            60% { transform: translateX(-50%) translateY(-8px); }
          }

          @keyframes glow {
            0% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e23744; }
            100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e23744, 0 0 40px #e23744; }
          }

          /* Floating particles */
          .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(226, 55, 68, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(226, 55, 68, 0.8);
          }

          .particle:nth-child(1) { left: 10%; animation: float 6s ease-in-out infinite; }
          .particle:nth-child(2) { left: 20%; animation: float 8s ease-in-out infinite 1s; }
          .particle:nth-child(3) { left: 30%; animation: float 7s ease-in-out infinite 2s; }
          .particle:nth-child(4) { left: 40%; animation: float 9s ease-in-out infinite 1.5s; }
          .particle:nth-child(5) { left: 50%; animation: float 6.5s ease-in-out infinite 0.5s; }
          .particle:nth-child(6) { left: 60%; animation: float 8.5s ease-in-out infinite 2.5s; }
          .particle:nth-child(7) { left: 70%; animation: float 7.5s ease-in-out infinite 1s; }
          .particle:nth-child(8) { left: 80%; animation: float 9.5s ease-in-out infinite 3s; }
          .particle:nth-child(9) { left: 90%; animation: float 6s ease-in-out infinite 0.8s; }

          @keyframes float {
            0%, 100% { 
              transform: translateY(100vh) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
              transform: translateY(90vh) scale(1);
            }
            90% {
              opacity: 1;
              transform: translateY(10vh) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(0) scale(0);
            }
          }

          /* ===== RESPONSIVE HERO ===== */
          @media (max-width: 639px) {
            .hero-logo { 
              height: 80px; 
            }
            .hero-content h1 { 
              font-size: 2rem; 
            }
            .hero-content p {
              font-size: 0.9rem;
            }
            .playstore-badge img {
              height: 50px;
            }
          }

          @media (min-width: 640px) {
            .hero-logo { 
              height: 100px; 
            }
            .hero-content h1 { 
              font-size: 3rem; 
            }
          }

          @media (min-width: 1024px) {
            .hero-logo { 
              height: 150px; 
            }
            .hero-content h1 { 
              font-size: 5rem; 
            }
            .playstore-badge img {
              height: 70px;
            }
          }
        `
      }} />

      <section className="hero-section" ref={heroRef}>
        <video
          className="hero-video-youtube"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="video-overlay"></div>

        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="hero-content">
          <img src={logoImg} alt="BookKit Logo" className="hero-logo" />
          <h1>Old Books, New Opportunities</h1>
          <p>
            For years, we've enabled book lovers to discover amazing reads, delivered right to their
            doorstep
          </p>
          <a href="#" className="playstore-badge">
            <img src={playstoreImg} alt="Get it on Google Play" />
          </a>
        </div>

        <div className="scroll-indicator">↓</div>
      </section>
    </>
  );
};

export default Hero;
