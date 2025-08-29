import { useEffect, useRef } from 'react';

const SortDropDown = ({ 
    primarySortOption, 
    secondarySortOption, 
    setSorting,
    showSortDropdown,
    toggleSortDropdown,
    resetSorting,
    isSortingApplied
}) => {
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                toggleSortDropdown();
            }
        };

        if (showSortDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSortDropdown, toggleSortDropdown]);

    // Primary sort options
    const primaryOptions = ['Score', 'Name', 'Activity', 'Server Type', 'Language', 'Location', 'Others'];

    // Secondary sort options based on primary selection
    const getSecondaryOptions = (primaryOption) => {
        switch (primaryOption) {
            case 'Score':
            case 'Name':
            case 'Activity':
                return ['ascending', 'descending'];
            case 'Server Type':
                return ['Research', 'Hackathons', 'Alignment', 'GPU', 'Casual', 'LLM', 'Prompting', 'Bug bounties', 'Conference', 'Crypto', 'Entreprenurship', 'Company', 'Robotics', 'Puzzle', 'Generation'];
            case 'Language':
                return ['English', 'Korean'];
            case 'Location':
                return ['Discord', 'Slack', 'IRL'];
            case 'Others':
                return ['Reading Group', 'Paper Channel', 'VC Events/Office Hours', 'Jobs Board'];
            default:
                return ['ascending', 'descending'];
        }
    };

    const secondaryOptions = getSecondaryOptions(primarySortOption);

    const handlePrimaryChange = (option) => {
        setSorting(option, getSecondaryOptions(option)[0]);
    };

    const handleSecondaryChange = (option) => {
        setSorting(primarySortOption, option);
    };

    return (
        <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5" ref={dropdownRef}>
            <div className="p-2">
                {/* Reset Button */}
                {isSortingApplied && (
                    <div className="mb-2">
                        <button
                            onClick={() => {
                                resetSorting();
                                toggleSortDropdown();
                            }}
                            className="w-full text-xs px-2 py-1 rounded text-left bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            Reset Sorting
                        </button>
                    </div>
                )}

                {/* Divider */}
                {isSortingApplied && <div className="border-t border-gray-200 my-2"></div>}

                {/* Primary Options */}
                <div className="mb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Primary Sort</div>
                    <div className="grid grid-cols-2 gap-1">
                        {primaryOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handlePrimaryChange(option)}
                                className={`text-xs px-2 py-1 rounded text-left ${
                                    primarySortOption === option
                                        ? 'bg-indigo-600 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Secondary Options */}
                <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {['Score', 'Name', 'Activity'].includes(primarySortOption) ? 'Order' : 'Secondary Sort'}
                    </div>
                    <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto">
                        {secondaryOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSecondaryChange(option)}
                                className={`text-xs px-2 py-1 rounded text-left ${
                                    secondarySortOption === option
                                        ? 'bg-indigo-600 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortDropDown;
