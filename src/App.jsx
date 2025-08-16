import './App.css'
import ServerDirectory from './features/ServerDirectory/ServerDirectory'

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
  const allTags = Array.from(new Set(servers.flatMap((s) => s.tags))).sort().map(tag => {
    return {id: tag}
  });

function App() {

  return (
    <>
      <div className="p-4 sm:p-6 space-y-8 max-w-screen-2xl mx-auto font-sans bg-gray-50 min-h-screen text-gray-900">
        <ServerDirectory servers={servers} allTags={allTags}></ServerDirectory>
      </div>
    </>
  )
}

export default App
