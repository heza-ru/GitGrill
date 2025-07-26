import React, { useState, useEffect } from 'react';

// Loading sound effects
const playLoadingBeep = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported');
    }
  }
};

const playProgressBlip = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 1200;
      gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.log('Audio not supported');
    }
  }
};

const LoadingDuck = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const loadingStages = [
    {
      quotes: [
        "🔍 Initializing Duck.exe...",
        "🔄 Loading roasting protocols...",
        "⚡ Charging sarcasm batteries..."
      ],
      color: '#22d3ee',
      duration: 1500
    },
    {
      quotes: [
        "📊 Scanning repository architecture...",
        "🔎 Detecting questionable commit messages...",
        "📈 Analyzing code quality patterns..."
      ],
      color: '#fbbf24',
      duration: 1900
    },
    {
      quotes: [
        "🎯 Calculating productivity metrics...",
        "😵 Measuring emoji-to-code ratio...",
        "🦴 Detecting abandoned projects..."
      ],
      color: '#f59e0b',
      duration: 1700
    },
    {
      quotes: [
        "🧠 Compiling personality analysis...",
        "🔥 Loading roast algorithms...",
        "💀 Preparing devastating one-liners..."
      ],
      color: '#ef4444',
      duration: 2100
    },
    {
      quotes: [
        "⚡ Finalizing duck wisdom...",
        "🎭 Rehearsing dramatic delivery...",
        "🦆 ROAST SEQUENCE ARMED!"
      ],
      color: '#10b981',
      duration: 1400
    }
  ];

  const currentStageData = loadingStages[Math.min(stage, loadingStages.length - 1)];

  useEffect(() => {
    let stageTimeout;
    let quoteInterval;
    let progressInterval;

    const startStage = (stageIndex) => {
      if (stageIndex >= loadingStages.length) return;
      
      const stageData = loadingStages[stageIndex];
      setStage(stageIndex);
      setCurrentQuote(0);
      
      // Play loading beep when starting new stage
      playLoadingBeep();
      
      // Quote rotation within stage
      quoteInterval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % stageData.quotes.length);
        playLoadingBeep(); // Beep on each quote change
      }, stageData.duration / stageData.quotes.length);
      
      // Move to next stage after duration
      stageTimeout = setTimeout(() => {
        clearInterval(quoteInterval);
        startStage(stageIndex + 1);
      }, stageData.duration);
    };

    // Progress bar animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 + 2; // Slower, more steady progress
        if (newProgress > 98) return 98; // Don't quite reach 100% until roast loads
        
        // Play progress blip occasionally
        if (Math.random() < 0.3) {
          playProgressBlip();
        }
        
        return newProgress;
      });
    }, 400); // Slower progress updates

    // Start the loading sequence
    startStage(0);

    return () => {
      clearTimeout(stageTimeout);
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
              color: currentStageData.color,
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textShadow: `0 0 10px ${currentStageData.color}80`,
              transition: 'all 0.5s ease',
            }}>
              &gt; STATUS: {currentStageData.quotes[currentQuote]}
            </div>
            
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#86efac',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              textShadow: '0 0 5px rgba(134, 239, 172, 0.3)',
            }}>
              &gt; STAGE {stage + 1}/{loadingStages.length} - {Math.round((stage + 1) / loadingStages.length * 100)}% Complete
            </div>
            
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#64748b',
              fontSize: '0.7rem',
              marginBottom: '1.5rem',
              textShadow: '0 0 3px rgba(100, 116, 139, 0.3)',
            }}>
              &gt; Deep scanning repository patterns and developer behavior...
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