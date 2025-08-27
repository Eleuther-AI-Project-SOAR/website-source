import { Link } from 'react-router-dom';

const Navbar = () => {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Submit Server', path: '/submit' }
    ];

    return (
        <header className="bg-gray-100 text-gray-800 shadow-md">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold">AI Discord Directory</h1>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar
