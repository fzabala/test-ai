import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.paragraph}>
        Welcome to our About page! This is a placeholder for information about our project,
        team, or company. Our mission is to provide high-quality solutions and
        excellent service to our users.
      </p>
      <p className={styles.paragraph}>
        We are dedicated to innovation and continuous improvement, always striving
        to exceed expectations and deliver value.
      </p>
    </div>
  );
};

export default AboutPage;

