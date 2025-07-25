import React, { useState } from 'react';

const ProfileInput = ({ onRoastRequest, error }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onRoastRequest(username.trim());
    }
  };

  const handleSampleUser = (sampleUsername) => {
    setUsername(sampleUsername);
    onRoastRequest(sampleUsername);
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="crt-monitor double-wire" style={{
        maxWidth: '700px',
        width: '100%',
        marginBottom: '2rem',
      }}>
        <div className="power-led"></div>
        <div className="wire-connector"></div>
        <div className="crt-screen">
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            <h2 className="pixel-font" style={{
              color: '#00ff7f',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              textShadow: '0 0 10px #00ff7f',
            }}>
              ◆ TARGET ACQUISITION ◆
            </h2>
            <p style={{
              color: '#66ff99',
              fontSize: '0.9rem',
              marginBottom: '0',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              Enter GitHub username for brutal code analysis
            </p>
          </div>

        {/* Error Display */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(239, 68, 68, 0.6)',
            color: '#fca5a5',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.9rem',
            imageRendering: 'pixelated',
            clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="force-input"
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: '3px solid rgba(34, 211, 238, 0.6)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: '1.2rem',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '1rem',
              }}
              required
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="force-button"
              style={{
                width: '100%',
                padding: '1.2rem',
                background: username.trim() ? 'linear-gradient(to right, #06b6d4, #8b5cf6)' : 'rgba(100, 116, 139, 0.5)',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: "'Press Start 2P', cursive",
                cursor: username.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              ► START SCAN ◄
            </button>
          </div>
        </form>

        {/* Sample Users */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="pixel-font" style={{
            color: '#c4b5fd',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            textShadow: '0 0 10px rgba(196, 181, 253, 0.5)',
          }}>
            ◆ LEGENDARY TARGETS ◆
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
          }}>
            <button
              onClick={() => handleSampleUser('torvalds')}
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
                border: '3px solid rgba(239, 68, 68, 0.8)',
                color: 'white',
                padding: '1rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                torvalds
                <div style={{ fontSize: '0.6rem', opacity: 0.9, marginTop: '0.2rem' }}>Linux Creator</div>
              </div>
            </button>
            
            <button
              onClick={() => handleSampleUser('gaearon')}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)',
                border: '3px solid rgba(245, 158, 11, 0.8)',
                color: 'white',
                padding: '1rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                gaearon
                <div style={{ fontSize: '0.6rem', opacity: 0.9, marginTop: '0.2rem' }}>React Creator</div>
              </div>
            </button>
            
            <button
              onClick={() => handleSampleUser('demo')}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                border: '3px solid rgba(16, 185, 129, 0.8)',
                color: 'white',
                padding: '1rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                demo
                <div style={{ fontSize: '0.6rem', opacity: 0.9, marginTop: '0.2rem' }}>Safe Mode</div>
              </div>
            </button>
          </div>
        </div>

        {/* Gaming Stats */}
        <div style={{ 
          paddingTop: '1.5rem', 
          borderTop: '2px solid rgba(34, 211, 238, 0.3)',
        }}>
          <div className="pixel-font" style={{
            color: '#22d3ee',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
          }}>
            ◆ SEARDUCK ANALYTICS ◆
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '1rem',
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              padding: '1rem',
              textAlign: 'center',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🔥</div>
              <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#a855f7' }}>EVERYONE</div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>ROASTED</div>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(34, 211, 238, 0.4)',
              padding: '1rem',
              textAlign: 'center',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>💀</div>
              <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#22d3ee' }}>CAREERS</div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>ENDED</div>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              padding: '1rem',
              textAlign: 'center',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>⚡</div>
              <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#10b981' }}>ACCURACY</div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>99.8%</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput; 