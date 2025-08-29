import {useState, useEffect} from 'react'

const useFilter = (initialFilters=[]) => {
    const [filters, setFilters] = useState(initialFilters)
    const [sliderScoreValue, setSliderScoreValue] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [compactView, setCompactView] = useState(false)
    
    // Sorting states
    const [primarySortOption, setPrimarySortOption] = useState('Score')
    const [secondarySortOption, setSecondarySortOption] = useState('descending')
    const [isSortingApplied, setIsSortingApplied] = useState(false)
    
    // Define the secondary sort options for each primary sort option
    const sortOptions = {
        'Score': ['ascending', 'descending'],
        'Name': ['ascending', 'descending'],
        'Activity': ['ascending', 'descending'],
        'Server Type': ['Research', 'Hackathons', 'Alignment', 'GPU', 'Casual', 'LLM', 'Prompting', 'Bug bounties', 'Conference', 'Crypto', 'Entreprenurship', 'Company', 'Robotics', 'Puzzle', 'Generation'],
        'Language': ['English', 'Korean'],
        'Location': ['Discord', 'Slack', 'IRL'],
        'Others': ['Reading Group', 'Paper Channel', 'VC Events/Office Hours', 'Jobs Board']
    }
    
    // Update secondary sort option when primary sort option changes
    useEffect(() => {
        // Set a default secondary option based on the primary option
        const defaultSecondaryOption = sortOptions[primarySortOption]?.[0] || 'ascending';
        setSecondarySortOption(defaultSecondaryOption);
    }, [primarySortOption]);
    const [showSortDropdown, setShowSortDropdown] = useState(false)

    const resetSorting = () => {
        setPrimarySortOption('Score')
        setSecondarySortOption('descending')
        setIsSortingApplied(false)
    }

    const toggleFilter = (filterId) => {
        setFilters(prev => prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId])
    }

    const clearFilters = () => {
        setFilters([])
    }

    const handleTagClick = (tagId) => {
        if (filters.includes(tagId)) {
            setFilters(filters.filter((t) => t !== tagId))
        } 
        else {
            setFilters([...filters, tagId])
        }
    }

    const toggleSortDropdown = () => {
        setShowSortDropdown(prev => !prev)
    }

    const setSorting = (primaryOption, secondaryOption) => {
        setPrimarySortOption(primaryOption)
        setSecondarySortOption(secondaryOption)
        setIsSortingApplied(true)
    }

    return {
        filters,
        handleTagClick,
        sliderScoreValue,
        setSliderScoreValue,
        toggleFilter,
        clearFilters,
        searchQuery,
        setSearchQuery,
        compactView,
        setCompactView,
        primarySortOption,
        setPrimarySortOption,
        secondarySortOption,
        setSecondarySortOption,
        showSortDropdown,
        setShowSortDropdown,
        toggleSortDropdown,
        setSorting,
        resetSorting,
        isSortingApplied
    }
}

export default useFilter
