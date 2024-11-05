import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { personalInfo } from './data/personal';

function App() {
  return (
    <div className="min-h-screen text-white">
      <nav className="fixed top-0 w-full backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            <div className="space-x-8">
              <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <div className="bg-gray-900">
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>

      <footer className="bg-gray-800 py-8 px-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} {personalInfo.name} • Built with React and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
