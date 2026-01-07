'use client';

import Hero from '../components/Hero';
import Offerings from '../components/Offerings';
import Premium from '../components/Premium';
import Download from '../components/Download';
import Footer from '../components/Footer';

export default function BookKitLanding() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('http://www.creatypestudio.co/license');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
          scroll-behavior: auto;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          width: 100%;
          height: 100%;
        }

        body {
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
        }

        .bookkit-landing {
          font-family: 'Okra', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden;
          width: 100%;
        }

        /* ALL YOUR CSS STYLES HERE - Copy from original file */
      `,
        }}
      />

      <div className="bookkit-landing">
        <Hero />
        <Offerings />
        <Premium />
        <Download />
        <Footer />
      </div>
    </>
  );
}
