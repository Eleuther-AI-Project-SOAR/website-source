import FilterTag from '../components/FilterTag'

const FilterContainer = ({filterControls, allTags, serverRelated}) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                    <div className="lg:col-span-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="search-input">Search Servers</label>
                        <input className="border p-2 rounded w-full bg-white text-gray-900 mt-1" id="search-input" placeholder="Search by name..." onInput={e => filterControls.setSearchQuery(e.target.value)}></input>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">Min Score: {filterControls.sliderScoreValue}</label>
                            <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                                min="0" max="10" step="0.1" type="range" defaultValue={0} onChange={(e) => filterControls.setSliderScoreValue(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 justify-self-start md:justify-self-end">
                        <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={e => filterControls.setCompactView(e.target.checked)}/>
                        <div className="relative w-11 h-6 bg-gray-200 focus:ring-offset-2 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                         peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                          dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label> 
                        <label className="text-sm font-medium text-gray-700" htmlFor="compact">Compact view</label>
                    </div>
                </div>
                <div className="pt-2 space-y-3">
                    <label className="text-sm font-medium text-gray-700">Filter by tags:</label>
                    <div>
                        <span className="mb-3 px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block cursor-pointer hover:opacity-80
                        bg-red-300 text-gray-600 border border-gray-300" onClick={filterControls.clearFilters}>Clear all</span>
                        <div className="flex flex-wrap gap-2"> 
                            {allTags.map(tag => 
                                <FilterTag key={tag.id} text={tag.id} onClick={filterControls.handleTagClick} isSelected={filterControls.filters.includes(tag.id)}></FilterTag>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                    Showing {serverRelated.serverResults.length} of {serverRelated.servers.length}
                </div>
            </div>
    )
}

export default FilterContainer