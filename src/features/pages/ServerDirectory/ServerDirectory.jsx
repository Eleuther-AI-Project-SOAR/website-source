import FilterContainer from './FilterContainer'
import Results from './Results'
import Card from './Card'
import CardModal from '../../components/CardModal'
import { DiscordIcon, PersonIcon, SlackIcon } from "../../icons/LocationIcons"
import { PaperChannelIcon, ReadingGroupIcon, VCEventsIcon, JobsBoardIcon } from "../../icons/TagIcons"

import useFilter from '../../hooks/FilterHook'

import {useState, useEffect} from 'react'
import TableListEntries from '../../components/TableListEntries'
import TableList from './TableList'

const ServerDirectory = ({servers, allTags, ratingThreshold}) => {
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState(null)
    
    const filterControls = useFilter()
    
    const [filteredServers, setFilteredServers] = useState([])
    const [selectedModal, setModal] = useState(null)
    const [isTableViewOn, setTableViewToggle] = useState(false)
    
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
   
    const handleTableListViewOnClick = (id) => {
        id = id.toLowerCase()
        if (id == 'grid' && isTableViewOn) setTableViewToggle(!isTableViewOn)
        else if (id == 'table' && !isTableViewOn) setTableViewToggle(!isTableViewOn)
    }

    const serverRelated = {
        servers,
        filteredServers
    }

    const serverFormattedData = filteredServers.map(server => {
        return {
            name: server.name,
            rating: server.rating,
            tag: server.tag,
            activityLevel: server.activityLevel,
            language: server.language,
            location: server.location,
            description: server.description,
            features: server.features
        }
    }) 

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

    const featureTagStyles = {
        'Reading Group': { icon: <ReadingGroupIcon />, color: 'bg-purple-100 text-purple-800' },
        'Paper Channel': { icon: <PaperChannelIcon />, color: 'bg-blue-100 text-blue-800' },
        'VC events/Office Hours': { icon: <VCEventsIcon />, color: 'bg-green-100 text-green-800' },
        'Jobs Board': { icon: <JobsBoardIcon />, color: 'bg-orange-100 text-orange-800' },
    }

    return (
            <div className="mt-4 bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-inner flex-1">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                        <FilterContainer filterControls={filterControls} allTags={allTags} serverRelated={serverRelated}></FilterContainer>
                        <Results handleTableListViewOnClick={handleTableListViewOnClick} isTableViewOn={isTableViewOn}>
                            {!isTableViewOn ?
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-6 items-stretch">
                                    {serverFormattedData.map(server => {
                                        return <Card key={server.name} serverData={server} ratingThreshold={ratingThreshold} activityLevelStyles={activityLevelStyles} locationStyles={locationStyles} 
                                            featureTagStyles={featureTagStyles} openModalOnClick={handleCardOnClick}></Card>
                                    })}
                                </div>
                                : 
                                <div>
                                    <TableList>
                                        {serverFormattedData.map(server => {
                                            return <TableListEntries key={server.name} serverData={server} activityLevelStyles={activityLevelStyles} featureTagStyles={featureTagStyles}></TableListEntries>
                                        })}
                                    </TableList>
                                </div>
                            }
                        </Results>
                    </div>
                </div>
                {selectedModal ? <CardModal serverData={selectedModal} ratingThreshold={ratingThreshold} activityLevelStyles={activityLevelStyles} locationStyles={locationStyles} 
                    featureTagStyles={featureTagStyles} onClick={handleModalOnClose}></CardModal> : ''}
            </div>
    )
}

export default ServerDirectory
