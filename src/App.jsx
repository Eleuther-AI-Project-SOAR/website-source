import './App.css'
import Navbar from './features/components/Navbar'
import ServerDirectory from './features/ServerDirectory/ServerDirectory'

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

const dummyTags = ["open source", "startup", "transformers", "safety", "tooling", "bio", "chatbots", "vision", "robotics", "philosophy"];
  const generateServers = () => {
      const baseServers = [
          { id: 1, name: "EleutherAI", score: 8.1, type: "research", tags: ["very active", "research", "LLM", "alignment", "community projects", "events/workshop", "discord", "interpretability"], link: "https://www.eleuther.ai/", notes: "Lots of resources; community projects to do and very active community." },
          { id: 2, name: "Cohere for AI", score: 8.1, type: "research", tags: ["very active", "research", "multimodal", "general ai research", "community projects", "events/workshop", "reading group"], link: "https://share.hsforms.com/10OrjljwpQ52ILJA6ftE-Lg4sxgx", notes: "Pretty good! Lots of stuff to do for various skill levels." },
      ];
      const generated = Array.from({ length: 48 }).map((_, i) => {
          const rand1 = Math.sin(i * 10 + 1) * 0.5 + 0.5, rand2 = Math.sin(i * 20 + 2) * 0.5 + 0.5, rand3 = Math.sin(i * 30 + 3) * 0.5 + 0.5, rand4 = Math.sin(i * 40 + 4) * 0.5 + 0.5;
          return { id: i + 3, name: `Sample Server ${i + 3}`, score: +(rand1 * 4 + 5).toFixed(1), type: rand2 > 0.7 ? "research" : "general", tags: [rand3 > 0.5 ? "active" : "very active", "community", "discussion", dummyTags[i % dummyTags.length], ...(rand4 > 0.5 ? ["events/workshop"] : []), ...(rand3 > 0.6 ? ["reading group"] : [])], link: "#", notes: "Sample notes about this Discord server." };
      });
      return [...baseServers, ...generated];
  };
  const servers = generateServers();
  // HAVE TO FIX THIS
  /*const allTags = Array.from(new Set(servers.flatMap((s) => s.tags))).sort().map(tag => {
    return {id: tag}
  });*/
  const allTags = {
    'Server Type': ["Research", "Hackathons", "Alignment", "GPU", "General", "Education", "Tool", "Casual", "LLM", "Prompting", "Bug Bounties", "Conference", "Crypto", "Entrepreneurship", "Company", "Robotics", "Puzzle", "Generation"],
    'Activity Level': ["Very Active", "Active", "Semi-active", "Mostly Inactive", "Inactive"],
    'Language': ["English", "Korean"],
    'Location': ["Discord", "Slack", "Irl"],
    'Others': ["Reading Group", "Paper Channel", "VC events/Office Hours", "Jobs Board"]
  }

function App() {

  return (
    <Router>
      <div className="h-screen bg-gray-100 font-sans flex flex-col">
        <Navbar></Navbar>
        <main className="flex-1 flex flex-col">        
          <ServerDirectory servers={servers} allTags={allTags}></ServerDirectory>
        </main>
      </div>
    </Router>
  )
}

export default App
