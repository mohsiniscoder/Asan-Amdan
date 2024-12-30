import React from 'react';
import ".././components/styles/AboutPage.css";  // Import your updated CSS

const developers = [
  {
    name: 'Awais Ashraf',
    role: 'Frontend Developer',
    picture: 'https://media.licdn.com/dms/image/v2/D5603AQG__Kc9sLqr4Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1680436855724?e=1741219200&v=beta&t=MbqWyeBYOQmzl45zuJNoMbCiX_MUKN6TUi5U0A27PzE',
    description: 'Awais is a passionate front-end developer focused on building responsive and dynamic user interfaces.',
    email: 'mhawais431@gmail.com',
    linkedin: 'https://www.linkedin.com/in/muhammad-awais-ashraf/'
  },
  {
    name: 'Mohsin Shahbaz',
    role: 'Frontend Developer',
    picture: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw5BWXnHUCQ36rDMLR8rFZQn5GtxaHrAgv9U81I0_IBpywFe9oYiI1jjV3rXTci63YRdinjek6C9Dgf-cWrR4w_0767cBZPbt-uWFItYTXjffkA5u3wL_zpO0bgAujuGPfDmkvQ9dd0nEuUKA1udqqP0-dXfG-Qn-tQJEmVTJ_-SF7IstcAykpX-0T0W3I/s320/20241216_153414.jpg',
    description: 'Mohsin is a front-end developer with a strong passion for creating seamless and intuitive web experiences.',
    email: 'mohsinchai894@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mohsin-shahbaz-a75701270/'
  },
  {
    name: 'Abrar Hussein',
    role: 'MERN Stack Developer',
    picture: 'https://media.licdn.com/dms/image/v2/D4D03AQF7Ik-i2gfVFw/profile-displayphoto-shrink_800_800/B4DZQPE9eJGgAg-/0/1735419748058?e=1741219200&v=beta&t=sDXzxQ6R1qtDTbK-KCq0wInW1QO5IiseLIFp-VMFGFk',
    description: 'Abrar specializes in MERN Stack development, focusing on building high-performance backends and scalable solutions.',
    email: 'abrardeveloperr@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abrar-hussain-aa3099293/'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <section className="about-section">
        <p className="intro-text">
          We are a dedicated team of developers, working to bring innovative and efficient web solutions to life. 
          Our focus is on delivering user-friendly, high-performance applications that meet the needs of today’s digital world.
        </p>
        
        <h2>Our Vision</h2>
        <p>
          We envision a future where technology bridges the gap between user needs and digital experiences. 
          Our mission is to create seamless solutions that not only look great but also function effortlessly.
        </p>

        <h2>Meet The Team</h2>
        <p className="team-description">
          Our team is made up of passionate developers, each bringing unique skills and a wealth of knowledge to the table.
          Here's a bit more about the people behind our work:
        </p>

        <div className="team-container">
          {developers.map((developer, index) => (
            <div key={index} className="developer-card">
              <img src={developer.picture} alt={developer.name} className="developer-photo" />
              <h3>{developer.name}</h3>
              <p>{developer.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p>If you'd like to collaborate or have any questions, feel free to reach out to us!</p>
        <ul className="contact-list">
          {developers.map((developer, index) => (
            <li key={index}>
              <strong>{developer.name}</strong>: 
              <a href={`mailto:${developer.email}`} className="contact-link">Email</a> | 
              <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
