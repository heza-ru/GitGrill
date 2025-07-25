import React, { useState, useEffect } from 'react';

const LoadingDuck = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingQuotes = [
    "Initializing Duck.exe...",
    "Scanning for questionable commit messages...",
    "Analyzing emoji-to-code ratio...",
    "Detecting abandoned projects...",
    "Calculating productivity shame...",
    "Loading roast algorithms...",
    "Preparing devastating one-liners...",
    "Charging sarcasm batteries...",
    "Compiling harsh truths...",
    "Finalizing duck wisdom..."
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 800);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="crt-monitor" style={{
      maxWidth: '600px',
      width: '100%',
      marginBottom: '2rem',
    }}>
      <div className="power-led"></div>
      <div className="wire-connector"></div>
      <div className="crt-screen">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pixel-font" style={{
            color: '#22d3ee',
            fontSize: '1rem',
            marginBottom: '2rem',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
          }}>
            ◆ PROCESSING TARGET ◆
          </div>

          {/* ASCII Duck with Animation */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1rem',
            color: '#fbbf24',
            marginBottom: '2rem',
            lineHeight: '1.2',
            textShadow: '0 0 15px rgba(251, 191, 36, 0.5)',
            animation: 'float 2s ease-in-out infinite',
          }}>
            <div>    __</div>
            <div>___( o)&gt;</div>
            <div>\ &lt;_. )</div>
            <div> `---'</div>
          </div>

          {/* Scanning Lines */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(34, 211, 238, 0.6)',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
            imageRendering: 'pixelated',
            clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#10b981',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
            }}>
              &gt; STATUS: {loadingQuotes[currentQuote]}
            </div>
            
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#86efac',
              fontSize: '0.8rem',
              marginBottom: '1.5rem',
              textShadow: '0 0 5px rgba(134, 239, 172, 0.3)',
            }}>
              &gt; Analyzing repository patterns...
            </div>

            {/* Progress Bar */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(34, 211, 238, 0.6)',
              height: '2rem',
              position: 'relative',
              overflow: 'hidden',
              imageRendering: 'pixelated',
              clipPath: 'polygon(0px 2px, 2px 2px, 2px 0px, calc(100% - 2px) 0px, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0px calc(100% - 2px))',
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(to right, #22d3ee, #10b981)',
                transition: 'width 0.5s ease',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.7rem',
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}>
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            {['▣', '▣', '▣'].map((indicator, index) => (
              <div 
                key={index}
                style={{
                  fontSize: '1.5rem',
                  color: index <= (currentQuote % 3) ? '#10b981' : '#374151',
                  textShadow: index <= (currentQuote % 3) ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {indicator}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDuck; 