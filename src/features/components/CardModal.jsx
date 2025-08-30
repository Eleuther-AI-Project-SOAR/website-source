import { CloseIcon, ExternalLinkIcon, StarIcon} from "../icons/SymbolIcons"
import { LanguageIcon } from "../icons/LanguageIcons"
import DisplayTag from "./DisplayTag"

const CardModal = ({serverData, ratingThreshold, activityLevelStyles, locationStyles, featureTagStyles, onClick}) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClick}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{serverData.name}</h2>
                        <button className="flex text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex-shrink-0 justify-start">
                            <ExternalLinkIcon></ExternalLinkIcon>
                        </button>
                    </div>
                    <div className="flex items-center gap-2"> 
                        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" onClick={onClick}>
                            <CloseIcon/>
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex items-center flex-wrap gap-x-3 text-sm">
                        {serverData.rating >= ratingThreshold ? <StarIcon/> : ''}
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{serverData.rating}</span>
                        <span className="px-3 py-1 border border-gray-400 dark:border-gray-500 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300">{serverData.tag}</span>
                        <span className={`px-3 py-1 ${activityLevelStyles[serverData.activityLevel]} rounded-full text-sm font-semibold`}>{serverData.activityLevel}</span> 
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {locationStyles[serverData.location]}
                        <span>{serverData.location}</span><span>•</span>
                        <LanguageIcon></LanguageIcon>
                        <span>{serverData.language}</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{serverData.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {serverData.features.map(feature => <DisplayTag key={feature} feature={feature} featureTagStyles={featureTagStyles}></DisplayTag>)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardModal
