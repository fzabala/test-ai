"use client";
import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    alert("Thank you for your message! We will get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle as React.CSSProperties}>
      <div style={formGroupStyle as React.CSSProperties}>
        <label htmlFor="name" style={labelStyle as React.CSSProperties}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle as React.CSSProperties}
        />
      </div>
      <div style={formGroupStyle as React.CSSProperties}>
        <label htmlFor="email" style={labelStyle as React.CSSProperties}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle as React.CSSProperties}
        />
      </div>
      <div style={formGroupStyle as React.CSSProperties}>
        <label htmlFor="message" style={labelStyle as React.CSSProperties}>
          Message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          style={{ ...(inputStyle as React.CSSProperties), resize: "vertical" }}
        />
      </div>
      <button type="submit" style={buttonStyle as React.CSSProperties}>
        Send Message
      </button>
    </form>
  );
};

const formStyle = {
  maxWidth: "500px",
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box" as const,
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold" as const,
  marginTop: "10px",
};

export default ContactForm;

