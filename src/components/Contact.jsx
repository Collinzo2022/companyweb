import { useState } from 'react'
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import './Contact.css'
import { toast } from 'react-toastify'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [formStatus, setFormStatus] = useState({
        submitting: false,
        submitted: false,
        error: false
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form
        if (!validateForm()) {
            toast.error('Please fix the errors in the form', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            return
        }

        setFormStatus({ submitting: true, submitted: false, error: false })

        try {
            // TODO: Replace with your actual API endpoint
              //  await fetch(`meta.env.${VITE_API_URL}/api/contact`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Log to console (remove in production once API is connected)
            console.log('Form submitted:', formData)

            setFormStatus({ submitting: false, submitted: true, error: false })
            setFormData({ name: '', email: '', message: '' })

            toast.success(`Thank you! We'll get back to you soon.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormStatus({ submitting: false, submitted: false, error: false })
            }, 5000)

        } catch (error) {
            console.error('Form submission error:', error)
            setFormStatus({ submitting: false, submitted: false, error: true })

            // Reset error message after 5 seconds
            setTimeout(() => {
                setFormStatus({ submitting: false, submitted: false, error: false })
            }, 5000)
        }
    }

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Get in <span className="gradient-text">Touch</span></h2>
                    <p>Let's discuss how we can help your business grow</p>
                </div>

                <form className="contact-form glass" onSubmit={handleSubmit} noValidate>
                    {/* Success Message */}
                    {formStatus.submitted && (
                        <div className="form-message success">
                            <FaCheckCircle />
                            <span>Thank you! We'll get back to you soon.</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {formStatus.error && (
                        <div className="form-message error">
                            <FaExclamationCircle />
                            <span>Oops! Something went wrong. Please try again.</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={formStatus.submitting}
                            className={errors.name ? 'error' : ''}
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                            <span className="error-text" id="name-error" role="alert">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={formStatus.submitting}
                            className={errors.email ? 'error' : ''}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                            <span className="error-text" id="email-error" role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your project or inquiry..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            disabled={formStatus.submitting}
                            className={errors.message ? 'error' : ''}
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        ></textarea>
                        {errors.message && (
                            <span className="error-text" id="message-error" role="alert">
                                {errors.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={formStatus.submitting}
                    >
                        {formStatus.submitting ? (
                            <>
                                <span className="spinner"></span>
                                Sending...
                            </>
                        ) : (
                            <>
                                <FaPaperPlane /> Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact