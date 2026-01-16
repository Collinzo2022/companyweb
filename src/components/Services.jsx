import { FaCloud, FaShieldAlt, FaServer, FaNetworkWired, FaDatabase, FaLaptopCode } from 'react-icons/fa'
import './Services.css'

function Services() {
    const services = [
        {
            icon: <FaCloud />,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and migration services for modern businesses.'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Cybersecurity',
            description: 'Comprehensive security audits and protection against evolving threats.'
        },
        {
            icon: <FaServer />,
            title: 'Server Management',
            description: 'Enterprise-grade server solutions with 24/7 monitoring and support.'
        },
        {
            icon: <FaNetworkWired />,
            title: 'Network Infrastructure',
            description: 'Design and implementation of robust, high-performance networks.'
        },
        {
            icon: <FaDatabase />,
            title: 'Data Backup & Recovery',
            description: 'Reliable backup solutions and disaster recovery planning.'
        },
        {
            icon: <FaLaptopCode />,
            title: 'IT Consulting',
            description: 'Strategic technology consulting to drive business growth.'
        }
    ]

    return (
        <section className="services section" id="services">
            <div className="container">
                <div className="section-header">
                    <h2>Our <span className="gradient-text">Solutions</span></h2>
                    <p>Comprehensive IT services tailored to your business needs</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card glass">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
