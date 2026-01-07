'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { DollarSign, BookOpen, RefreshCw, Heart, Sprout, Users } from 'lucide-react';

interface CardData {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const Offerings: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isLockedRef = useRef<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const cardData: CardData[] = [
    { 
      icon: <DollarSign size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'Sell Your Old Books', 
      desc: 'Turn your unused books into cash with just a few taps' 
    },
    { 
      icon: <BookOpen size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'Buy Used Books', 
      desc: 'Discover quality pre-loved books at affordable prices' 
    },
    { 
      icon: <RefreshCw size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'All-in-One Platform', 
      desc: 'Buy, sell, and donate books seamlessly in a single app' 
    },
    { 
      icon: <Heart size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'Donate Books', 
      desc: 'Give back to the community by donating books to those in need' 
    },
    { 
      icon: <Sprout size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'Sustainable Reading', 
      desc: 'Help the environment by giving books a second life' 
    },
    { 
      icon: <Users size={isMobile ? 64 : 72} strokeWidth={1.5} />, 
      title: 'Connect Locally', 
      desc: 'Meet fellow book lovers and exchange books in your area' 
    },
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let accumulatedDelta: number = 0;
    const SCROLL_THRESHOLD = isMobile ? 30 : 50;

    const handleWheel = (e: WheelEvent): void => {
      const section = sectionRef.current;
      if (!section) return;

      const rect: DOMRect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionInView = rect.top <= vh * 0.2 && rect.bottom >= vh * 0.8;

      if (!sectionInView) {
        isLockedRef.current = false;
        accumulatedDelta = 0;
        setProgress(0);
        return;
      }

      const isAtFirstCard = currentIndex === 0;
      const isAtLastCard = currentIndex === cardData.length - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((isAtFirstCard && scrollingUp) || (isAtLastCard && scrollingDown)) {
        isLockedRef.current = false;
        accumulatedDelta = 0;
        setProgress(0);
        return;
      }

      e.preventDefault();
      isLockedRef.current = true;

      accumulatedDelta += e.deltaY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const progressValue = Math.min(Math.max(accumulatedDelta / SCROLL_THRESHOLD, -1), 1);
      setProgress(progressValue);

      scrollTimeoutRef.current = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) >= SCROLL_THRESHOLD) {
          const direction: number = accumulatedDelta > 0 ? 1 : -1;

          setCurrentIndex((prev: number) => {
            const newIndex: number = prev + direction;
            if (newIndex < 0) {
              accumulatedDelta = 0;
              setProgress(0);
              return 0;
            }
            if (newIndex >= cardData.length) {
              accumulatedDelta = 0;
              setProgress(0);
              return cardData.length - 1;
            }
            accumulatedDelta = 0;
            setProgress(0);
            return newIndex;
          });
        } else {
          accumulatedDelta = 0;
          setProgress(0);
        }
      }, 30);
    };

    // Touch handlers
    let touchStartY: number = 0;
    let touchDelta: number = 0;

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionInView = rect.top <= vh * 0.2 && rect.bottom >= vh * 0.8;

      if (!sectionInView) return;

      const touchY = e.touches[0].clientY;
      touchDelta = touchStartY - touchY;

      const isAtFirstCard = currentIndex === 0;
      const isAtLastCard = currentIndex === cardData.length - 1;
      const swipingDown = touchDelta < 0;
      const swipingUp = touchDelta > 0;

      if ((isAtFirstCard && swipingDown) || (isAtLastCard && swipingUp)) {
        return;
      }

      if (sectionInView) e.preventDefault();
    };

    const handleTouchEnd = (): void => {
      if (Math.abs(touchDelta) > 30) {
        const direction = touchDelta > 0 ? 1 : -1;
        setCurrentIndex(prev => {
          const newIndex = prev + direction;
          return Math.max(0, Math.min(newIndex, cardData.length - 1));
        });
      }
      touchDelta = 0;
      setProgress(0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [cardData.length, currentIndex, progress, isMobile]);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // --- STYLES ---

  const sectionStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #000000ff 0%, #0d142cff 40%, #081a44ff 70%, #000000ff 100%)',
    padding: isMobile ? '2rem 1rem 12rem' : '4rem 2rem 15rem',
    position: 'relative',
    overflow: 'visible',
    marginBottom: '-10rem',
  };

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  };

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: isMobile ? '2rem' : '4rem',
  };

  const h2Style: CSSProperties = {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    color: '#e5f2ff',
    marginBottom: '1rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    filter: 'drop-shadow(0 2px 10px rgba(56, 189, 248, 0.4))',
  };

  const pStyle: CSSProperties = {
    color: '#cbd5f5',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: 500,
  };

  const cardDisplayStyle: CSSProperties = {
    position: 'relative',
    height: isMobile ? '380px' : '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1500px',
  };

  const getCardStyle = (index: number): CSSProperties => {
    const smoothProgress = easeOutCubic(Math.abs(progress));

    const baseStyle: CSSProperties = {
      position: 'absolute',
      width: isMobile ? '95%' : '90%',
      maxWidth: isMobile ? '100%' : '550px',
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.22) 100%)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderRadius: '30px',
      padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      opacity: 0,
      pointerEvents: 'none',
      willChange: 'transform, opacity',
      border: '1px solid rgba(148, 163, 184, 0.9)',
      boxShadow:
        '0 24px 60px rgba(15,23,42,0.9), 0 0 0 1px rgba(148,163,184,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)',
      backgroundImage:
        'linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.35) 100%)',
      backgroundBlendMode: 'screen',
    };

    const transformAmount = isMobile ? 25 : 35;
    const scaleAmount = isMobile ? 0.08 : 0.1;

    if (index === currentIndex) {
      const exitOpacity = 1 - (progress > 0 ? smoothProgress : 0);
      const exitTransform =
        progress > 0 ? -transformAmount * smoothProgress : progress < 0 ? transformAmount * smoothProgress : 0;
      const exitScale = 1 - Math.abs(progress) * scaleAmount;

      return {
        ...baseStyle,
        opacity: exitOpacity,
        transform: `translateY(${exitTransform}px) scale(${exitScale}) rotateX(${exitTransform * 0.1}deg)`,
        pointerEvents: 'auto',
        zIndex: 10,
        boxShadow:
          '0 30px 80px rgba(15,23,42,0.95), 0 0 0 1px rgba(191,219,254,0.65), inset 0 0 40px rgba(255,255,255,0.18)',
        borderColor: 'rgba(191, 219, 254, 1)',
      };
    } else if (index === currentIndex + 1 && progress > 0) {
      const enterOpacity = smoothProgress;
      const enterY = transformAmount - transformAmount * smoothProgress;
      const enterScale = 0.9 + 0.1 * smoothProgress;

      return {
        ...baseStyle,
        opacity: enterOpacity,
        transform: `translateY(${enterY}px) scale(${enterScale})`,
        pointerEvents: enterOpacity > 0.8 ? 'auto' : 'none',
        zIndex: 9,
      };
    } else if (index === currentIndex - 1 && progress < 0) {
      const enterOpacity = smoothProgress;
      const enterY = -transformAmount + transformAmount * smoothProgress;
      const enterScale = 0.9 + 0.1 * smoothProgress;

      return {
        ...baseStyle,
        opacity: enterOpacity,
        transform: `translateY(${enterY}px) scale(${enterScale})`,
        pointerEvents: enterOpacity > 0.8 ? 'auto' : 'none',
        zIndex: 9,
      };
    } else if (index < currentIndex) {
      return {
        ...baseStyle,
        opacity: 0,
        transform: `translateY(-${transformAmount + 15}px) scale(0.85) rotateX(10deg)`,
        filter: 'blur(5px)',
      };
    } else {
      return {
        ...baseStyle,
        opacity: 0,
        transform: `translateY(${transformAmount + 15}px) scale(0.85) rotateX(-10deg)`,
        filter: 'blur(5px)',
      };
    }
  };

  const iconStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isMobile ? '1rem' : '1.5rem',
    color: '#ffffffff',
    filter: 'drop-shadow(0 0 28px rgba(96, 165, 250, 0.9))',
    transition: 'transform 0.3s ease',
  };

  const cardTitleStyle: CSSProperties = {
    fontSize: isMobile ? 'clamp(1.25rem, 5vw, 1.75rem)' : 'clamp(1.5rem, 4vw, 2.2rem)',
    marginBottom: isMobile ? '0.75rem' : '1rem',
    background: 'linear-gradient(135deg, #fbfdffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  };

  const cardDescStyle: CSSProperties = {
    color: '#e2e8f0',
    fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.15rem)',
    lineHeight: 1.6,
    maxWidth: isMobile ? '100%' : '450px',
    margin: '0 auto',
    fontWeight: 400,
  };

  return (
    <section style={sectionStyle} ref={sectionRef}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={h2Style}>What We're Offering</h2>
          <p style={pStyle}>Scroll to explore our platform features</p>
        </div>

        <div style={cardDisplayStyle}>
          {cardData.map((card: CardData, index: number) => (
            <div key={index} style={getCardStyle(index)}>
              <div style={iconStyle}>{card.icon}</div>
              <h3 style={cardTitleStyle}>{card.title}</h3>
              <p style={cardDescStyle}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
