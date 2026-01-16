import { FaStar } from 'react-icons/fa'
import './Testimonials.css'

function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            company: 'TechCorp Inc.',
            text: 'Outstanding service! Their cloud migration expertise saved us time and money.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            company: 'DataFlow Solutions',
            text: 'Professional team with deep technical knowledge. Highly recommended!',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            company: 'SecureNet Systems',
            text: 'Their cybersecurity solutions gave us peace of mind. Excellent support!',
            rating: 5
        }
    ]

    return (
        <section className="testimonials section" id="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>Client <span className="gradient-text">Testimonials</span></h2>
                    <p>What our clients say about us</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card glass">
                            <div className="stars">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
