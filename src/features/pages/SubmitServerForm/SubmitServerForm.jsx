import { useState } from 'react';
import { ApplicationIcon, SubmitIcon } from '../../icons/SymbolIcons';

const SubmitServerForm = ({allTags}) => {
    const [selectedServerType, setSelectedServerType] = useState(null);
    const [selectedOthers, setSelectedOthers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const serverTypeTags = allTags['Server Type'];
    const otherTags = allTags['Others'];
    const activityTags = allTags['Activity Level']

    const handleServerTypeClick = (tag) => {
        setSelectedServerType(prev => prev === tag ? null : tag);
    };

    const handleOtherClick = (tag) => {
        setSelectedOthers(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag) 
                : [...prev, tag]
        );
    };

    const handleSubmit = () => {
      setIsSubmitting(true);
      // do something with it...back-end stuff
      setTimeout(() => {
        setIsSubmitting(false);
      }, 3000); 
    };


    return (
        <div className="flex-1 overflow-y-auto">
            <div className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900">List Your AI Discord Server</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Join our directory and connect your AI research community with researchers worldwide. Get your server discovered by the right audience.</p>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-start space-x-3 mb-6">
                                <div className="bg-indigo-100 p-2 rounded-full">
                                   <ApplicationIcon/> 
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Server Application</h3>
                                    <p className="text-sm text-gray-500">Fill out this form to get your Discord server listed in our directory. All submissions are manually reviewed to ensure quality.</p>
                                </div>
                            </div>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 mb-1">Organization Name (Optional)</label>
                                        <input id="org-name" placeholder="e.g., Stanford AI Lab" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
                                        <input id="website" placeholder="https://your-organization.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="url" />
                                    </div>
                                    <div>
                                        <label htmlFor="server-name" className="block text-sm font-medium text-gray-700 mb-1">Discord Server Name *</label>
                                        <input id="server-name" placeholder="e.g., AI Research Hub" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="member-count" className="block text-sm font-medium text-gray-700 mb-1">Current Member Count *</label>
                                        <input id="member-count" placeholder="e.g., 1500" min={0} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" oninput="validity.valid||(value='');" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Server Description *</label>
                                    <textarea id="description" rows="4" placeholder="Describe your server's purpose, main topics, and what makes it unique... (minimum 10 characters)" required minLength="10" maxLength="500" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                                    <p className="text-right text-xs text-gray-500 mt-1">0/500 characters</p>
                                </div>
                                <div>
                                    <label htmlFor="invite-link" className="block text-sm font-medium text-gray-700 mb-1">Discord Invite Link *</label>
                                    <input id="invite-link" placeholder="https://discord.gg/your-server" required pattern="https?://discord\.gg/.*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="url" />
                                    <p className="text-xs text-gray-500 mt-1">Must be a valid Discord invite link (https://discord.gg/...)</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                                        <input id="email" placeholder="your.email@example.com" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" />
                                    </div>
                                    <div>
                                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
                                        <input id="language" placeholder="e.g., English" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="activity-level" className="block text-sm font-medium text-gray-700 mb-1">Activity Level *</label>
                                        <select id="activity-level" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option value="">Select activity level</option>
                                            {activityTags.map(activity => <option>{activity}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="difficulty-level" className="block text-sm font-medium text-gray-700 mb-1">Target Difficulty Level *</label>
                                        <select id="difficulty-level" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option value="">Select difficulty level</option>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                            <option>All levels</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-800 mb-2">Server Type* (Select one)</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {serverTypeTags.map(tag => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleServerTypeClick(tag)}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                        selectedServerType === tag
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-800 mb-2">Others* (Select all that applies)</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {otherTags.map(tag => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleOtherClick(tag)}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                        selectedOthers.includes(tag)
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg text-base font-semibold transition-colors shadow-md 
                                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                      onClick={handleSubmit} disabled={isSubmitting}>
                                        Submit Application
                                       <SubmitIcon/> 
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Review Process</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold text-indigo-500 mb-2">1</div>
                                    <h4 className="font-bold text-gray-800">Application Review</h4>
                                    <p className="text-sm text-gray-500 mt-1">We review your server for quality, relevance, and activity level.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold text-indigo-500 mb-2">2</div>
                                    <h4 className="font-bold text-gray-800">Verification</h4>
                                    <p className="text-sm text-gray-500 mt-1">We verify your Discord server and ensure it meets our community standards.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold text-indigo-500 mb-2">3</div>
                                    <h4 className="font-bold text-gray-800">Go Live</h4>
                                    <p className="text-sm text-gray-500 mt-1">Once approved, your server goes live in our directory.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmitServerForm