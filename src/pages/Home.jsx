import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

function Home() {
    return (
        <div className="home">
            <Hero />
            <Services />
            <Testimonials />
            <Contact />
        </div>
    )
}

export default Home
