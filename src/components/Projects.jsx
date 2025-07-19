import React, { useState } from "react";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "../hooks/useScrollAnimation";
import "./Projects.css";
import market_place from "../assets/mp.jpeg";
import computer_store from "../assets/computerstore.png";
import skill from "../assets/ss.jpeg";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description:
        "A modern e-commerce platform with user authentication, Live chat box, user management, and slary management. Built with responsive design and modern web technologies.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&h=980&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Express.js"],
      category: "fullstack",
      githubUrl: "https://github.com/SanilkaSrimal/ITP80-",
    },
    {
      id: 2,
      title: "Skill Sharing Platform",
      description:
        "A React + Spring Boot-based social application for skill exchange. Features user authentication, monetization management and real-time communication between users looking to share and learn skills.",
      image:skill,
      technologies: ["React", "Spring Boot", "Java", "MySQL"],
      category: "fullstack",
      githubUrl: "https://github.com/KalpaVidusha/skill-sharing-platform",
    },
    {
      id: 3,
      title: "Online Computer Store",
      description:
        "MERN-based user and salary management system for computer hardware. Includes product catalog, inventory tracking, quotation generation, and order management.Built with responsive design and modern web technologies.",
      image:computer_store,
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      category: "fullstack",
      githubUrl: "https://github.com/Buwaneka99/Ecommerce-Computer-Store",
    },
    {
      id: 4,
      title: "Online market place",
      description:
        "A feature-rich online marketplace built using PHP, designed to streamline user and employee salary management. The platform supports a dynamic product catalog, real-time inventory tracking, quotation generation, and efficient order processing. With a responsive design and integration of modern web technologies, the system delivers a smooth, accessible experience across all devices—optimizing operations for both administrators and customers."
,
      image:market_place,
      technologies: ["PHP", "HTML5", "CSS3","Sql"],
      category: "frontend",
      githubUrl: "https://github.com/SanilkaSrimal/Online-marketplace",
    },
    
  ];

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "fullstack", label: "Full Stack" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${
                filter === category.key ? "active" : ""
              }`}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-screenshot"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href={project.githubUrl}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
