// src/components/Skills.jsx
import React from 'react';
import { skills } from '../data/skills';
import { useInView } from 'react-intersection-observer';

const SkillCard = ({ icon, name, level }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-500 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } group`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{name}</h3>
          <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-400"
              style={{ 
                width: inView ? `${level}%` : '0%'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillSection = ({ title, items }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`mb-8 transition-all duration-500 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      <h3 className="text-xl font-bold mb-4 text-blue-500">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((skill, index) => (
          <SkillCard 
            key={index}
            icon={getSkillIcon(skill.name || skill)}
            name={skill.name || skill}
            level={skill.level || 85}
          />
        ))}
      </div>
    </div>
  );
};

// Function to get emoji icons for different skills
const getSkillIcon = (skillName) => {
  const icons = {
    // Frontend
    "React": "⚛️",
    "JavaScript": "📜",
    "TypeScript": "🔷",
    "HTML/CSS": "🎨",
    "Tailwind": "🌊",
    "Vue.js": "💚",
    
    // Backend
    "Node.js": "🟢",
    "Python": "🐍",
    "Java": "☕",
    "PHP": "🐘",
    "MongoDB": "🍃",
    "PostgreSQL": "🐘",
    
    // DevOps/Tools
    "Git": "📚",
    "Docker": "🐳",
    "AWS": "☁️",
    "Linux": "🐧",
    "CI/CD": "🔄",
    
    // Default icon for undefined skills
    "default": "💻"
  };
  
  return icons[skillName] || icons.default;
};

function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="skills" className="py-20 px-6 bg-gray-900">
      <div 
        ref={ref}
        className={`container mx-auto max-w-6xl transition-all duration-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <SkillSection key={category} title={category} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
