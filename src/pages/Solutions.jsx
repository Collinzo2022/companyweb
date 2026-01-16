import { FaCloud, FaShieldAlt, FaServer, FaNetworkWired, FaDatabase, FaLaptopCode, FaLock, FaChartLine } from 'react-icons/fa'
import './Solutions.css'

function Solutions() {
    const solutions = [
        {
            icon: <FaCloud />,
            title: 'Cloud Migration',
            description: 'Seamless migration to AWS, Azure, or Google Cloud with zero downtime.',
            features: ['Infrastructure as Code', 'Auto-scaling', 'Cost optimization']
        },
        {
            icon: <FaShieldAlt />,
            title: 'Cybersecurity',
            description: 'Comprehensive security solutions to protect your digital assets.',
            features: ['Penetration testing', 'Security audits', 'Compliance management']
        },
        {
            icon: <FaServer />,
            title: 'Server Management',
            description: '24/7 monitoring and management of your server infrastructure.',
            features: ['Performance monitoring', 'Automated backups', 'Disaster recovery']
        },
        {
            icon: <FaNetworkWired />,
            title: 'Network Solutions',
            description: 'Design and implementation of robust network infrastructure.',
            features: ['SD-WAN', 'Load balancing', 'Network security']
        },
        {
            icon: <FaDatabase />,
            title: 'Data Management',
            description: 'Secure data storage, backup, and recovery solutions.',
            features: ['Real-time replication', 'Encrypted backups', 'Quick recovery']
        },
        {
            icon: <FaLaptopCode />,
            title: 'IT Consulting',
            description: 'Strategic technology consulting to drive business growth.',
            features: ['Digital transformation', 'Technology roadmap', 'Best practices']
        },
        {
            icon: <FaLock />,
            title: 'Compliance & Governance',
            description: 'Ensure your IT infrastructure meets industry standards.',
            features: ['GDPR compliance', 'SOC 2', 'ISO certifications']
        },
        {
            icon: <FaChartLine />,
            title: 'Business Intelligence',
            description: 'Transform data into actionable insights for better decisions.',
            features: ['Data analytics', 'Custom dashboards', 'Predictive modeling']
        }
    ]

    return (
        <div className="solutions-page">
            <section className="solutions-hero">
                <div className="container">
                    <h1>Our <span className="gradient-text">Solutions</span></h1>
                    <p>Comprehensive IT services designed to transform your business</p>
                </div>
            </section>

            <section className="solutions-content section">
                <div className="container">
                    <div className="solutions-grid-detailed">
                        {solutions.map((solution, index) => (
                            <div key={index} className="solution-card-detailed glass">
                                <div className="solution-header">
                                    <div className="solution-icon-large">{solution.icon}</div>
                                    <h3>{solution.title}</h3>
                                </div>
                                <p>{solution.description}</p>
                                <ul className="features-list">
                                    {solution.features.map((feature, i) => (
                                        <li key={i}>✓ {feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Solutions
