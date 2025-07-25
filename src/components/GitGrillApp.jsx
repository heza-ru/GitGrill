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
      const response = await fetch('/.netlify/functions/github-roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to roast');
      }

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
      
      {/* GitHub Star Button - Top Right */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
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
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(34, 211, 238, 0.6)',
            borderRadius: '8px',
            color: '#22d3ee',
            textDecoration: 'none',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.6rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.9)';
            e.target.style.textShadow = '0 0 15px rgba(34, 211, 238, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0px) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.6)';
            e.target.style.textShadow = '0 0 10px rgba(34, 211, 238, 0.5)';
          }}
        >
          <span style={{ fontSize: '0.8rem' }}>⭐</span>
          <span>STAR ON GITHUB</span>
        </a>
      </div>
      
      {/* MAIN CONTAINER - FORCED CENTER */}
      <div className="main-container" style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        zIndex: 20,
        position: 'relative',
        padding: '1rem',
        boxSizing: 'border-box',
      }}>
        {/* Header Card - CRT Monitor */}
        <div className="crt-monitor" style={{
          maxWidth: '700px',
          width: '100%',
          marginBottom: '2rem',
        }}>
          <div className="power-led"></div>
          <div className="wire-connector"></div>
          <div className="crt-screen">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '2rem',
              marginBottom: '0.5rem' 
            }}>
              <h1 className="big-title pixel-font" style={{
                fontSize: '3rem',
                margin: '0',
                color: '#00ff7f',
                lineHeight: '1.2',
                textShadow: '0 0 10px #00ff7f',
              }}>
                GitGrill
              </h1>
            </div>
            <p style={{
              margin: '0',
              fontSize: '0.8rem',
              color: '#66ff99',
              textShadow: '0 0 5px #66ff99',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              8—Bit burns for your GitHub turns pixel—perfect roasts in every commit.
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
              ◆ POWERED BY SEARDUCK ENGINE ◆
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitGrillApp; 