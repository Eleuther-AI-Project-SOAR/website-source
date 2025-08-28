import FilterTag from '../../components/FilterTag'
import { MinusCollapseIcon, PlusExpandIcon } from '../../icons/SymbolIcons'
import {useState} from 'react'

const FilterContainer = ({filterControls, allTags, serverRelated}) => {

    const [isFilterCategoryCollapsed, setFilterCatgoryCollapse] = useState({
        'Server Type': false,
        'Activity Level': false,
        'Language': false,
        'Location': false,
        'Others': false
    })

    const handleCollapseOnClick = (id) => {
        setFilterCatgoryCollapse(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    return (
        <div className="w-full lg:w-80 xl:w-96 lg:flex-shrink-0 lg:sticky lg:top-6">
            <div className="p-4 bg-white rounded-lg shadow-md lg:max-h-[calc(100vh-3rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors" onClick={filterControls.clearFilters}>Clear All</button>
                </div>
                <div className="space-y-5">
                    <div>
                        <label htmlFor="search" className="sr-only">Search servers</label>
                        <input id="search" placeholder="Search servers..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            type="text" onInput={e => filterControls.setSearchQuery(e.target.value)} />
                    </div>
                    <div>
                        <label for="min-score" className="block text-sm font-medium text-gray-700 mb-1">Min Score: {filterControls.sliderScoreValue}</label>
                        <input id="min-score" min="0" max="10" step="0.1" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" type="range" 
                            defaultValue={0} onChange={(e) => filterControls.setSliderScoreValue(e.target.value)} />
                    </div>
                    <p className="text-sm text-gray-600 text-center">Showing <b>{serverRelated.filteredServers.length}</b> of <b>{serverRelated.servers.length}</b> servers</p>
                    <div className="space-y-6 pt-6">
                        {Object.keys(allTags).map(tagType => 
                            <div>
                                <div className="flex justify-between items-center border-b pb-2 mb-3">
                                    <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">{tagType}</h3>
                                    <button className="text-gray-500 hover:text-gray-800 cursor-pointer" onClick={() => handleCollapseOnClick(tagType)}>
                                        {!isFilterCategoryCollapsed[tagType] ? <MinusCollapseIcon></MinusCollapseIcon> : <PlusExpandIcon></PlusExpandIcon>}
                                    </button>
                                </div>
                                {
                                    !isFilterCategoryCollapsed[tagType] ? 
                                    <div className="flex flex-wrap gap-2">
                                        {allTags[tagType].map(tag =>
                                            <FilterTag key={tag} text={tag} onClick={filterControls.handleTagClick} isSelected={filterControls.filters.includes(tag)}></FilterTag> 
                                        )}
                                    </div>
                                    :
                                    '' 
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterContainer