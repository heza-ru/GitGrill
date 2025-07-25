import React from 'react';
import SocialShare from './SocialShare';

const RoastDisplay = ({ data, onNewRoast }) => {
  // Duck Classification System
  const getDuckClassification = (metrics) => {
    const { productivityScore, commitFrequency, languages, emojiRatio } = metrics;
    
    if (productivityScore >= 8) {
      return { type: "ALPHA DUCK", color: "#ffd700", icon: "👑" };
    } else if (productivityScore >= 6) {
      return { type: "SENIOR DUCK", color: "#10b981", icon: "🎯" };
    } else if (productivityScore >= 4) {
      return { type: "JUNIOR DUCK", color: "#3b82f6", icon: "🌟" };
    } else if (commitFrequency < 5) {
      return { type: "FOSSIL DUCK", color: "#6b7280", icon: "🦴" };
    } else if (languages.length <= 1) {
      return { type: "ONE-TRICK DUCK", color: "#f59e0b", icon: "🥱" };
    } else if (emojiRatio > 0.7) {
      return { type: "EMOJI DUCK", color: "#ec4899", icon: "😵" };
    } else {
      return { type: "RUBBER DUCK", color: "#ef4444", icon: "🦆" };
    }
  };

  const classification = getDuckClassification(data.metrics);

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '2rem',
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
              marginBottom: '2rem',
              borderBottom: '2px solid #00ff7f',
              paddingBottom: '1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: classification.color,
                }}>
                  {classification.icon}
                </div>
                <div>
                  <h2 style={{
                    fontSize: '2rem',
                    margin: '0',
                    color: '#00ff7f',
                    fontFamily: "'Press Start 2P', cursive",
                    textShadow: '0 0 10px #00ff7f',
                  }}>
                    {data.username}
                  </h2>
                  <div style={{
                    fontSize: '0.8rem',
                    color: classification.color,
                    fontFamily: "'Press Start 2P', cursive",
                    marginTop: '0.5rem',
                    textShadow: `0 0 10px ${classification.color}`,
                  }}>
                    {classification.type}
                  </div>
                </div>
              </div>
            </div>

            {/* Roast Content - More Readable */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '3px solid rgba(16, 185, 129, 0.7)',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
              imageRendering: 'pixelated',
              clipPath: 'polygon(0px 6px, 6px 6px, 6px 0px, calc(100% - 6px) 0px, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0px calc(100% - 6px))',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: '#10b981',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
              }}>
                &gt; searduck_roast.exe --target={data.username} --mode=brutal
              </div>
              <div style={{
                color: '#ffffff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1rem',
                lineHeight: '1.8',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
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

            {/* Roast Severity Meter */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(239, 68, 68, 0.6)',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              imageRendering: 'pixelated',
              clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
            }}>
              <div className="pixel-font" style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginBottom: '1rem',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
              }}>
                🌡️ ROAST SEVERITY METER
              </div>
              <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(239, 68, 68, 0.6)',
                height: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                imageRendering: 'pixelated',
                clipPath: 'polygon(0px 2px, 2px 2px, 2px 0px, calc(100% - 2px) 0px, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0px calc(100% - 2px))',
              }}>
                <div style={{
                  width: `${Math.min(95, (10 - data.metrics.productivityScore) * 10 + 20)}%`,
                  height: '100%',
                  background: data.metrics.productivityScore <= 3 
                    ? 'linear-gradient(90deg, #dc2626 0%, #ef4444 30%, #f87171 50%, #ef4444 70%, #dc2626 100%)' 
                    : data.metrics.productivityScore <= 6 
                    ? 'linear-gradient(90deg, #d97706 0%, #f59e0b 30%, #fbbf24 50%, #f59e0b 70%, #d97706 100%)' 
                    : 'linear-gradient(90deg, #059669 0%, #10b981 30%, #34d399 50%, #10b981 70%, #059669 100%)',
                  transition: 'width 1s ease',
                  boxShadow: data.metrics.productivityScore <= 3 
                    ? '0 0 20px rgba(220, 38, 38, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : data.metrics.productivityScore <= 6 
                    ? '0 0 20px rgba(217, 119, 6, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : '0 0 20px rgba(5, 150, 105, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                }}>
                  {/* Animated shine effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    animation: 'shine 2s infinite',
                  }} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '0.6rem',
                  color: 'white',
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
                  zIndex: 2,
                }}>
                  {data.metrics.productivityScore <= 3 ? '🔥 NUCLEAR' :
                   data.metrics.productivityScore <= 6 ? '⚠️ BRUTAL' : '😅 MILD'}
                </div>
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
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
                  {[
                    `"Code quality is like a duck's quack - if no one hears it, does it really exist?"`,
                    `"The best way to debug code is to explain it to a rubber duck. You clearly need more ducks."`,
                    `"Your code commits are like duck eggs - they look promising until they hatch."`,
                    `"A programmer without tests is like a duck without water - technically functional but missing the point."`,
                    `"Your repository is like a pond - looks calm on the surface but chaos underneath."`,
                    `"Good code is like a duck's landing - it looks effortless but requires skill you clearly lack."`,
                    `"Your GitHub profile is like a duck in winter - cold, barren, and nobody wants to visit."`
                  ][Math.floor(Math.random() * 7)]}
                </div>
              </div>
            </div>

            {/* Performance Comparison */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(34, 211, 238, 0.6)',
              padding: '1.5rem',
              marginBottom: '2rem',
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
                📊 YOU VS THE WORLD
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                width: '100%',
                overflow: 'hidden',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📉</div>
                  <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#22d3ee', marginBottom: '0.5rem' }}>
                    PERCENTILE RANK
                  </div>
                  <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>
                    {data.metrics.productivityScore <= 3 ? 'BOTTOM 5%' :
                     data.metrics.productivityScore <= 5 ? 'BOTTOM 25%' :
                     data.metrics.productivityScore <= 7 ? 'BOTTOM 50%' : 'TOP 30%'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#7dd3fc', marginTop: '0.3rem' }}>
                    of developers
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎭</div>
                  <div className="pixel-font" style={{ fontSize: '0.6rem', color: '#22d3ee', marginBottom: '0.5rem' }}>
                    DEVELOPER TYPE
                  </div>
                  <div style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>
                    {data.metrics.commitFrequency < 5 ? 'GHOST' :
                     data.metrics.languages.length <= 1 ? 'ONE-TRICK' :
                     data.metrics.emojiRatio > 0.5 ? 'EMOJI KID' : 'BASIC'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#7dd3fc', marginTop: '0.3rem' }}>
                    stereotype
                  </div>
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
            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid #a855f7',
              padding: '1rem',
              minWidth: '140px',
              textAlign: 'center',
              position: 'relative',
              clipPath: 'polygon(0px 3px, 3px 3px, 3px 0px, calc(100% - 3px) 0px, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0px calc(100% - 3px))',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🦆</div>
              <div style={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.6rem', 
                color: '#a855f7',
                marginBottom: '0.5rem'
              }}>
                DUCK RATING
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                color: '#ffffff', 
                fontWeight: 'bold',
                textShadow: '0 0 5px #a855f7'
              }}>
                {data.metrics.productivityScore}/10
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '4px',
                height: '4px',
                background: '#a855f7',
                borderRadius: '50%',
                animation: 'powerPulse 1s ease-in-out infinite',
              }}></div>
            </div>
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
                  padding: '1rem 2rem',
                  background: 'linear-gradient(to right, #06b6d4, #8b5cf6)',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  imageRendering: 'pixelated',
                  clipPath: 'polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
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