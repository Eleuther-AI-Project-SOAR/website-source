import './App.css'
import Navbar from './features/components/Navbar'
import ServerDirectory from './features/pages/ServerDirectory/ServerDirectory'
import About from './features/pages/About/About'
import SubmitServerForm from './features/pages/SubmitServerForm/SubmitServerForm'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'

import { servers } from './data/servers.js'

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
