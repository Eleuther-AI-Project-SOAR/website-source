const About = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg flex-1">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About the AI Discord Directory</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>Welcome to the AI Discord Directory, your central hub for discovering and exploring communities focused on Artificial Intelligence. In the rapidly expanding world of AI, finding the right community to learn, collaborate, and stay up-to-date can be a challenge. Our mission is to simplify that process.</p>
                    <p>This directory is a curated collection of Discord servers and other online groups dedicated to a wide range of AI topics—from cutting-edge research and large language models (LLMs) to AI safety, robotics, and casual coding discussions. Whether you're a seasoned researcher, a student just starting your journey, or a hobbyist passionate about AI, you'll find a community that fits your interests.</p>
                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 pt-4">Our Goal</h3>
                    <p>Our primary goal is to foster a more connected and accessible AI ecosystem. We believe that collaboration and knowledge sharing are key to driving innovation. By providing a comprehensive and easy-to-navigate directory, we hope to:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Help individuals find relevant communities to enhance their learning and career growth.</li>
                        <li>Enable collaboration between different groups and individuals on exciting projects.</li>
                        <li>Provide a platform for server owners to reach a wider audience of AI enthusiasts.</li>
                        <li>Offer powerful filtering and visualization tools to help you understand the landscape of AI communities.</li>
                    </ul>
                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 pt-4">How It Works</h3>
                    <p>We gather information on various AI-focused communities and organize it in a structured way. Each server is evaluated based on several factors, including activity level, primary focus, and available resources like paper channels or job boards. Our unique scoring system helps you quickly identify high-quality and active communities.</p>
                    <p>You can use our advanced filtering and sorting to find the perfect community for you.</p>
                </div>
            </div>
        </div>
    )
}

export default About
