import './App.css'
import Navbar from './features/components/Navbar'
import ServerDirectory from './features/pages/ServerDirectory/ServerDirectory'
import About from './features/pages/About/About'
import SubmitServerForm from './features/pages/SubmitServerForm/SubmitServerForm'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'

const servers = [
      { name: 'EleutherAI', rating: 8.1, tag: 'Research', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Lots of resources; community projects to do and very active community.', features: ['Reading Group', 'Paper Channel', 'VC events/Office Hours', 'Jobs Board'] },
      { name: 'Cohere for AI', rating: 8.1, tag: 'Research', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Pretty good. Lots of stuff to do for various skill levels.', features: ['Reading Group', 'Paper Channel', 'VC events/Office Hours'] },
      { name: 'AI Safety Camp', rating: 7.8, tag: 'Alignment', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Focused on AI safety research and education with regular workshops.', features: ['Reading Group', 'Paper Channel', 'VC events/Office Hours', 'Jobs Board'] },
      { name: 'GPU Collective', rating: 7.2, tag: 'GPU', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Community for sharing GPU resources and optimization techniques.', features: ['VC events/Office Hours', 'Jobs Board'] },
      { name: 'Seoul AI Hub', rating: 6.9, tag: 'General', activityLevel: 'Active', language: 'Korean', location: 'Discord', description: 'Korean-speaking AI community with regular paper discussions.', features: ['Reading Group', 'Paper Channel', 'Jobs Board'] },
      { name: 'Prompt Engineering Masters', rating: 7.5, tag: 'Prompting', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Advanced techniques and strategies for prompt engineering.', features: ['VC events/Office Hours'] },
      { name: 'Robotics Research Group', rating: 7.4, tag: 'Robotics', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Connect with AI entrepreneurs and find co-founders.', features: ['VC events/Office Hours', 'Jobs Board'] },
      { name: 'Neural AI 9', rating: 7.0, tag: 'Research', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'A place for all things related to neural networks.', features: ['Paper Channel'] },
      { name: 'Deep AI 10', rating: 8.7, tag: 'Hackathons', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Weekly hackathons and coding challenges.', features: ['VC events/Office Hours', 'Jobs Board'] },
      { name: 'AI Startup Incubator', rating: 8.0, tag: 'Entrepreneurship', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Connect with AI entrepreneurs and find co-founders.', features: ['VC events/Office Hours', 'Jobs Board'] },
      { name: 'Casual Coders', rating: 6.5, tag: 'Casual', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'A friendly place to chat about code and projects.', features: ['Reading Group'] },
      { name: 'LLM Builders', rating: 9.1, tag: 'LLM', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'For developers and researchers working on Large Language Models.', features: ['Paper Channel', 'Jobs Board'] },
      { name: 'Bug Bounty Hunters', rating: 7.9, tag: 'Bug bounties', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Find and report vulnerabilities in AI systems.', features: [] },
      { name: 'AI Conference Hub', rating: 8.3, tag: 'Conference', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Discuss upcoming AI conferences and share insights.', features: ['VC events/Office Hours'] },
      { name: 'Crypto & AI', rating: 6.8, tag: 'Crypto', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Exploring the intersection of cryptocurrency and artificial intelligence.', features: [] },
      { name: 'Puzzle Solvers AI', rating: 7.1, tag: 'Puzzle', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Using AI to solve complex puzzles and games.', features: ['Reading Group'] },
      { name: 'Generative Art Gallery', rating: 8.5, tag: 'Generation', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Showcase and discuss AI-generated art.', features: ['Paper Channel'] },
      { name: 'AI for Education', rating: 7.7, tag: 'Education', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Developing and using AI tools for learning.', features: ['Reading Group', 'Jobs Board'] },
      { name: 'Open Source AI Tools', rating: 8.4, tag: 'Tool', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Contribute to and discuss open-source AI projects.', features: ['Jobs Board'] },
      { name: 'Korean AI Tech', rating: 7.3, tag: 'General', activityLevel: 'Active', language: 'Korean', location: 'Discord', description: 'A Korean-speaking community for all AI topics.', features: ['Reading Group', 'Paper Channel'] },
      { name: 'Slack AI Innovators', rating: 7.0, tag: 'Tool', activityLevel: 'Semi-active', language: 'English', location: 'Slack', description: 'A Slack community for AI developers.', features: [] },
      { name: 'IRL AI Meetup Group', rating: 8.8, tag: 'Conference', activityLevel: 'Active', language: 'English', location: 'IRL', description: 'Organizing in-person AI meetups and events.', features: ['VC events/Office Hours'] },
      { name: 'The Alignment Problem', rating: 9.2, tag: 'Alignment', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Dedicated to solving the AI alignment problem.', features: ['Reading Group', 'Paper Channel'] },
      { name: 'Hackathon Heroes', rating: 8.6, tag: 'Hackathons', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Team up for AI hackathons and competitions.', features: ['Jobs Board'] },
      { name: 'GPU Traders', rating: 6.7, tag: 'GPU', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'A community for buying, selling, and trading GPUs.', features: [] },
      { name: 'AI Ethics Discussion', rating: 8.2, tag: 'Alignment', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Debating the ethical implications of AI.', features: ['Reading Group'] },
      { name: 'Machine Learning Cafe', rating: 7.4, tag: 'Casual', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'A relaxed space for ML enthusiasts.', features: ['Reading Group'] },
      { name: 'Prompt Perfect', rating: 7.9, tag: 'Prompting', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Master the art of prompt engineering.', features: ['Paper Channel'] },
      { name: 'Code Generation Guild', rating: 8.1, tag: 'Generation', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Exploring AI-powered code generation.', features: ['Jobs Board'] },
      { name: 'Robotics & Automation', rating: 8.5, tag: 'Robotics', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Building and programming intelligent robots.', features: ['Jobs Board'] },
      { name: 'AI Company Connect', rating: 8.9, tag: 'Company', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'A network for professionals at AI companies.', features: ['VC events/Office Hours', 'Jobs Board'] },
      { name: 'The Puzzle Box', rating: 7.6, tag: 'Puzzle', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'A community for AI-based puzzle solving.', features: ['Reading Group'] },
      { name: 'LLM Fine-Tuning', rating: 8.8, tag: 'LLM', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Techniques and best practices for fine-tuning LLMs.', features: ['Paper Channel'] },
      { name: 'AI in Finance', rating: 7.8, tag: 'Crypto', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Applying AI to financial markets and cryptocurrency.', features: ['Jobs Board'] },
      { name: 'EdTech AI', rating: 7.5, tag: 'Education', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Innovating in education with AI.', features: ['Reading Group'] },
      { name: 'The Turing Test', rating: 7.2, tag: 'Casual', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Casual chats about AI and consciousness.', features: [] },
      { name: 'AI Hardware Hub', rating: 8.0, tag: 'GPU', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Discussions on hardware for AI, including GPUs and TPUs.', features: ['Jobs Board'] },
      { name: 'Startup Founders AI', rating: 8.7, tag: 'Entrepreneurship', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'A community for founders of AI startups.', features: ['VC events/Office Hours'] },
      { name: 'AI Art Prompters', rating: 8.3, tag: 'Prompting', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Sharing prompts and creations for AI art generation.', features: [] },
      { name: 'Research Paper Club', rating: 8.6, tag: 'Research', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Weekly discussions of new AI research papers.', features: ['Reading Group', 'Paper Channel'] },
      { name: 'Autonomous Agents', rating: 9.0, tag: 'Robotics', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Developing autonomous AI agents.', features: ['Jobs Board'] },
      { name: 'AI for Good', rating: 8.9, tag: 'Alignment', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Using AI to solve social and environmental problems.', features: ['VC events/Office Hours'] },
      { name: 'The Generative Lounge', rating: 7.9, tag: 'Generation', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'A place to share and discuss generative models.', features: ['Paper Channel'] },
      { name: 'AI Toolmakers', rating: 8.2, tag: 'Tool', activityLevel: 'Very Active', language: 'English', location: 'Discord', description: 'Building the next generation of AI tools.', features: ['Jobs Board'] },
      { name: 'Global AI Conference', rating: 8.5, tag: 'Conference', activityLevel: 'Active', language: 'English', location: 'IRL', description: 'The official server for the Global AI Conference.', features: ['VC events/Office Hours'] },
      { name: 'Data Science Dojo', rating: 7.7, tag: 'Education', activityLevel: 'Active', language: 'English', location: 'Discord', description: 'Learn and practice data science with a supportive community.', features: ['Reading Group', 'Jobs Board'] },
      { name: 'The Logic Puzzle', rating: 7.3, tag: 'Puzzle', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Solving logic puzzles with and without AI.', features: [] },
      { name: 'Corporate AI Solutions', rating: 8.4, tag: 'Company', activityLevel: 'Active', language: 'English', location: 'Slack', description: 'Discussing the implementation of AI in large companies.', features: ['Jobs Board'] },
      { name: 'Web3 & AI Nexus', rating: 7.1, tag: 'Crypto', activityLevel: 'Semi-active', language: 'English', location: 'Discord', description: 'Exploring the synergy between Web3 and AI.', features: [] },
  ];


const allTags = {
  'Server Type': ["Research", "Hackathons", "Alignment", "GPU", "General", "Education", "Tool", "Casual", "LLM", "Prompting", "Bug Bounties", "Conference", "Crypto", "Entrepreneurship", "Company", "Robotics", "Puzzle", "Generation"],
  'Activity Level': ["Very Active", "Active", "Semi-active", "Mostly Inactive", "Inactive"],
  'Language': ["English", "Korean"],
  'Location': ["Discord", "Slack", "IRL"],
  'Others': ["Reading Group", "Paper Channel", "VC events/Office Hours", "Jobs Board"]
}

const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Submit Server', path: '/submit' }
    ];

const RATING_THRESHOLD = 7.5

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col">
        <Navbar navItems={navItems} toggleTheme={toggleTheme}></Navbar>
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path={navItems[0].path} element={<ServerDirectory servers={servers} allTags={allTags} ratingThreshold={RATING_THRESHOLD}/>}/>
            <Route path={navItems[1].path} element={<About/>}/>
            <Route path={navItems[2].path} element={<SubmitServerForm allTags={allTags}/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
