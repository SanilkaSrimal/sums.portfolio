import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.css'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500)
      }
    })

    // Animate progress bar
    tl.to({}, {
      duration: 2,
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100))
      }
    })

    // Animate loading screen out
    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-animation">
          <h1 className="loading-title">
            <span className="gradient-text">Shanilka Srimal</span>
          </h1>
          <p className="loading-subtitle">Full Stack Developer</p>
        </div>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
