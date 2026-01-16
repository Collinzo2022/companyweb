import './AboutPage.css'

function AboutPage() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1>About <span className="gradient-text">TechNova</span></h1>
                    <p>Innovating IT solutions since 2010</p>
                </div>
            </section>

            <section className="about-content section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text">
                            <h2>Who We Are</h2>
                            <p>
                                TechNova Solutions is a leading provider of innovative IT services and solutions.
                                With over a decade of experience, we've helped hundreds of businesses transform
                                their technology infrastructure and achieve their digital goals.
                            </p>
                            <p>
                                Our team of certified professionals brings deep expertise across cloud computing,
                                cybersecurity, network infrastructure, and IT consulting. We're committed to
                                delivering excellence in every project we undertake.
                            </p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card glass">
                                <h3 className="gradient-text">500+</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-card glass">
                                <h3 className="gradient-text">200+</h3>
                                <p>Happy Clients</p>
                            </div>
                            <div className="stat-card glass">
                                <h3 className="gradient-text">50+</h3>
                                <p>Team Members</p>
                            </div>
                            <div className="stat-card glass">
                                <h3 className="gradient-text">99.9%</h3>
                                <p>Uptime SLA</p>
                            </div>
                        </div>
                    </div>

                    <div className="mission-section">
                        <h2>Our Mission</h2>
                        <p>
                            To empower businesses with cutting-edge technology solutions that drive growth,
                            enhance security, and improve operational efficiency. We believe in building
                            long-term partnerships based on trust, innovation, and exceptional service.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
