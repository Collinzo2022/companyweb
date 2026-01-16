import Contact from '../components/Contact'
import './ContactPage.css'

function ContactPage() {
    return (
        <div className="contact-page">
            <section className="contact-page-hero">
                <div className="container">
                    <h1>Contact <span className="gradient-text">Us</span></h1>
                    <p>Let's start a conversation about your IT needs</p>
                </div>
            </section>

            <Contact />

            <section className="contact-info section">
                <div className="container">
                    <div className="contact-info-grid">
                        <div className="info-card glass">
                            <h3>Email</h3>
                            <p>info@technova.com</p>
                            <p>support@technova.com</p>
                        </div>
                        <div className="info-card glass">
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                            <p>+1 (555) 987-6543</p>
                        </div>
                        <div className="info-card glass">
                            <h3>Office</h3>
                            <p>123 Tech Street</p>
                            <p>San Francisco, CA 94102</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
