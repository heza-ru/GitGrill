import React from 'react';

const SocialShare = ({ roastData }) => {
  const shareText = `Just got roasted by GitGrill! 🦆💻 My GitHub profile got a ${roastData.metrics.productivityScore}/10 duck rating. Check yours at`;
  const shareUrl = window.location.origin;

  const platforms = [
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: '🐦‍⬛',
      color: 'from-black to-gray-800'
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/`,
      icon: '📸',
      color: 'from-pink-500 to-purple-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: '💼',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Reddit',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      icon: '🤖',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="crt-monitor" style={{
      maxWidth: '500px',
      width: '100%',
    }}>
      <div className="power-led"></div>
      <div className="wire-connector"></div>
      <div className="crt-screen">
        <div style={{ 
          textAlign: 'center',
          padding: '1rem'
        }}>
          <div className="pixel-font" style={{
            color: '#00ff7f',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            textShadow: '0 0 10px #00ff7f',
          }}>
            ◆ BROADCAST RESULTS ◆
          </div>
          
          <h3 className="pixel-font" style={{
            color: '#66ff99',
            fontSize: '0.8rem',
            marginBottom: '1.5rem',
            textShadow: '0 0 5px #66ff99',
          }}>
            Share the roast results
          </h3>
          <p style={{
            color: '#e879f9',
            fontSize: '1rem',
            textShadow: '0 0 5px rgba(232, 121, 249, 0.3)',
          }}>
            Show the world your coding prowess (or lack thereof)
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: platform.name === 'X' ? 'linear-gradient(to right, #000000, #374151)' :
                           platform.name === 'Instagram' ? 'linear-gradient(to right, #ec4899, #8b5cf6)' :
                           platform.name === 'LinkedIn' ? 'linear-gradient(to right, #1d4ed8, #1e3a8a)' :
                           'linear-gradient(to right, #f97316, #dc2626)',
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                imageRendering: 'pixelated',
                clipPath: 'polygon(0px 6px, 6px 6px, 6px 0px, calc(100% - 6px) 0px, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0px calc(100% - 6px))',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{platform.icon}</div>
              <div className="pixel-font" style={{ fontSize: '0.8rem' }}>{platform.name}</div>
            </a>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p className="pixel-font" style={{
            color: '#c4b5fd',
            fontSize: '0.8rem',
            textShadow: '0 0 5px rgba(196, 181, 253, 0.3)',
          }}>
            ◆ SPREAD THE DUCK WISDOM ◆
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialShare; 