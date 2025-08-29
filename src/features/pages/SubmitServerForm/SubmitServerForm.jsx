import { useState, useRef } from 'react';
import { ApplicationIcon, SubmitIcon } from '../../icons/SymbolIcons';

const SubmitServerForm = ({allTags}) => {
    const [selectedServerType, setSelectedServerType] = useState(null);
    const [selectedOthers, setSelectedOthers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Refs for form elements to enable focusing
    const formRefs = {
        serverName: useRef(null),
        memberCount: useRef(null),
        description: useRef(null),
        inviteLink: useRef(null),
        email: useRef(null),
        language: useRef(null),
        activityLevel: useRef(null),
        difficultyLevel: useRef(null)
    };

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

    const validateForm = () => {
        // Define the order of validation
        const validationOrder = [
            { id: 'server-name', name: 'serverName', ref: 'serverName' },
            { id: 'member-count', name: 'memberCount', ref: 'memberCount' },
            { id: 'description', name: 'description', ref: 'description' },
            { id: 'invite-link', name: 'inviteLink', ref: 'inviteLink' },
            { id: 'email', name: 'email', ref: 'email' },
            { id: 'language', name: 'language', ref: 'language' },
            { id: 'activity-level', name: 'activityLevel', ref: 'activityLevel' },
            { id: 'difficulty-level', name: 'difficultyLevel', ref: 'difficultyLevel' },
            { id: 'server-type', name: 'serverType', ref: null },
            { id: 'others', name: 'others', ref: null }
        ];

        // Check each field in order
        for (let field of validationOrder) {
            // Special handling for tag selections
            if (field.name === 'serverType') {
                if (!selectedServerType) {
                    setErrors({ [field.name]: 'Please fill out this field' });
                    return field.ref; // Return ref name for focusing
                }
            } else if (field.name === 'others') {
                if (selectedOthers.length === 0) {
                    setErrors({ [field.name]: 'Please fill out this field' });
                    return field.ref; // Return ref name for focusing (null in this case)
                }
            } else {
                // Regular input fields
                const element = document.getElementById(field.id);
                if (element && !element.value.trim()) {
                    setErrors({ [field.name]: 'Please fill out this field' });
                    return field.ref; // Return ref name for focusing
                }
            }
        }
        
        // If we get here, all fields are valid
        setErrors({});
        return null; // No focus needed
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const focusRef = validateForm();
        
        if (focusRef) {
            // If focusRef exists and it's a regular input field, focus on it
            if (formRefs[focusRef]?.current) {
                formRefs[focusRef].current.focus();
            }
            // If focusRef exists but it's null (tag fields), we just show the error
            // since we can't focus on tag elements
        } else {
            // All validations passed, proceed with submission
            setIsSubmitting(true);
            // do something with it...back-end stuff
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
        }
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
                                        <input 
                                            id="server-name" 
                                            ref={formRefs.serverName}
                                            placeholder="e.g., AI Research Hub" 
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.serverName ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            type="text" 
                                        />
                                        {errors.serverName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.serverName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="member-count" className="block text-sm font-medium text-gray-700 mb-1">Current Member Count *</label>
                                        <input 
                                            id="member-count" 
                                            ref={formRefs.memberCount}
                                            placeholder="e.g., 1500" 
                                            min={0} 
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.memberCount ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            type="number" 
                                            onInput={(e) => {
                                                // Ensure only valid numbers are entered
                                                if (e.target.value < 0) e.target.value = '';
                                            }}
                                        />
                                        {errors.memberCount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.memberCount}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Server Description *</label>
                                    <textarea 
                                        id="description" 
                                        ref={formRefs.description}
                                        rows="4" 
                                        placeholder="Describe your server's purpose, main topics, and what makes it unique... (minimum 10 characters)" 
                                        required 
                                        minLength="10" 
                                        maxLength="500" 
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                            errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                    <p className="text-right text-xs text-gray-500 mt-1">0/500 characters</p>
                                </div>
                                <div>
                                    <label htmlFor="invite-link" className="block text-sm font-medium text-gray-700 mb-1">Discord Invite Link *</label>
                                    <input 
                                        id="invite-link" 
                                        ref={formRefs.inviteLink}
                                        placeholder="https://discord.gg/your-server" 
                                        required 
                                        pattern="https?://discord\.gg/.*" 
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                            errors.inviteLink ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        type="url" 
                                    />
                                    {errors.inviteLink && (
                                        <p className="mt-1 text-sm text-red-600">{errors.inviteLink}</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">Must be a valid Discord invite link (https://discord.gg/...)</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                                        <input 
                                            id="email" 
                                            ref={formRefs.email}
                                            placeholder="your.email@example.com" 
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            type="email" 
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
                                        <input 
                                            id="language" 
                                            ref={formRefs.language}
                                            placeholder="e.g., English" 
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.language ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            type="text" 
                                        />
                                        {errors.language && (
                                            <p className="mt-1 text-sm text-red-600">{errors.language}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="activity-level" className="block text-sm font-medium text-gray-700 mb-1">Activity Level *</label>
                                        <select 
                                            id="activity-level" 
                                            ref={formRefs.activityLevel}
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.activityLevel ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Select activity level</option>
                                            {activityTags.map(activity => <option key={activity}>{activity}</option>)}
                                        </select>
                                        {errors.activityLevel && (
                                            <p className="mt-1 text-sm text-red-600">{errors.activityLevel}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="difficulty-level" className="block text-sm font-medium text-gray-700 mb-1">Target Difficulty Level *</label>
                                        <select 
                                            id="difficulty-level" 
                                            ref={formRefs.difficultyLevel}
                                            required 
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.difficultyLevel ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Select difficulty level</option>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                            <option>All levels</option>
                                        </select>
                                        {errors.difficultyLevel && (
                                            <p className="mt-1 text-sm text-red-600">{errors.difficultyLevel}</p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className={`text-sm font-medium mb-2 ${errors.serverType ? 'text-red-600' : 'text-gray-800'}`}>
                                            Server Type* (Select one)
                                        </h3>
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
                                        {errors.serverType && (
                                            <p className="mt-1 text-sm text-red-600">{errors.serverType}</p>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className={`text-sm font-medium mb-2 ${errors.others ? 'text-red-600' : 'text-gray-800'}`}>
                                            Others* (Select all that applies)
                                        </h3>
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
                                        {errors.others && (
                                            <p className="mt-1 text-sm text-red-600">{errors.others}</p>
                                        )}
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
