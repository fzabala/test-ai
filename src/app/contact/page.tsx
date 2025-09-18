"use client";
import React from "react";
import ContactForm from "@/components/ContactForm";

const pageStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  padding: "20px",
};

const headingStyle: React.CSSProperties = {
  color: "#333",
  marginBottom: "10px",
};

const paragraphStyle: React.CSSProperties = {
  color: "#555",
  marginBottom: "20px",
};

export default function ContactPage() {
  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <p style={paragraphStyle}>
        We'd love to hear from you! Please fill out the form below.
      </p>
      <ContactForm />
    </div>
  );
}

