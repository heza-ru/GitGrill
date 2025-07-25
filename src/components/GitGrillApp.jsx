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