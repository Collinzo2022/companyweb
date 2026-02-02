import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="gradient-text">TeknovaSystem</h3>
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
                            <li>info@TeknovaSystem.com</li>
                            <li>+1 (778) 601-3408</li>
                            <li>1040 320 GRANVILLE STREET</li>
                            <li>Vancouver, British Columbia V6C1S9</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TeknovaSystem Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
