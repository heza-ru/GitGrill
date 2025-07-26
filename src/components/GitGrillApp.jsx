import React, { useState } from 'react';
import ProfileInput from './ProfileInput';
import LoadingDuck from './LoadingDuck';
import RoastDisplay from './RoastDisplay';

// Pixel star background
const PixelStars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: '1px',
            height: '1px',
            backgroundColor: '#22d3ee',
            opacity: 0.3,
            animation: `twinkle ${2 + star.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

const GitGrillApp = () => {
  const [loading, setLoading] = useState(false);
  const [roastData, setRoastData] = useState(null);
  const [error, setError] = useState('');

  const handleRoastRequest = async (username) => {
    setLoading(true);
    setError('');
    setRoastData(null);

    try {
      // Add dramatic delay to let the enhanced loading animation play
      const minimumLoadingTime = 9000; // 9 seconds for full loading experience
      const startTime = Date.now();
      
      // Start the actual roast request
      const roastPromise = fetch('/.netlify/functions/github-roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      // Wait for both the API call and minimum loading time
      const [response] = await Promise.all([
        roastPromise,
        new Promise(resolve => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minimumLoadingTime - elapsed);
          setTimeout(resolve, remainingTime);
        })
      ]);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to roast');
      }

      // Add a final dramatic pause before revealing the roast
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRoastData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRoast = () => {
    setRoastData(null);
    setError('');
  };

  return (
    <div
      className="force-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url(/back.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0',
        fontFamily: "'JetBrains Mono', monospace",
        color: 'white',
        boxSizing: 'border-box',
      }}
    >
      <PixelStars />
      
      {/* GitHub Star Button - Responsive */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <a
          href="https://github.com/heza-ru/GitGrill"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: window.innerWidth <= 768 ? '0.5rem 0.75rem' : '0.75rem 1rem',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(34, 211, 238, 0.6)',
            borderRadius: '8px',
            color: '#22d3ee',
            textDecoration: 'none',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: window.innerWidth <= 768 ? '0.5rem' : '0.6rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth > 768) {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(34, 211, 238, 0.9)';
              e.target.style.textShadow = '0 0 15px rgba(34, 211, 238, 0.8)';
            }
          }}
          onMouseLeave={(e) => {
            if (window.innerWidth > 768) {
              e.target.style.transform = 'translateY(0px) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(34, 211, 238, 0.6)';
              e.target.style.textShadow = '0 0 10px rgba(34, 211, 238, 0.5)';
            }
          }}
        >
          <span style={{ fontSize: window.innerWidth <= 768 ? '0.6rem' : '0.8rem' }}>⭐</span>
          <span style={{ display: window.innerWidth <= 480 ? 'none' : 'inline' }}>
            {window.innerWidth <= 768 ? 'STAR' : 'STAR ON GITHUB'}
          </span>
        </a>
      </div>
      
      {/* MAIN CONTAINER - RESPONSIVE */}
      <div className="main-container" style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: window.innerWidth <= 768 ? '1rem' : '1.5rem',
        zIndex: 20,
        position: 'relative',
        padding: window.innerWidth <= 768 ? '0.5rem' : '1rem',
        boxSizing: 'border-box',
        paddingTop: window.innerWidth <= 768 ? '60px' : '20px', // Account for mobile star button
      }}>
        {/* Header Card - CRT Monitor */}
        <div className="crt-monitor" style={{
          maxWidth: '700px',
          width: '100%',
          marginBottom: window.innerWidth <= 768 ? '1rem' : '2rem',
        }}>
          <div className="power-led"></div>
          <div className="wire-connector"></div>
          <div className="crt-screen">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: window.innerWidth <= 768 ? '1rem' : '2rem',
              marginBottom: '0.5rem',
              flexWrap: 'wrap',
            }}>
              <h1 className="big-title pixel-font" style={{
                fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2.2rem' : '3rem',
                margin: '0',
                color: '#00ff7f',
                lineHeight: '1.2',
                textShadow: '0 0 10px #00ff7f',
                textAlign: 'center',
              }}>
                GitGrill
              </h1>
            </div>
            <p style={{
              margin: '0',
              fontSize: window.innerWidth <= 480 ? '0.7rem' : '0.8rem',
              color: '#66ff99',
              textShadow: '0 0 5px #66ff99',
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: 'center',
              lineHeight: '1.4',
              padding: window.innerWidth <= 768 ? '0 0.5rem' : '0',
            }}>
              {window.innerWidth <= 480 
                ? '8-Bit burns for your GitHub turns'
                : '8—Bit burns for your GitHub turns pixel—perfect roasts in every commit.'
              }
            </p>
          </div>
        </div>

        {/* MAIN CONTENT CARD - Properly Centered */}
        <div style={{ 
          width: '100%', 
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          {loading ? (
            <LoadingDuck />
          ) : roastData ? (
            <RoastDisplay data={roastData} onNewRoast={handleNewRoast} />
          ) : (
            <ProfileInput onRoastRequest={handleRoastRequest} error={error} />
          )}
        </div>

        {/* BOTTOM CREDITS - Only on homepage when no loading and no roast data */}
        {!loading && !roastData && (
          <div style={{ 
            textAlign: 'center',
            marginTop: '1rem',
            opacity: 0.7,
          }}>
            <div className="pixel-font" style={{
              fontSize: '0.6rem',
              color: '#64748b',
              textShadow: '0 0 5px rgba(100, 116, 139, 0.3)',
            }}>
              ◆ POWERED BY REDDIT COMMENTS, INSPIRED BY RUBBER DUCK THURSDAYS ◆
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitGrillApp; 