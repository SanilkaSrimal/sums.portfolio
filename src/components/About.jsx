import React, { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useCustomCursor } from "../hooks/useCustomCursor";
import "./About.css";
import "./CustomCursor.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef();
  const headerRef = useScrollAnimation("fadeInUp");
  const textRef = useScrollAnimation("fadeInLeft");
  const statsRef = useScrollAnimation("fadeInUp");

  // Initialize custom cursor
  useCustomCursor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2>About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-text-full" ref={textRef}>
            <h3 className="about-title">
              Hello! I'm Shanilka Srimal
            </h3>

            <div className="about-description">
              <p className="slide-in-text">
                I'm a passionate and versatile Full Stack Developer with hands-on
                experience in building dynamic web applications using MERN Stack,
                Java Spring Boot, TypeScript, and more. Currently pursuing my BSc
                in Information Technology at SLIIT, I thrive in full project
                lifecycles—from designing responsive frontends to developing
                scalable backend APIs.
              </p>
              <p className="slide-in-text delay-1">
                I bring strong skills in object-oriented programming,
                real-time systems, and project management, always aiming for
                creative and efficient solutions.
              </p>
              <p className="slide-in-text delay-2">
                <strong>Languages:</strong> English (Fluent), Sinhala (Fluent)
              </p>
              <p className="slide-in-text delay-3">
                <strong>Soft Skills:</strong> Time Management, Creativity, Team
                Collaboration, Problem Solving, Communication
              </p>
            </div>

            <div className="about-stats" ref={statsRef}>
              <div className="stat hover-effect" data-cursor="pointer">
                <div className="stat-icon">🚀</div>
                <h4>5+</h4>
                <p>Projects Completed</p>
              </div>
              <div className="stat hover-effect" data-cursor="pointer">
                <div className="stat-icon">💼</div>
                <h4>2+</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat hover-effect" data-cursor="pointer">
                <div className="stat-icon">🌍</div>
                <h4>2</h4>
                <p>Languages Spoken</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
