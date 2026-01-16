import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="gradient-text">TechNova</h3>
                        <p>Innovative IT solutions for modern businesses.</p>
                        <div className="social-links">
                            <a href="#" aria-label="GitHub"><FaGithub /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Email"><FaEnvelope /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/solutions">Solutions</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#services">Cloud Solutions</a></li>
                            <li><a href="#services">Cybersecurity</a></li>
                            <li><a href="#services">IT Consulting</a></li>
                            <li><a href="#services">Data Backup</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <ul>
                            <li>info@technova.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Tech Street</li>
                            <li>San Francisco, CA</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TechNova Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
