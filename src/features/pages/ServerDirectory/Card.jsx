import { LanguageIcon } from "../../icons/LanguageIcons"
import { ExternalLinkIcon, StarIcon } from "../../icons/SymbolIcons"
import DisplayTag from '../../components/DisplayTag'

const Card = ({serverData, ratingThreshold, activityLevelStyles, locationStyles, featureTagStyles, openModalOnClick}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 overflow-hidden" onClick={() => openModalOnClick(serverData)}>
            <div className="flex flex-col">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 pr-2">{serverData.name}</h3>
                        <button className="text-indigo-500 hover:text-indigo-700 transition-colors flex-shrink-0">
                            <ExternalLinkIcon></ExternalLinkIcon>
                        </button>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 text-sm text-gray-500 mt-1">
                        {serverData.rating >= ratingThreshold ? <StarIcon></StarIcon> : ''}
                        <span className="font-semibold text-gray-800 text-base">{serverData.rating}</span>
                        <div className="flex items-center gap-x-3 flex-shrink-0">
                            <span className="px-2 py-1 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap">{serverData.tag}</span>
                            <span className={`px-2 py-1 ${activityLevelStyles[serverData.activityLevel]} rounded-full text-xs font-semibold whitespace-nowrap`}>{serverData.activityLevel}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                        {locationStyles[serverData.location]}
                        <span>{serverData.location}</span><span>•</span>
                        <LanguageIcon></LanguageIcon>
                        <span>{serverData.language}</span>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm">Dedicated to solving the AI alignment problem.</p>
                </div>
                <div className="mt-5">
                    <div className="flex flex-wrap gap-2">
                        {serverData.features.map(feature => <DisplayTag key={feature} feature={feature} featureTagStyles={featureTagStyles}></DisplayTag>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card