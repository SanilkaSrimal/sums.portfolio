import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./Hero.css";
import heroPhoto from "../assets/portfolio.jpeg";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const descriptionRef = useRef();
  const buttonsRef = useRef();
  const imageRef = useRef();
  const typingRef = useRef();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup - hide elements
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        buttonsRef.current,
        imageRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            // Start typing animation after other animations complete
            gsap.to(typingRef.current, {
              text: "Full Stack Developer",
              duration: 2,
              ease: "none",
            });
          },
        },
        "-=0.5"
      );

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: "+=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      gsap.to(heroRef.current, {
        y: parallax,
        duration: 0.5,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef}>
              Hi, I'm <span className="highlight">Shanilka Srimal</span>
            </h1>
            <h2 className="hero-subtitle" ref={typingRef}></h2>
            <p className="hero-description" ref={descriptionRef}>
              A passionate and versatile Full Stack Developer with hands-on
              experience in building dynamic web applications using MERN Stack,
              Java Spring Boot, TypeScript, and more. I thrive in full project
              lifecycles—from designing responsive frontends to developing
              scalable backend APIs.
            </p>
            <div className="hero-buttons" ref={buttonsRef}>
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image" ref={imageRef}>
            <div className="profile-image">
              <img
                src={heroPhoto}
                alt="Dilmi Jayanetthi"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div
            className="scroll-arrow"
            onClick={() => scrollToSection("about")}
          >
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
