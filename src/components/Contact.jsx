import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with public key from environment variables
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // EmailJS configuration from environment variables
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceID || !templateID) {
        throw new Error('EmailJS configuration missing');
      }

      // Template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'sanilkasrima01@gmail.com', // Your email
        reply_to: formData.email,
      };

      // Send email
      const result = await emailjs.send(serviceID, templateID, templateParams);

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setSubmitStatus("");
        }, 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);

      // If EmailJS is not configured, show a helpful message
      if (error.message === 'EmailJS configuration missing') {
        setSubmitStatus("config");
      } else {
        setSubmitStatus("error");
      }

      setTimeout(() => {
        setSubmitStatus("");
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "dissanayake.sumali@gmail.com",
      link: "mailto:dissanayake.sumali@gmail.com",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+94 760 307 440",
      link: "tel:+94760307440",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Mount Lavinia, Sri Lanka",
      link: "#",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/sumali-dissanayake-b7749a1ba/",
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p className="section-subtitle">
            Let's work together on your next project
          </p>
          <p className="email-info">
            📧 Messages sent through this form will be delivered directly to my email inbox
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's talk about everything!</h3>
            <p>
              Don't like forms? Send me an email. 👋 I'm always excited to
              discuss new opportunities and interesting projects.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h4>Connect with me:</h4>
              <div className="social-icons">
                <a
                  href="https://github.com/SanilkaSrimal"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sumali-dissanayake-b7749a1ba/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:dissanayake.sumali@gmail.com"
                  className="social-link"
                >
                  Email
                </a>
                <a href="tel:+94760307440" className="social-link">
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. I'll get back to you soon!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="error-message">
                  ❌ Sorry, there was an error sending your message. Please try again or email me directly.
                </div>
              )}

              {submitStatus === "config" && (
                <div className="config-message">
                  ⚙️ Email service is being configured. Please email me directly at dilmijayanetthi66@gmail.com for now.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
