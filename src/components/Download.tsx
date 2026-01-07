'use client';

import { useEffect, useRef, useState } from 'react';
import PhoneQR from '../assets/Phone-QR.png';
import Playstore from '../assets/Playstore.png';

const Download = () => {
  const downloadRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add('visible');
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (downloadRef.current) {
      observer.observe(downloadRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .download-section {
          padding: 60px 20px 68px 20px;
          background: #ffffff;
          width: 100%;
          overflow-x: hidden;
        }

        .download-outer-box {
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #ffffff 0%, #e3f0ff 100%);
          border-radius: 32px;
          overflow: visible;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
          border: 5px solid #80a7faba;
          width: 100%;
        }

        .download-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 60px;
          padding: 50px 40px 0px 80px;
          width: 100%;
        }

        .download-content {
          flex: 1;
          max-width: 500px;
          min-width: 0;
          padding-bottom: 50px;
        }

        .download-content h2 {
          font-size: clamp(24px, 5vw, 48px);
          font-weight: 700;
          color: #000000;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .download-content p {
          font-size: clamp(14px, 2vw, 18px);
          color: #5a5a5a;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .download-content p br {
          display: block;
        }

        .store-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .store-btn {
          display: inline-block;
          cursor: pointer;
          min-height: 44px;
          min-width: 44px;
        }

        .store-btn img {
          height: clamp(42px, 6vw, 54px);
          width: auto;
          display: block;
          max-width: 100%;
        }

        .phone-mockup {
          position: relative;
          flex-shrink: 0;
          width: 420px;
          height: 500px;
          max-width: 100%;
          margin-bottom: -27px;
          opacity: 0;
          transform: translateY(100px);
        }

        .download-section.visible .phone-mockup {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .phone-mockup img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* Extra Large Desktop - 1920px+ */
        @media (min-width: 1921px) {
          .download-outer-box {
            max-width: 1400px;
          }

          .download-container {
            padding: 60px 50px 0px 100px;
            gap: 80px;
          }

          .phone-mockup {
            width: 460px;
            height: 540px;
            margin-bottom: -30px;
          }
        }

        /* Large Desktop - 1440-1920px */
        @media (max-width: 1920px) and (min-width: 1441px) {
          .download-container {
            gap: 70px;
            padding: 55px 45px 0px 90px;
          }

          .phone-mockup {
            width: 440px;
            height: 520px;
            margin-bottom: -28px;
          }
        }

        /* Desktop Large - 1200-1440px */
        @media (max-width: 1440px) and (min-width: 1201px) {
          .download-container {
            padding: 50px 40px 0px 70px;
            gap: 55px;
          }

          .phone-mockup {
            width: 400px;
            height: 480px;
            margin-bottom: -27px;
          }
        }

        /* Desktop - 1024-1200px */
        @media (max-width: 1200px) and (min-width: 1025px) {
          .download-section {
            padding: 60px 20px 66px 20px;
          }

          .download-outer-box {
            max-width: 1000px;
          }

          .download-container {
            padding: 45px 40px 0px 60px;
            gap: 45px;
          }

          .download-content {
            padding-bottom: 45px;
            max-width: 450px;
          }

          .phone-mockup {
            width: 360px;
            height: 440px;
            margin-bottom: -26px;
          }
        }

        /* Laptop - 900-1024px */
        @media (max-width: 1024px) and (min-width: 901px) {
          .download-section {
            padding: 60px 20px 64px 20px;
          }

          .download-outer-box {
            max-width: 920px;
          }

          .download-container {
            padding: 45px 35px 0px 50px;
            gap: 40px;
          }

          .download-content {
            padding-bottom: 45px;
            max-width: 420px;
          }

          .phone-mockup {
            width: 340px;
            height: 420px;
            margin-bottom: -25px;
          }
        }

        /* Tablet Landscape - 768-900px */
        @media (max-width: 900px) and (min-width: 769px) {
          .download-section {
            padding: 60px 20px 62px 20px;
          }

          .download-outer-box {
            border-radius: 28px;
            max-width: 800px;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 45px 35px 0px 35px;
            gap: 35px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .store-buttons {
            justify-content: center;
          }

          .phone-mockup {
            width: 340px;
            height: 420px;
            margin-bottom: -24px;
          }
        }

        /* Tablet Portrait - 601-768px */
        @media (max-width: 768px) and (min-width: 601px) {
          .download-section {
            padding: 50px 18px 58px 18px;
          }

          .download-outer-box {
            border-radius: 26px;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 40px 32px 0px 32px;
            gap: 32px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .store-buttons {
            justify-content: center;
          }

          .phone-mockup {
            width: 320px;
            height: 400px;
            margin-bottom: -22px;
          }
        }

        /* Mobile Landscape - 481-600px */
        @media (max-width: 600px) and (min-width: 481px) {
          .download-section {
            padding: 50px 16px 52px 16px;
          }

          .download-outer-box {
            border-radius: 24px;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 38px 28px 0px 28px;
            gap: 30px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .download-content p br {
            display: none;
          }

          .store-buttons {
            justify-content: center;
          }

          .phone-mockup {
            width: 300px;
            height: 380px;
            margin-bottom: -20px;
          }
        }

        /* Mobile Portrait - 376-480px */
        @media (max-width: 480px) and (min-width: 376px) {
          .download-section {
            padding: 45px 14px 48px 14px;
          }

          .download-outer-box {
            border-radius: 22px;
            border: 4px solid #77a2ffff;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 32px 22px 0px 22px;
            gap: 26px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .download-content p {
            margin-bottom: 24px;
          }

          .download-content p br {
            display: none;
          }

          .store-buttons {
            justify-content: center;
            gap: 12px;
          }

          .phone-mockup {
            width: 270px;
            height: 350px;
            margin-bottom: -18px;
          }
        }

        /* Mobile Small - 321-375px */
        @media (max-width: 375px) and (min-width: 321px) {
          .download-section {
            padding: 40px 12px 42px 12px;
          }

          .download-outer-box {
            border-radius: 20px;
            border: 4px solid #77a2ffff;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 28px 18px 0px 18px;
            gap: 22px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .download-content h2 {
            margin-bottom: 14px;
          }

          .download-content p {
            margin-bottom: 22px;
          }

          .download-content p br {
            display: none;
          }

          .store-buttons {
            justify-content: center;
            gap: 10px;
          }

          .phone-mockup {
            width: 250px;
            height: 330px;
            margin-bottom: -16px;
          }
        }

        /* Mobile Extra Small - 280-320px */
        @media (max-width: 320px) {
          .download-section {
            padding: 35px 10px 38px 10px;
          }

          .download-outer-box {
            border-radius: 18px;
            border: 3px solid #77a2ffff;
          }

          .download-container {
            flex-direction: column;
            align-items: center;
            padding: 24px 14px 0px 14px;
            gap: 20px;
          }

          .download-content {
            max-width: 100%;
            text-align: center;
            padding-bottom: 0;
          }

          .download-content h2 {
            margin-bottom: 12px;
          }

          .download-content p {
            margin-bottom: 20px;
          }

          .download-content p br {
            display: none;
          }

          .store-buttons {
            justify-content: center;
            gap: 10px;
          }

          .phone-mockup {
            width: 230px;
            height: 310px;
            margin-bottom: -14px;
          }
        }

        /* Orientation handling for better tablet experience */
        @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
          .download-section {
            padding: 40px 20px 45px 20px;
          }

          .download-container {
            gap: 30px;
          }

          .phone-mockup {
            width: 280px;
            height: 360px;
            margin-bottom: -20px;
          }
        }
      `}</style>

      <section className="download-section" ref={downloadRef}>
        <div className="download-outer-box">
          <div className="download-container">
            <div className="download-content">
              <h2>Download the app now!</h2>
              <p>
                Experience seamless online ordering
                <br />
                only on the ExBook app
              </p>

              <div className="store-buttons">
                <a href="#" className="store-btn" aria-label="Download on Google Play">
                  <img 
                    src={Playstore} 
                    alt="Get it on Google Play"
                  />
                </a>
              </div>
            </div>

            <div className="phone-mockup">
              <img 
                src={PhoneQR} 
                alt="ExBook App"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Download;
