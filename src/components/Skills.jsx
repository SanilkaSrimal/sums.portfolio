import React, { useState, useEffect } from "react";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "../hooks/useScrollAnimation";
import "./Skills.css";

const Skills = () => {
  const headerRef = useScrollAnimation("fadeInUp");
  const skillsGridRef = useStaggerAnimation(".skill-category", "scaleIn");
  const [animatedSkills, setAnimatedSkills] = useState(new Set());

  // Skill icons mapping with CSS classes for real icons
  const skillIcons = {
    "JavaScript": "fab fa-js-square",
    "Java": "fab fa-java",
    "Python": "fab fa-python",
    "PHP": "fab fa-php",
    "SQL": "fas fa-database",
    "HTML/CSS": "fab fa-html5",
    "React": "fab fa-react",
    "React Native": "fab fa-react",
    "Node.js": "fab fa-node-js",
    "Express.js": "fas fa-server",
    "Spring Boot": "fas fa-leaf",
    "TypeScript": "fab fa-js-square",
    "MongoDB": "fas fa-database",
    "MySQL": "fas fa-database",
    "GitHub": "fab fa-github",
    "VS Code": "fas fa-code",
    "NetBeans": "fas fa-coffee",
    "Project Management": "fas fa-tasks"
  };

  const skillCategories = [
    {
      title: "Languages",
      icon: "fas fa-code",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "Java", level: 85 },
        { name: "Python", level: 80 },
        { name: "PHP", level: 75 },
        { name: "SQL", level: 85 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: "fas fa-layer-group",
      skills: [
        { name: "React", level: 90 },
        { name: "React Native", level: 85 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "Spring Boot", level: 80 },
        { name: "TypeScript", level: 80 },
      ],
    },
    {
      title: "Databases & Tools",
      icon: "fas fa-tools",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "NetBeans", level: 80 },
        { name: "Project Management", level: 85 },
      ],
    },
  ];

  // Handle skill bar animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
              setTimeout(() => {
                const skillId = `${entry.target.dataset.categoryIndex}-${index}`;
                setAnimatedSkills(prev => new Set([...prev, skillId]));
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => observer.observe(category));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2>Skills & Technologies</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-grid" ref={skillsGridRef}>
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-category"
              data-category-index={categoryIndex}
            >
              <div className="category-header">
                <i className={`category-icon ${category.icon}`}></i>
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => {
                  const skillId = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillId);

                  return (
                    <div
                      key={skillIndex}
                      className={`skill-item ${isAnimated ? 'animated' : ''}`}
                    >
                      <div className="skill-content">
                        <i className={`skill-icon ${skillIcons[skill.name]}`}></i>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
