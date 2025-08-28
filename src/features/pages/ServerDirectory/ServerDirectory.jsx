import FilterContainer from './FilterContainer'
import Results from './Results'
import Card from './Card'
import CardModal from '../../components/CardModal'
import { DiscordIcon, PersonIcon, SlackIcon } from "../../icons/LocationIcons"

import useFilter from '../../hooks/FilterHook'

import {useState, useEffect} from 'react'

const ServerDirectory = ({servers, allTags, ratingThreshold}) => {
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState(null)
    
    const filterControls = useFilter()
    
    const [filteredServers, setFilteredServers] = useState([])
    const [selectedModal, setModal] = useState(null)
    
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
            
            if (server.rating < filterControls.sliderScoreValue) {
                return false
            }
            
            if (filterControls.filters.length > 0 && 
                !filterControls.filters.every(filter => 
                    server.tag.includes(filter) || server.features.includes(filter) || server.activityLevel == filter || server.language == filter || server.location == filter)) {
                return false
            }
            
            return true
        })
        
        setFilteredServers(filtered)
    }, [servers, filterControls.searchQuery, filterControls.sliderScoreValue, filterControls.filters])

    const handleCardOnClick = (serverData) => {
        setModal(serverData)
    }

    const handleModalOnClose = () => {
        setModal(null)
    }
    
    const serverRelated = {
        servers,
        filteredServers
    }

    const activityLevelStyles = {
        'Very Active': 'bg-green-500 text-white',
        'Active': 'bg-green-200 text-green-800',
        'Semi-active': 'bg-yellow-200 text-yellow-800',
        'Mostly Inactive': 'bg-gray-300 text-gray-800',
        'Inactive': 'bg-gray-200 text-gray-600',
    };

    const locationStyles = {
        'Discord': <DiscordIcon />,
        'Slack': <SlackIcon />,
        'IRL': <PersonIcon />
    }

    return (
            <div className="mt-4 bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-inner flex-1">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                        <FilterContainer filterControls={filterControls} allTags={allTags} serverRelated={serverRelated}></FilterContainer>
                        <Results>
                            {filteredServers.map(server => {
                                const serverData = {
                                    name: server.name,
                                    rating: server.rating,
                                    tag: server.tag,
                                    activityLevel: server.activityLevel,
                                    language: server.language,
                                    location: server.location,
                                    description: server.description,
                                    features: server.features
                                }

                                return <Card key={server.name} serverData={serverData} ratingThreshold={ratingThreshold} activityLevelStyles={activityLevelStyles} locationStyles={locationStyles} openModalOnClick={handleCardOnClick}></Card>
                            })}
                        </Results>
                    </div>
                </div>
                {selectedModal ? <CardModal serverData={selectedModal} ratingThreshold={ratingThreshold} activityLevelStyles={activityLevelStyles} locationStyles={locationStyles} onClick={handleModalOnClose}></CardModal> : ''}
            </div>
    )
}

export default ServerDirectory
