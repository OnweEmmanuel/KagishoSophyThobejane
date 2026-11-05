import { useRef } from 'react';
import { Nav } from './components/Nav';
import { DraftNotice } from './components/DraftNotice';
import { CrimeTape } from './components/CrimeTape';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Statement } from './sections/Statement';
import { Focus } from './sections/Focus';
import { Path } from './sections/Path';
import { Experience } from './sections/Experience';
import { Credentials } from './sections/Credentials';
import { Skills } from './sections/Skills';
import { Honours } from './sections/Honours';
import { Service } from './sections/Service';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useScrollAnimations } from './lib/useScrollAnimations';
import { useCardFX } from './lib/useCardFX';

export default function App() {
  const main = useRef<HTMLElement>(null);
  useScrollAnimations(main);
  useCardFX(main);

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main ref={main}>
        <Hero />
        <CrimeTape />
        <About />
        <Statement />
        <Focus />
        <Path />
        <Experience />
        <Credentials />
        <Skills />
        <Honours />
        <Service />
        <Contact />
      </main>
      <Footer />
      <DraftNotice />
    </>
  );
}
