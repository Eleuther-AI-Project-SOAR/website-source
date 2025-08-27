import DisplayTag from '../components/DisplayTag'
import Card from '../ServerDirectory/Card'
import Results from '../ServerDirectory/Results'
import FilterContainerNew from './FilterContainer'

import useFilter from '../hooks/FilterHook'

import {useState, useEffect} from 'react'

const ServerDirectory = ({servers, allTags}) => {
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState(null)
    
    const filterControls = useFilter()
    
    const [filteredServers, setFilteredServers] = useState([])
    
    /* Uncomment when we have the actual data or endpoint to fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // const response = await fetch('/api/servers')
                // const data = await response.json()
                // setServers(data)
                setServers(generateServers())
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [])*/
    
    useEffect(() => {
        const filtered = servers.filter(server => {
            if (filterControls.searchQuery && 
                !server.name.toLowerCase().includes(filterControls.searchQuery.toLowerCase())) {
                return false
            }
            
            if (server.score < filterControls.sliderScoreValue) {
                return false
            }
            
            if (filterControls.filters.length > 0 && 
                !filterControls.filters.every(filter => server.tags.includes(filter))) {
                return false
            }
            
            return true
        })
        
        setFilteredServers(filtered)
    }, [servers, filterControls.searchQuery, filterControls.sliderScoreValue, filterControls.filters])

    const serverRelated = {
        servers,
        filteredServers
    }

    return (
            <div className="mt-4 bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-inner flex-1">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                        <FilterContainerNew filterControls={filterControls} allTags={allTags} serverRelated={serverRelated}></FilterContainerNew>
                        <Results>
                            {filteredServers.map(server => {
                                const serverData = {
                                    id: server.id,
                                    name: server.name,
                                    score: server.score,
                                    type: server.type,
                                    link: server.link,
                                    notes: server.notes
                                }

                                return <Card key={server.id} serverData={serverData}>
                                    {server.tags.map(tag => <DisplayTag key={tag} text={tag}></DisplayTag>)}
                                </Card>
                            })}
                        </Results>
                    </div>
                </div>
            </div>
    )
}

export default ServerDirectory
