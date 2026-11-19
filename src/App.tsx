import { ThemeProvider } from './context/ThemeContext';
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
    <ThemeProvider>
      {/* High-resolution ESP32 studio parallax background with dynamic day/night aura */}
      <Esp32ParallaxBackground />

      {/* 60fps ambient particle constellation */}
      <AmbientParticles />

      {/* Desktop subtle custom cursor */}
      <CustomCursor />

      {/* Studio Cockpit HUD Frame with integrated navigation & day/night toggle */}
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
    </ThemeProvider>
  );
}
