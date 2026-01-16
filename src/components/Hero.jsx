import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'
import './Hero.css'

function Hero() {
    const words = [
        'Innovative IT Solutions',
        'Cloud Infrastructure',
        'Cybersecurity Excellence',
        'Digital Transformation'
    ]

    const typedText = useTypewriter(words, 100, 50, 2000)

    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="container hero-content">
                <div className="hero-text fade-in-up">
                    <h1>
                        We Deliver <br />
                        <span className="gradient-text typewriter">{typedText}<span className="cursor">|</span></span>
                    </h1>
                    <p className="hero-subtitle">
                        Empowering businesses with cutting-edge technology solutions.
                        From cloud infrastructure to cybersecurity, we've got you covered.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/solutions" className="btn btn-primary">Explore Solutions</Link>
                        <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
