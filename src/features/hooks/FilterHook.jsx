import {useState} from 'react'

const useFilter = (initialFilters=[]) => {
    const [filters, setFilters] = useState(initialFilters)
    const [sliderScoreValue, setSliderScoreValue] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [compactView, setCompactView] = useState(false)

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
        setCompactView
    }
}

export default useFilter