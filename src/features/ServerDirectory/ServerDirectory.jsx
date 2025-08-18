import DisplayTag from '../components/DisplayTag'
import Card from '../ServerDirectory/Card'
import Results from '../ServerDirectory/Results'
import FilterContainer from '../ServerDirectory/FilterContainer'

import useFilter from '../hooks/FilterHook'

import {useState} from 'react'

const ServerDirectory = ({servers, allTags}) => {
    const [serverResults, setResults] = useState([])

    const filterControls = useFilter()

    const serverRelated = {
        servers,
        serverResults
    }

    return (
        <>
            <FilterContainer filterControls={filterControls} allTags={allTags} serverRelated={serverRelated}></FilterContainer>
            <Results>
                {servers.map(server => {
                    const serverData = {
                        id: server.id,
                        name: server.name,
                        score: server.score,
                        type: server.type,
                        link: server.link,
                        notes: server.notes
                    }

                    return <Card key={server.id} serverData={serverData}>
                        {allTags.map(tag => <DisplayTag key={tag.id} text={tag.id}></DisplayTag>)}
                    </Card>
                })}
            </Results>
        </>
    )
}

export default ServerDirectory
