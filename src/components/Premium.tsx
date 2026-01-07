'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import RightCoin from '../assets/Right-coin.png';
import LeftCoin from '../assets/Left-coin.png';
import FrontCoin from '../assets/Front-coin.png';
import DownCoin from '../assets/down-coin.png';

const Premium = () => {
  const premiumRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (premiumRef.current) {
      observer.observe(premiumRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Styles remain the same...
  const sectionStyle: CSSProperties = {
    position: 'relative',
    minHeight: '120vh',
    background: '#000000',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem 8rem',
    overflow: 'hidden',
  };

  const curveBottomStyle: CSSProperties = {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '120px',
    background: '#ffffff',
    borderTopLeftRadius: '50% 50%',
    borderTopRightRadius: '50% 50%',
    zIndex: 0,
  };

  const patternStyle: CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: 0,
    width: '100%',
    height: '100px',
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.02) 20px,
      rgba(255, 255, 255, 0.02) 40px
    )`,
    zIndex: 0,
  };

  const coinBaseStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 1,
  };

  const coinLeftTopStyle: CSSProperties = {
    ...coinBaseStyle,
    width: '120px',
    height: '120px',
    top: '12%',
    left: '8%',
    opacity: 0,
    transform: 'translateX(-200px)',
    transition: 'all 1s ease-out',
  };

  const coinLeftTopVisibleStyle: CSSProperties = {
    ...coinLeftTopStyle,
    opacity: 1,
    transform: 'translateX(0)',
  };

  const coinRightTopStyle: CSSProperties = {
    ...coinBaseStyle,
    width: '180px',
    height: '180px',
    top: '8%',
    right: '5%',
    opacity: 0,
    transform: 'translateX(200px)',
    transition: 'all 1s ease-out',
  };

  const coinRightTopVisibleStyle: CSSProperties = {
    ...coinRightTopStyle,
    opacity: 1,
    transform: 'translateX(0)',
  };

  const coinBottomStyle: CSSProperties = {
    ...coinBaseStyle,
    width: '80px',
    height: '80px',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  };

  const coinImageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const coinImageRightStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'relative',
    right: '-700%',
  };

  const logoStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    marginTop: '2rem',
    zIndex: 1,
  };

  const bookKitStyle: CSSProperties = {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 500,
    marginBottom: '0.5rem',
    letterSpacing: '0.15em',
    color: '#ffffff',
  };

  const goldTextStyle: CSSProperties = {
    fontSize: 'clamp(4rem, 10vw, 7rem)',
    fontWeight: 900,
    background: 'linear-gradient(145deg, #f4d03f 0%, #f0da89ff 50%, #eddda4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.05em',
    margin: 0,
    lineHeight: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const coinInOStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '0.8em',
    height: '0.8em',
    margin: '0 0.05em',
  };

  const coinInOImageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const comingSoonStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    fontWeight: 700,
    background: 'linear-gradient(145deg, #f4d03f 0%, #d4af37 50%, #c9a227 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.2em',
    marginTop: '1rem',
    marginBottom: '2rem',
    zIndex: 1,
    textTransform: 'uppercase',
  };

  const subtitleStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
    color: '#d4af37',
    marginBottom: '3rem',
    marginTop: '1rem',
    zIndex: 1,
    fontWeight: 400,
  };

  const benefitsStyle: CSSProperties = {
    maxWidth: '900px',
    width: '100%',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const benefitsTitleStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    color: '#ffffff',
    marginBottom: '2.5rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
  };

  const benefitsGridStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    marginBottom: '3rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };

  const benefitItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    padding: '0',
    transition: 'all 0.3s ease',
    maxWidth: '350px',
  };

  const benefitIconContainerStyle: CSSProperties = {
    width: '60px',
    height: '60px',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '2px solid rgba(212, 175, 55, 0.3)',
  };

  const benefitIconStyle: CSSProperties = {
    fontSize: '2rem',
  };

  const benefitTextContainerStyle: CSSProperties = {
    flex: 1,
  };

  const benefitTitleStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#ffffffff',
    marginBottom: '0.3rem',
  };

  const benefitDescStyle: CSSProperties = {
    fontSize: '0.9rem',
    color: '#b0b0b0',
    lineHeight: 1.4,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateX(-50%) translateY(0) rotate(0deg);
            }
            50% {
              transform: translateX(-50%) translateY(-10px) rotate(3deg);
            }
          }

          .coin-bottom {
            animation: float 4s ease-in-out infinite;
          }

          .benefit-item:hover {
            transform: translateX(5px);
          }

          @media (max-width: 768px) {
            .coin-left-top {
              width: 80px !important;
              height: 80px !important;
            }
            .coin-right-top {
              width: 120px !important;
              height: 120px !important;
            }
            .coin-bottom {
              width: 60px !important;
              height: 60px !important;
            }
          }
        `
      }} />

      <section style={sectionStyle} ref={premiumRef}>
        <div style={patternStyle}></div>
        <div style={curveBottomStyle}></div>

        {/* Coins only animate when isVisible is true */}
        <div 
          className="coin-left-top" 
          style={isVisible ? coinLeftTopVisibleStyle : coinLeftTopStyle}
        >
          <img src={LeftCoin} alt="Left coin" style={coinImageStyle} />
        </div>
        <div 
          className="coin-right-top" 
          style={isVisible ? coinRightTopVisibleStyle : coinRightTopStyle}
        >
          <img src={RightCoin} alt="Right coin" style={coinImageStyle} />
        </div>
        <div className="coin-bottom" style={coinBottomStyle}>
          <img src={DownCoin} alt="Down coin" style={coinImageRightStyle} />
        </div>

        <div style={logoStyle}>
          <div style={bookKitStyle}>Bookkit</div>
          <h1 style={goldTextStyle}>
            G
            <span style={coinInOStyle}>
              <img src={FrontCoin} alt="Gold coin" style={coinInOImageStyle} />
            </span>
            LD
          </h1>
        </div>

        <div style={comingSoonStyle}>Coming Soon</div>

        <div style={subtitleStyle}>
          <div>India's Top Savings</div>
          <div>Program for Book Lovers</div>
        </div>

        <div style={benefitsStyle}>
          <h3 style={benefitsTitleStyle}>★ GOLD BENEFITS ★</h3>
          <div style={benefitsGridStyle}>
            <div className="benefit-item" style={benefitItemStyle}>
              <div style={benefitIconContainerStyle}>
                <span style={benefitIconStyle}>🎫</span>
              </div>
              <div style={benefitTextContainerStyle}>
                <div style={benefitTitleStyle}>Free Delivery</div>
                <div style={benefitDescStyle}>At all within 10 km</div>
              </div>
            </div>
            <div className="benefit-item" style={benefitItemStyle}>
              <div style={benefitIconContainerStyle}>
                <span style={benefitIconStyle}>🛵</span>
              </div>
              <div style={benefitTextContainerStyle}>
                <div style={benefitTitleStyle}>Up to 30% extra off</div>
                <div style={benefitDescStyle}>At Uploading 10 Books in a Month</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Premium;
