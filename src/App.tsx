import Esp32ParallaxBackground from './components/Esp32ParallaxBackground';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Achievements from './components/Achievements';
import Academics from './components/Academics';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* High-resolution ESP32 studio parallax background */}
      <Esp32ParallaxBackground />

      {/* Desktop subtle custom cursor */}
      <CustomCursor />

      {/* Foreground navigation and sections */}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Internship />
        <Achievements />
        <Academics />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
