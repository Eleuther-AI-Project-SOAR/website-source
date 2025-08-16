import FilterTag from '../components/FilterTag'
import DisplayTag from '../components/DisplayTag'
import Card from '../ServerDirectory/Card'
import Results from '../ServerDirectory/Results'
import {useState} from 'react'

const ServerDirectory = ({servers, allTags}) => {
    const [score, setScore] = useState(0)
    const [filters, setFilters] = useState([])
    const [compactView, setCompactView] = useState(false)

    const handleTagClick = (tagId) => {
        if (filters.includes(tagId)) {
            setFilters(filters.filter((t) => t !== tagId))
        } 
        else {
            setFilters([...filters, tagId])
        }
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                    <div className="lg:col-span-1">
                        <label class="text-sm font-medium text-gray-700" for="search-input">Search Servers</label>
                        <input class="border p-2 rounded w-full bg-white text-gray-900 mt-1" id="search-input" placeholder="Search by name..." value=""></input>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">Min Score: 0.0</label>
                            <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                                min="0" max="10" step="0.1" type="range" value="0"></input>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 justify-self-start md:justify-self-end">
                        <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer"/>
                        <div class="relative w-11 h-6 bg-gray-200 focus:ring-offset-2 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label> 
                        <label className="text-sm font-medium text-gray-700" for="compact">Compact view</label>
                    </div>
                    <div className="text-sm text-gray-600 pt-2 border-t border-gray-200"></div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Filter by tags:</label>
                    <div className="flex flex-wrap gap-2"> 
                        {allTags.map(tag => 
                            <FilterTag key={tag.id} text={tag.id} onClick={handleTagClick} isSelected={filters.includes(tag.id)}></FilterTag>
                        )}
                    </div>
                </div>
            </div>
            <Results>
                {servers.map(server => {
                    return <Card key={server.id} title={server.name} score={server.score} type={server.type} tags={server.tags} link={server.link} desc={server.notes} allTags={allTags}>
                        {allTags.map(tag => <DisplayTag key={tag.id} text={tag.id}></DisplayTag>)}
                    </Card>
                })}
            </Results>
        </>
    )
}

export default ServerDirectory
