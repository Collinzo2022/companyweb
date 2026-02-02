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
                            <p>+1 (778) 601-3408</p>
                        </div>
                        <div className="info-card glass">
                            <h3>Office</h3>
                            <p>1040 320 GRANVILLE STREET</p>
                            <p>Vancouver, British Columbia V6C1S9</p>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
