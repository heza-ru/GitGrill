import React, { useEffect, useState } from 'react';
import SocialShare from './SocialShare';

// Enhanced sound effects library using Web Audio API
const createOscillator = (audioContext, frequency, duration, volume = 0.1) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  return { oscillator, gainNode };
};

const playDuckSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const { oscillator, gainNode } = createOscillator(audioContext, 800, 0.1);
      
      // Create a "quack" sound
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playTriumphSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Victory fanfare sequence
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const { oscillator } = createOscillator(audioContext, freq, 0.2, 0.08);
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + (index * 0.1) + 0.2);
      });
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playFailSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const { oscillator } = createOscillator(audioContext, 400, 0.5);
      
      // Sad trombone effect
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playBeepSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const { oscillator } = createOscillator(audioContext, 1000, 0.1, 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playBubbleSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create bubble pop effect
      for (let i = 0; i < 3; i++) {
        const freq = 800 + (i * 200);
        const { oscillator } = createOscillator(audioContext, freq, 0.1, 0.03);
        oscillator.start(audioContext.currentTime + i * 0.05);
        oscillator.stop(audioContext.currentTime + (i * 0.05) + 0.1);
      }
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playChirpSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const { oscillator } = createOscillator(audioContext, 1500, 0.2);
      
      // Chirp effect - frequency sweep
      oscillator.frequency.exponentialRampToValueAtTime(3000, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playWarningSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Warning alarm pattern
      for (let i = 0; i < 3; i++) {
        const { oscillator } = createOscillator(audioContext, 800, 0.1, 0.06);
        oscillator.start(audioContext.currentTime + i * 0.15);
        oscillator.stop(audioContext.currentTime + (i * 0.15) + 0.1);
      }
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playPowerUpSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const { oscillator } = createOscillator(audioContext, 200, 0.5);
      
      // Power up sweep
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playGlitchSound = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Random glitch effect
      for (let i = 0; i < 5; i++) {
        const freq = Math.random() * 1000 + 200;
        const { oscillator } = createOscillator(audioContext, freq, 0.05, 0.04);
        oscillator.start(audioContext.currentTime + i * 0.03);
        oscillator.stop(audioContext.currentTime + (i * 0.03) + 0.05);
      }
    } catch (error) {
      console.log('Audio not supported or failed');
    }
  }
};

const playRandomSound = () => {
  const sounds = [
    playDuckSound, playBeepSound, playBubbleSound, playChirpSound, 
    playWarningSound, playPowerUpSound, playGlitchSound
  ];
  const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
  randomSound();
};

const RoastDisplay = ({ data, onNewRoast }) => {
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  
  // Dynamic Duck Classification System with personality traits
  const getDuckClassification = (metrics) => {
    const { productivityScore, commitFrequency, languages, emojiRatio } = metrics;
    
    // Calculate additional personality metrics for more dynamic classification
    const isMultiLingual = languages.length >= 3;
    const isHyperActive = commitFrequency > 50;
    const isConsistent = commitFrequency >= 15 && commitFrequency <= 40;
    const isMinimalist = emojiRatio === 0;
    const isExpressive = emojiRatio > 0.3;
    const isExperienced = productivityScore >= 5;
    
    // Personality-based classifications (these can override score-based ones)
    const personalityTypes = [];
    
    // Add personality classifications based on behavior patterns
    if (commitFrequency < 3) {
      personalityTypes.push({ type: "GHOST DUCK", color: "#6b7280", icon: "👻", description: "Mysteriously absent" });
      personalityTypes.push({ type: "FOSSIL DUCK", color: "#8b5a3c", icon: "🦴", description: "Ancient artifact" });
      personalityTypes.push({ type: "HIBERNATING DUCK", color: "#92400e", icon: "😴", description: "In deep sleep mode" });
    }
    
    if (isHyperActive && isMultiLingual) {
      personalityTypes.push({ type: "CAFFEINATED DUCK", color: "#dc2626", icon: "☕", description: "Powered by espresso" });
      personalityTypes.push({ type: "POLYGLOT DUCK", color: "#7c3aed", icon: "🗣️", description: "Speaks all languages" });
    }
    
    if (languages.length === 1 && productivityScore < 6) {
      const languageTypes = [
        { type: "SPECIALIST DUCK", color: "#f59e0b", icon: "🎯", description: "Master of one trade" },
        { type: "PURIST DUCK", color: "#dc2626", icon: "⚔️", description: "Language loyalist" },
        { type: "STUBBORN DUCK", color: "#7c2d12", icon: "🗿", description: "Refuses to evolve" }
      ];
      personalityTypes.push(...languageTypes);
    }
    
    if (emojiRatio > 0.7) {
      personalityTypes.push({ type: "EMOJI DUCK", color: "#ec4899", icon: "😵", description: "Expressive communicator" });
      personalityTypes.push({ type: "THEATRICAL DUCK", color: "#db2777", icon: "🎭", description: "Drama in every commit" });
    }
    
    if (isMinimalist && isExperienced) {
      personalityTypes.push({ type: "ZEN DUCK", color: "#059669", icon: "🧘", description: "Minimalist master" });
      personalityTypes.push({ type: "STOIC DUCK", color: "#374151", icon: "🗿", description: "Silent but deadly" });
    }
    
    if (isConsistent && isMultiLingual) {
      personalityTypes.push({ type: "PROFESSIONAL DUCK", color: "#1f2937", icon: "💼", description: "Corporate code warrior" });
      personalityTypes.push({ type: "ARCHITECT DUCK", color: "#4338ca", icon: "🏗️", description: "System designer" });
    }
    
    if (commitFrequency > 100) {
      personalityTypes.push({ type: "WORKAHOLIC DUCK", color: "#b91c1c", icon: "🔥", description: "Never stops coding" });
      personalityTypes.push({ type: "COMMIT SPAMMER", color: "#ea580c", icon: "📢", description: "Quantity over quality" });
    }
    
    if (productivityScore < 2 && commitFrequency < 10) {
      personalityTypes.push({ type: "LURKER DUCK", color: "#6b7280", icon: "👀", description: "Watching from shadows" });
      personalityTypes.push({ type: "PROCRASTINATOR", color: "#92400e", icon: "⏰", description: "Tomorrow's developer" });
    }
    
    // Add random personality quirks
    const quirkTypes = [
      { type: "NIGHT OWL DUCK", color: "#312e81", icon: "🦉", description: "Codes at 3 AM" },
      { type: "PERFECTIONIST", color: "#7c3aed", icon: "✨", description: "Refactors everything" },
      { type: "COPY-PASTA DUCK", color: "#dc2626", icon: "📋", description: "Stack Overflow warrior" },
      { type: "INDIE DUCK", color: "#059669", icon: "🎸", description: "Too cool for frameworks" },
      { type: "DEBUGGING DUCK", color: "#b45309", icon: "🔍", description: "Bug hunter extraordinaire" },
      { type: "README DUCK", color: "#0891b2", icon: "📖", description: "Documentation enthusiast" },
      { type: "WEEKEND WARRIOR", color: "#be123c", icon: "⚔️", description: "Side project hero" }
    ];
    
    // Add quirks based on random chance and metrics
    if (Math.random() < 0.3 || personalityTypes.length === 0) {
      personalityTypes.push(...quirkTypes.filter(() => Math.random() < 0.2));
    }
    
    // If we have personality types, randomly select one
    if (personalityTypes.length > 0) {
      const selectedPersonality = personalityTypes[Math.floor(Math.random() * personalityTypes.length)];
      return selectedPersonality;
    }
    
    // Fallback to enhanced score-based classification with randomization
    const scoreBasedTypes = [];
    
    if (productivityScore >= 9) {
      scoreBasedTypes.push(
        { type: "LEGENDARY DUCK", color: "#ff6b6b", icon: "🔥", description: "Mythical coding deity" },
        { type: "CODE DEMIGOD", color: "#dc2626", icon: "⚡", description: "Ascended developer" },
        { type: "SILICON SAINT", color: "#7c2d12", icon: "👑", description: "Blessed by algorithms" }
      );
    } else if (productivityScore >= 8.5) {
      scoreBasedTypes.push(
        { type: "GODLIKE DUCK", color: "#4ecdc4", icon: "⚡", description: "Transcendent developer" },
        { type: "APEX CODER", color: "#0891b2", icon: "🦅", description: "Peak performance" }
      );
    } else if (productivityScore >= 7.5) {
      scoreBasedTypes.push(
        { type: "ALPHA DUCK", color: "#ffd700", icon: "👑", description: "Apex predator" },
        { type: "CHAMPION DUCK", color: "#ca8a04", icon: "🏆", description: "Competition winner" },
        { type: "SENIOR ARCHITECT", color: "#a16207", icon: "🎯", description: "System mastermind" }
      );
    } else if (productivityScore >= 6.5) {
      scoreBasedTypes.push(
        { type: "ELITE DUCK", color: "#a78bfa", icon: "💎", description: "Top-tier talent" },
        { type: "VETERAN CODER", color: "#7c3aed", icon: "🎖️", description: "Battle-tested" },
        { type: "SENIOR DUCK", color: "#5b21b6", icon: "🎯", description: "Experienced professional" }
      );
    } else if (productivityScore >= 5.5) {
      scoreBasedTypes.push(
        { type: "SENIOR DUCK", color: "#10b981", icon: "🎯", description: "Experienced professional" },
        { type: "RELIABLE DUCK", color: "#059669", icon: "⚙️", description: "Steady contributor" },
        { type: "TEAM LEAD DUCK", color: "#047857", icon: "👥", description: "Guides the flock" }
      );
    } else if (productivityScore >= 4.5) {
      scoreBasedTypes.push(
        { type: "MID-LEVEL DUCK", color: "#06b6d4", icon: "⚙️", description: "Competent contributor" },
        { type: "SOLID DUCK", color: "#0891b2", icon: "🔧", description: "Gets stuff done" },
        { type: "GROWING DUCK", color: "#0e7490", icon: "📈", description: "On the rise" }
      );
    } else if (productivityScore >= 3.5) {
      scoreBasedTypes.push(
        { type: "JUNIOR DUCK", color: "#3b82f6", icon: "🌟", description: "Growing developer" },
        { type: "EAGER DUCK", color: "#2563eb", icon: "🚀", description: "Full of potential" },
        { type: "PROMISING DUCK", color: "#1d4ed8", icon: "✨", description: "Future looks bright" }
      );
    } else if (productivityScore >= 2.5) {
      scoreBasedTypes.push(
        { type: "INTERN DUCK", color: "#8b5cf6", icon: "📚", description: "Learning the ropes" },
        { type: "STUDENT DUCK", color: "#7c3aed", icon: "🎓", description: "Academic achiever" },
        { type: "APPRENTICE DUCK", color: "#6d28d9", icon: "🧑‍🎓", description: "Under tutelage" }
      );
    } else if (productivityScore >= 1.5) {
      scoreBasedTypes.push(
        { type: "TRAINEE DUCK", color: "#f97316", icon: "🥚", description: "Just hatched" },
        { type: "NEWBIE DUCK", color: "#ea580c", icon: "👶", description: "Fresh to the game" },
        { type: "ROOKIE DUCK", color: "#dc2626", icon: "🐣", description: "First steps" }
      );
    } else {
      scoreBasedTypes.push(
        { type: "RUBBER DUCK", color: "#ef4444", icon: "🦆", description: "Debugging companion" },
        { type: "SQUEAKY DUCK", color: "#dc2626", icon: "🔊", description: "Makes noise, no code" },
        { type: "BATH DUCK", color: "#f59e0b", icon: "🛁", description: "Enjoys clean code" }
      );
    }
    
    // Randomly select from available score-based types
    return scoreBasedTypes[Math.floor(Math.random() * scoreBasedTypes.length)];
  };

  const classification = getDuckClassification(data.metrics);
  
  // Play sound effect based on duck classification and personality
  useEffect(() => {
    if (!hasPlayedSound) {
      const timer = setTimeout(() => {
        // Select sound based on duck classification type
        const classType = classification.type;
        
        if (classType.includes('LEGENDARY') || classType.includes('GODLIKE')) {
          playTriumphSound(); // Epic victory for legends
        } else if (classType.includes('ALPHA') || classType.includes('ELITE')) {
          playPowerUpSound(); // Power up for high achievers
        } else if (classType.includes('CAFFEINATED') || classType.includes('WORKAHOLIC')) {
          playWarningSound(); // Alert sound for hyperactive types
        } else if (classType.includes('GHOST') || classType.includes('LURKER')) {
          playGlitchSound(); // Glitch for mysterious types
        } else if (classType.includes('POLYGLOT') || classType.includes('PROFESSIONAL')) {
          playChirpSound(); // Chirp for skilled types
        } else if (classType.includes('TRAINEE') || classType.includes('NEWBIE')) {
          playBubbleSound(); // Bubble for beginners
        } else if (data.metrics.productivityScore <= 2) {
          playFailSound(); // Sad trombone for low scores
        } else {
          playDuckSound(); // Default duck quack
        }
        setHasPlayedSound(true);
      }, 1500); // Increased delay for more dramatic effect
      
      return () => clearTimeout(timer);
    }
  }, [classification.type, data.metrics.productivityScore, hasPlayedSound]);
  


  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: window.innerWidth <= 768 ? '1rem' : '2rem',
      overflow: 'hidden'
    }}>
      <div className="crt-monitor" style={{
        maxWidth: '900px',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        <div className="power-led"></div>
        <div className="wire-connector"></div>
        <div className="crt-screen">
          <div style={{ 
            padding: '1rem',
            overflow: 'hidden',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {/* Results Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
              borderBottom: '2px solid #00ff7f',
              paddingBottom: window.innerWidth <= 768 ? '0.8rem' : '1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                marginBottom: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  fontSize: window.innerWidth <= 480 ? '1.5rem' : '2rem',
                  color: classification.color,
                }}>
                  {classification.icon}
                </div>
                <div>
                  <h2 style={{
                    fontSize: window.innerWidth <= 480 ? '1.2rem' : window.innerWidth <= 768 ? '1.5rem' : '2rem',
                    margin: '0',
                    color: '#00ff7f',
                    fontFamily: "'Press Start 2P', cursive",
                    textShadow: '0 0 10px #00ff7f',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                  }}>
                    {data.username}
                  </h2>
                  <div style={{
                    fontSize: window.innerWidth <= 480 ? '0.6rem' : '0.8rem',
                    color: classification.color,
                    fontFamily: "'Press Start 2P', cursive",
                    marginTop: '0.5rem',
                    textShadow: `0 0 10px ${classification.color}`,
                    textAlign: 'center',
                  }}>
                    {classification.type}
                  </div>
                  <div style={{
                    fontSize: window.innerWidth <= 480 ? '0.5rem' : '0.6rem',
                    color: '#a1a1aa',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: '0.3rem',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                    "{classification.description}"
                  </div>
                </div>
              </div>
            </div>

            {/* Roast Content - More Readable */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '3px solid rgba(16, 185, 129, 0.7)',
              padding: window.innerWidth <= 768 ? '1rem' : '2rem',
              marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
              imageRendering: 'pixelated',
              clipPath: window.innerWidth <= 768 ? 'none' : 'polygon(0px 6px, 6px 6px, 6px 0px, calc(100% - 6px) 0px, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0px calc(100% - 6px))',
              borderRadius: window.innerWidth <= 768 ? '8px' : '0',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: '#10b981',
                fontSize: window.innerWidth <= 480 ? '0.7rem' : '0.9rem',
                marginBottom: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                wordBreak: 'break-all',
              }}>
                &gt; searduck_roast.exe --target={data.username} --mode=brutal
              </div>
              <div style={{
                color: '#ffffff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: window.innerWidth <= 480 ? '0.85rem' : '1rem',
                lineHeight: window.innerWidth <= 768 ? '1.6' : '1.8',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.6)',
                padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                clipPath: window.innerWidth <= 768 ? 'none' : 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
                borderRadius: window.innerWidth <= 768 ? '6px' : '0',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
              }}>
                {data.roast.split('\n').map((paragraph, index) => (
                  <div key={index} style={{
                    marginBottom: paragraph.trim() ? '1rem' : '0.5rem',
                  }}>
                    {paragraph.trim() && (
                      <>
                        <span style={{ color: '#10b981' }}>&gt; </span>
                        {paragraph.trim()}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>



            {/* Targeted Tid-bits */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(251, 191, 36, 0.6)',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              imageRendering: 'pixelated',
              clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
            }}>
              <div className="pixel-font" style={{
                color: '#fbbf24',
                fontSize: '0.8rem',
                marginBottom: '1rem',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              }}>
                🎯 TARGETED BURNS
              </div>
              <div 
                className="targeted-burns-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth <= 480 
                    ? '1fr' 
                    : window.innerWidth <= 768 
                      ? 'repeat(2, 1fr)' 
                      : 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                {/* Language Burn */}
                {data.metrics.languages.length > 0 && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    padding: '1rem',
                    clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
                      overflow: 'hidden',
                      wordWrap: 'break-word',
                      boxSizing: 'border-box',
                  }}>
                    <div style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center' }}>💻</div>
                    <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#60a5fa', marginBottom: '0.5rem', textAlign: 'center' }}>
                      LANGUAGE CHOICE
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#93c5fd', lineHeight: '1.4', textAlign: 'center' }}>
                      {data.metrics.languages.length === 1 
                        ? `Only ${data.metrics.languages[0]}? That's not specialization, that's limitation.`
                        : data.metrics.languages.length > 5 
                        ? `${data.metrics.languages.length} languages? Jack of all trades, master of none.`
                        : `${data.metrics.languages.join(', ')} - a decent spread, but quantity ≠ quality.`}
                    </div>
                  </div>
                )}

                {/* Emoji Burn */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  padding: '1rem',
                  clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
                  overflow: 'hidden',
                  wordWrap: 'break-word',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center' }}>😵</div>
                  <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#f472b6', marginBottom: '0.5rem', textAlign: 'center' }}>
                    EMOJI USAGE
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#f9a8d4', lineHeight: '1.4', textAlign: 'center' }}>
                    {data.metrics.emojiRatio > 0.5 
                      ? `${Math.round(data.metrics.emojiRatio * 100)}% emoji usage. This isn't Instagram.`
                      : data.metrics.emojiRatio > 0.2 
                      ? `${Math.round(data.metrics.emojiRatio * 100)}% emojis - moderately unprofessional.`
                      : `${Math.round(data.metrics.emojiRatio * 100)}% emojis. Finally, some professionalism.`}
                  </div>
                </div>

                {/* Productivity Burn */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '1rem',
                  clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
                  overflow: 'hidden',
                  wordWrap: 'break-word',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center' }}>⚡</div>
                  <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#4ade80', marginBottom: '0.5rem', textAlign: 'center' }}>
                    COMMIT FREQUENCY
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#86efac', lineHeight: '1.4', textAlign: 'center' }}>
                    {data.metrics.commitFrequency < 5 
                      ? `${data.metrics.commitFrequency}/month? Part-time programmer detected.`
                      : data.metrics.commitFrequency > 50 
                      ? `${data.metrics.commitFrequency}/month. Calm down, we get it.`
                      : `${data.metrics.commitFrequency}/month - adequately mediocre pace.`}
                  </div>
                </div>
              </div>
            </div>

            {/* Duck Wisdom */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(168, 85, 247, 0.6)',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              imageRendering: 'pixelated',
              clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
            }}>
              <div className="pixel-font" style={{
                color: '#a855f7',
                fontSize: '0.8rem',
                marginBottom: '1rem',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
              }}>
                🦆 SEARDUCK WISDOM
              </div>
              <div style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                padding: '1rem',
                textAlign: 'center',
                clipPath: 'polygon(0px 2px, 2px 2px, 2px 0px, calc(100% - 2px) 0px, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0px calc(100% - 2px))',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.9rem',
                  color: '#d8b4fe',
                  lineHeight: '1.5',
                  fontStyle: 'italic',
                  textShadow: '0 0 5px rgba(216, 180, 254, 0.3)',
                }}>
                  {(() => {
                    const wisdomQuotes = [
                    `"Code quality is like a duck's quack - if no one hears it, does it really exist?"`,
                    `"The best way to debug code is to explain it to a rubber duck. You clearly need more ducks."`,
                    `"Your code commits are like duck eggs - they look promising until they hatch."`,
                    `"A programmer without tests is like a duck without water - technically functional but missing the point."`,
                    `"Your repository is like a pond - looks calm on the surface but chaos underneath."`,
                    `"Good code is like a duck's landing - it looks effortless but requires skill you clearly lack."`,
                      `"Your GitHub profile is like a duck in winter - cold, barren, and nobody wants to visit."`,
                      `"Documentation is like a duck's nest - everyone knows it should be there, but nobody wants to build it."`,
                      `"Your code reviews are like watching a duck try to fly backwards - painful and pointless."`,
                      `"Version control without commits is like a duck without feathers - technically still a duck, but embarrassing to look at."`,
                      `"Your coding style is like a duck's waddle - distinctive, but not necessarily impressive."`,
                      `"Debugging your code is like following a duck through a maze - lots of wrong turns and confused quacking."`,
                      `"Your function names are like duck calls - they make noise, but nobody understands what they mean."`,
                      `"Refactoring your code is like teaching an old duck new tricks - possible, but requires infinite patience."`,
                      `"Your API design is like a duck's feet - it works underwater, but looks ridiculous on land."`,
                      `"Code comments are like duck footprints - they show where you've been, but not where you're going."`,
                      `"Your error handling is like a duck in a thunderstorm - lots of flapping, minimal progress."`,
                      `"Performance optimization without profiling is like a blind duck hunting - lots of effort, zero accuracy."`,
                      `"Your merge conflicts are like two ducks fighting over bread crumbs - messy and unnecessary."`,
                      `"Writing clean code is like a duck's preening - essential maintenance that everyone neglects."`,
                      `"Your coding habits are like a duck's migration pattern - predictably disappointing."`,
                      `"Technical debt is like feeding ducks bread - seems harmless until the ecosystem collapses."`,
                      `"Your test coverage is like a duck's attention span - impressively short and easily distracted."`,
                      `"Code optimization without benchmarks is like a duck racing a cheetah - admirable confidence, tragic outcome."`,
                      `"Your project architecture is like a duck's nest in a hurricane - ambitious but fundamentally flawed."`,
                      `"Premature optimization is like a duck trying to fly before learning to swim - backwards priorities."`,
                      `"Your commit messages are like duck hieroglyphics - meaningful to you, gibberish to everyone else."`,
                      `"Code without version control is like a duck without a pond - technically alive, but missing the point."`,
                      `"Your coding methodology is like a duck's diet - you'll eat anything, but you probably shouldn't."`
                    ];
                    
                    // Personalize based on user metrics
                    const personalizedQuotes = [];
                    
                    if (data.metrics.emojiRatio > 0.3) {
                      personalizedQuotes.push(`"Using emojis in commits is like putting lipstick on a duck - it doesn't make it prettier, just more embarrassing."`);
                    }
                    
                    if (data.metrics.commitFrequency < 10) {
                      personalizedQuotes.push(`"Your commit frequency is like a duck's flying schedule - rare and usually disappointing."`);
                    }
                    
                    if (data.metrics.languages.length === 1) {
                      personalizedQuotes.push(`"Knowing only ${data.metrics.languages[0]} is like being a duck that only swims in puddles - limited perspective."`);
                    }
                    
                    if (data.metrics.productivityScore <= 3) {
                      personalizedQuotes.push(`"Your productivity score is like a duck's sense of direction - consistently underwhelming."`);
                    }
                    
                    const allQuotes = [...wisdomQuotes, ...personalizedQuotes];
                    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
                  })()}
                </div>
              </div>
            </div>



            {/* Creative Metrics Dashboard */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 20, 0, 0.95) 0%, rgba(0, 40, 0, 0.9) 100%)',
          border: '2px solid #00ff7f',
          padding: '1.5rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'visible',
          clipPath: 'polygon(0px 6px, 6px 6px, 6px 0px, calc(100% - 6px) 0px, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0px calc(100% - 6px))',
        }}>
          {/* Terminal Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            gap: '1rem',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ff0000',
              boxShadow: '0 0 10px #ff0000',
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffff00',
              boxShadow: '0 0 10px #ffff00',
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00ff00',
              boxShadow: '0 0 10px #00ff00',
            }}></div>
            <div className="pixel-font" style={{
              color: '#00ff7f',
              fontSize: '0.8rem',
              marginLeft: '1rem',
              textShadow: '0 0 10px #00ff7f',
            }}>
              📊 SYSTEM_METRICS.EXE
            </div>
          </div>

          {/* Creative Metrics Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
          }}>
            {/* Followers Radar */}
            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              border: '1px solid #60a5fa',
              padding: '1rem',
              minWidth: '140px',
              textAlign: 'center',
              position: 'relative',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.6rem', 
                color: '#60a5fa',
                marginBottom: '0.5rem'
              }}>
                FOLLOWERS
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                color: '#ffffff', 
                fontWeight: 'bold',
                textShadow: '0 0 5px #60a5fa'
              }}>
                {data.metrics.followers}
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '4px',
                height: '4px',
                background: '#60a5fa',
                borderRadius: '50%',
                animation: 'powerPulse 1.5s ease-in-out infinite',
              }}></div>
            </div>

            {/* Repository Counter */}
            <div style={{
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid #34d399',
              padding: '1rem',
              minWidth: '140px',
              textAlign: 'center',
              position: 'relative',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
              <div style={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.6rem', 
                color: '#34d399',
                marginBottom: '0.5rem'
              }}>
                REPOSITORIES
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                color: '#ffffff', 
                fontWeight: 'bold',
                textShadow: '0 0 5px #34d399'
              }}>
                {data.metrics.totalRepos}
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '4px',
                height: '4px',
                background: '#34d399',
                borderRadius: '50%',
                animation: 'powerPulse 2s ease-in-out infinite',
              }}></div>
            </div>

            {/* Language Diversity */}
            <div style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid #fbbf24',
              padding: '1rem',
              minWidth: '140px',
              textAlign: 'center',
              position: 'relative',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
              <div style={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.6rem', 
                color: '#fbbf24',
                marginBottom: '0.5rem'
              }}>
                LANGUAGES
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                color: '#ffffff', 
                fontWeight: 'bold',
                textShadow: '0 0 5px #fbbf24'
              }}>
                {data.metrics.languages.length}
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '4px',
                height: '4px',
                background: '#fbbf24',
                borderRadius: '50%',
                animation: 'powerPulse 2.5s ease-in-out infinite',
              }}></div>
            </div>

            {/* Emoji Chaos Level */}
            <div style={{
              background: 'rgba(244, 114, 182, 0.1)',
              border: '1px solid #f472b6',
              padding: '1rem',
              minWidth: '140px',
              textAlign: 'center',
              position: 'relative',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎭</div>
              <div style={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.6rem', 
                color: '#f472b6',
                marginBottom: '0.5rem'
              }}>
                EMOJI CHAOS
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                color: '#ffffff', 
                fontWeight: 'bold',
                textShadow: '0 0 5px #f472b6'
              }}>
                {Math.round(data.metrics.emojiRatio * 100)}%
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '4px',
                height: '4px',
                background: '#f472b6',
                borderRadius: '50%',
                animation: 'powerPulse 3s ease-in-out infinite',
              }}></div>
            </div>

            {/* Duck Rating */}

          </div>

          {/* Terminal Footer */}
          <div style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.6rem',
            color: '#00ff7f',
            fontFamily: "'JetBrains Mono', monospace",
            opacity: 0.7,
          }}>
            &gt; METRICS_COMPILED_SUCCESSFULLY
          </div>
        </div>

            {/* Tech Stack - Compact */}
            {data.metrics.languages && data.metrics.languages.length > 0 && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(59, 130, 246, 0.6)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                imageRendering: 'pixelated',
                clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
              }}>
                <div className="pixel-font" style={{
                  color: '#22d3ee',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                }}>
                  💾 DETECTED TECHNOLOGIES
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: '0.8rem',
                }}>
                  {data.metrics.languages.map((language, index) => (
                    <div 
                      key={index} 
                      style={{
                        background: 'linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(59, 130, 246, 0.6)',
                        color: '#ddd6fe',
                        padding: '0.6rem',
                        textAlign: 'center',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        textShadow: '0 0 5px rgba(221, 214, 254, 0.3)',
                        imageRendering: 'pixelated',
                        clipPath: 'polygon(0px 2px, 2px 2px, 2px 0px, calc(100% - 2px) 0px, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0px calc(100% - 2px))',
                      }}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Log - Compact */}
            {data.analysis && data.analysis.highlights && data.analysis.highlights.length > 0 && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(16, 185, 129, 0.6)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                imageRendering: 'pixelated',
                clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
              }}>
                <div className="pixel-font" style={{
                  color: '#10b981',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                }}>
                  🔍 ANALYSIS LOG
                </div>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                  imageRendering: 'pixelated',
                  clipPath: 'polygon(0px 2px, 2px 2px, 2px 0px, calc(100% - 2px) 0px, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0px calc(100% - 2px))',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {data.analysis.highlights.map((highlight, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                        <span style={{
                          color: '#10b981',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.7rem',
                          marginTop: '0.1rem',
                          textShadow: '0 0 5px rgba(16, 185, 129, 0.5)',
                        }}>
                          [{String(index + 1).padStart(2, '0')}]
                        </span>
                        <span style={{
                          color: '#86efac',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.8rem',
                          textShadow: '0 0 5px rgba(134, 239, 172, 0.3)',
                        }}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}



            {/* Action Buttons */}
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={onNewRoast}
                className="pixel-font"
                style={{
                  padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '1rem 2rem',
                  background: 'linear-gradient(to right, #06b6d4, #8b5cf6)',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  fontSize: window.innerWidth <= 480 ? '0.8rem' : '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  imageRendering: 'pixelated',
                  clipPath: window.innerWidth <= 768 ? 'none' : 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
                  borderRadius: window.innerWidth <= 768 ? '8px' : '0',
                  minHeight: window.innerWidth <= 768 ? '48px' : 'auto',
                  boxSizing: 'border-box',
                  minWidth: window.innerWidth <= 768 ? '180px' : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                  }
                }}
              >
                ► NEW SCAN ◄
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Share - Separate Monitor */}
      <SocialShare roastData={data} />
    </div>
  );
};

export default RoastDisplay; 