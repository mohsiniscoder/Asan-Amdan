import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="fcontainer">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We connect talented professionals with clients worldwide. Our mission is to create opportunities for everyone to thrive in the digital age.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.jpg" alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://th.bing.com/th/id/R.03f40b67b63d9c1c1a5a792109bbc699?rik=8HhXk%2b5PP7XurQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2finstagram%2finstagram_PNG10.png&ehk=%2f7%2ftghrL31GFpelB7DZvprao8IZHRvmhi0BpDsEAZgI%3d&risl=&pid=ImgRaw&r=0" alt="Instagram" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://th.bing.com/th/id/R.0a7f520070a64f2f0c11a8b1afc6eaa4?rik=dIqxLgIFb3LUUQ&pid=ImgRaw&r=0" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Asan Amdan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
