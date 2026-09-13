import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Timeline from './components/Timeline';
import PredictionForm from './components/PredictionForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen font-body">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Timeline />
        <PredictionForm />
      </main>
      <Footer />
    </div>
  );
}
