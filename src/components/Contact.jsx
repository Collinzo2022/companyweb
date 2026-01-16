import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Thank you! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Get in <span className="gradient-text">Touch</span></h2>
                    <p>Let's discuss how we can help your business grow</p>
                </div>

                <form className="contact-form glass" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <FaPaperPlane /> Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact
