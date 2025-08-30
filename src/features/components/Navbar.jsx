import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TwitterIcon, DiscordIcon } from '../icons/LocationIcons';
import { DarkIcon, HamburgerCloseIcon, HamburgerIcon, LightIcon } from '../icons/SymbolIcons';

const Navbar = ({navItems, toggleTheme}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to={navItems[0].path}><h1 className="text-xl sm:text-2xl font-bold">AI Discord Directory</h1></Link>
                        {/* Desktop Navigation */}
                        <nav className="hidden md:block ml-8 md:ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                    
                    {/* Desktop Social Icons and Theme Toggle */}
                    <div className="hidden md:flex items-center space-x-4 md:space-x-2">
                        <a href="https://x.com/SeonGunness" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                            <TwitterIcon className="w-5 h-5" />
                        </a>
                        <a href="https://discord.gg/buBqNytqx3" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                            <DiscordIcon className="w-5 h-5" />
                        </a>
                        <button 
                            onClick={toggleTheme}
                            className="ml-2 p-2 rounded-full bg-transparent border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {/* Light mode icon */}
                            <LightIcon/>
                            {/* Dark mode icon */}
                            <DarkIcon/>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                            aria-label="Main menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <HamburgerIcon/> 
                            ) : (
                                <HamburgerCloseIcon/> 
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {/* Navigation Links */}
                        <div className="flex flex-col items-center space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 block px-6 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        
                        {/* Social Icons and Theme Toggle - grouped together without divider */}
                        <div className="flex items-center justify-around px-3 py-2">
                            <a href="https://x.com/SeonGunness" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                <TwitterIcon className="w-5 h-5" />
                            </a>
                            <a href="https://discord.gg/buBqNytqx3" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                <DiscordIcon className="w-5 h-5" />
                            </a>
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-transparent border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {/* Light mode icon */}
                                <LightIcon/> 
                                {/* Dark mode icon */}
                                <DarkIcon/> 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
