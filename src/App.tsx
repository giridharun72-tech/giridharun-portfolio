import StudioCockpitFrame from './components/layout/StudioCockpitFrame';
import Esp32ParallaxBackground from './components/Esp32ParallaxBackground';
import AmbientParticles from './components/common/AmbientParticles';
import CustomCursor from './components/common/CustomCursor';
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
      {/* High-resolution ESP32 studio parallax background with radiant halo */}
      <Esp32ParallaxBackground />

      {/* 60fps ambient particle constellation */}
      <AmbientParticles />

      {/* Desktop subtle custom cursor */}
      <CustomCursor />

      {/* Studio Cockpit HUD Frame with integrated navigation */}
      <StudioCockpitFrame>
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
      </StudioCockpitFrame>
    </>
  );
}
