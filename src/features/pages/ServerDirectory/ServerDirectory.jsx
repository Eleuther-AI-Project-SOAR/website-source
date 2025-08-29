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
    const filterControls = useFilter()
    
    const [filteredServers, setFilteredServers] = useState([])
    const [selectedModal, setModal] = useState(null)
    const [isTableViewOn, setTableViewToggle] = useState(false)
    
    // Helper function to categorize filters
    const categorizeFilters = (filters, allTags) => {
        const categorized = {
            'Server Type': [],
            'Activity Level': [],
            'Language': [],
            'Location': [],
            'Others': []
        };

        filters.forEach(filter => {
            for (const [category, tags] of Object.entries(allTags)) {
                if (tags.includes(filter)) {
                    categorized[category].push(filter);
                    break;
                }
            }
        });

        return categorized;
    };

    // Helper function to check if server matches filters with complex logic
    const doesServerMatchFilters = (server, categorizedFilters) => {
        // Check each category with appropriate logic
        for (const [category, filters] of Object.entries(categorizedFilters)) {
            if (filters.length === 0) continue; // Skip if no filters selected in this category

            let categoryMatch = false;

            switch (category) {
                // OR logic within these categories
                case 'Server Type':
                case 'Activity Level':
                case 'Language':
                case 'Location':
                    categoryMatch = filters.some(filter => {
                        switch (category) {
                            case 'Server Type':
                                return server.tag.includes(filter);
                            case 'Activity Level':
                                return server.activityLevel === filter;
                            case 'Language':
                                return server.language === filter;
                            case 'Location':
                                return server.location === filter;
                            default:
                                return false;
                        }
                    });
                    break;
                    
                // AND logic within Others category
                case 'Others':
                    categoryMatch = filters.every(filter => server.features.includes(filter));
                    break;
                    
                default:
                    // For any other category, use OR logic as default
                    categoryMatch = filters.some(filter => 
                        server.tag.includes(filter) || 
                        server.features.includes(filter) || 
                        server.activityLevel === filter || 
                        server.language === filter || 
                        server.location === filter
                    );
            }

            // If any category with selected filters doesn't match, the server doesn't match
            if (!categoryMatch) {
                return false;
            }
        }
        
        return true;
    };

    useEffect(() => {
        const categorizedFilters = categorizeFilters(filterControls.filters, allTags);
        
        const filtered = servers.filter(server => {
            // Apply search query filter - check both name and description for partial matches
            if (filterControls.searchQuery) {
                const searchTerms = filterControls.searchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 0);
                const serverName = server.name.toLowerCase();
                const serverDescription = server.description.toLowerCase();
                
                // Check if any search term matches either name or description
                const hasMatch = searchTerms.some(term => 
                    serverName.includes(term) || serverDescription.includes(term)
                );
                
                if (!hasMatch) {
                    return false;
                }
            }
            
            // Apply rating filter
            if (server.rating < filterControls.sliderScoreValue) {
                return false;
            }
            
            // Apply complex filter logic
            if (filterControls.filters.length > 0 && 
                !doesServerMatchFilters(server, categorizedFilters)) {
                return false;
            }
            
            return true;
        });
        
        setFilteredServers(filtered);
    }, [servers, filterControls.searchQuery, filterControls.sliderScoreValue, filterControls.filters, allTags]);

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

    // Sort the filtered servers based on the selected sort options
    const sortedServers = filterControls.isSortingApplied 
        ? [...filteredServers].sort((a, b) => {
            // Determine sort direction for options that use ascending/descending
            const isAscending = filterControls.secondarySortOption === 'ascending';
            
            switch (filterControls.primarySortOption) {
                case 'Score': {
                    const comparison = a.rating - b.rating;
                    return isAscending ? comparison : -comparison;
                }
                case 'Name': {
                    const comparison = a.name.localeCompare(b.name);
                    return isAscending ? comparison : -comparison;
                }
                case 'Activity': {
                    // Convert activity levels to numerical values for comparison
                    const activityValues = {
                        'Very Active': 4,
                        'Active': 3,
                        'Semi-active': 2,
                        'Mostly Inactive': 1,
                        'Inactive': 0
                    };
                    const comparison = activityValues[a.activityLevel] - activityValues[b.activityLevel];
                    return isAscending ? comparison : -comparison;
                }
                case 'Server Type':
                    // If secondary sort option matches a tag, prioritize servers with that tag
                    if (a.tag.includes(filterControls.secondarySortOption) && !b.tag.includes(filterControls.secondarySortOption)) {
                        return -1;
                    }
                    if (!a.tag.includes(filterControls.secondarySortOption) && b.tag.includes(filterControls.secondarySortOption)) {
                        return 1;
                    }
                    // If both or neither have the tag, sort by name
                    return a.name.localeCompare(b.name);
                case 'Language':
                    // If secondary sort option matches language, prioritize servers with that language
                    if (a.language === filterControls.secondarySortOption && b.language !== filterControls.secondarySortOption) {
                        return -1;
                    }
                    if (a.language !== filterControls.secondarySortOption && b.language === filterControls.secondarySortOption) {
                        return 1;
                    }
                    // If both or neither match the language, sort by name
                    return a.name.localeCompare(b.name);
                case 'Location':
                    // If secondary sort option matches location, prioritize servers with that location
                    if (a.location === filterControls.secondarySortOption && b.location !== filterControls.secondarySortOption) {
                        return -1;
                    }
                    if (a.location !== filterControls.secondarySortOption && b.location === filterControls.secondarySortOption) {
                        return 1;
                    }
                    // If both or neither match the location, sort by name
                    return a.name.localeCompare(b.name);
                case 'Others': {
                    // Check if server has a feature matching the secondary sort option
                    const hasFeatureA = a.features.includes(filterControls.secondarySortOption);
                    const hasFeatureB = b.features.includes(filterControls.secondarySortOption);
                    
                    if (hasFeatureA && !hasFeatureB) {
                        return -1;
                    }
                    if (!hasFeatureA && hasFeatureB) {
                        return 1;
                    }
                    // If both or neither have the feature, sort by name
                    return a.name.localeCompare(b.name);
                }
                default:
                    // Default to sorting by score (descending)
                    return b.rating - a.rating;
            }
        })
        : filteredServers;

    const serverFormattedData = sortedServers.map(server => {
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
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg flex-1">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                        <FilterContainer filterControls={filterControls} allTags={allTags} serverRelated={serverRelated}></FilterContainer>
                        <Results handleTableListViewOnClick={handleTableListViewOnClick} isTableViewOn={isTableViewOn} filterControls={filterControls}>
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
