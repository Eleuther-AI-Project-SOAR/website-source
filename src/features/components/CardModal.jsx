import { CloseIcon, ExternalLinkModalIcon, StarIcon} from "../icons/SymbolIcons"
import { LanguageIcon } from "../icons/LanguageIcons"
import DisplayTag from "./DisplayTag"

const CardModal = ({serverData, ratingThreshold, activityLevelStyles, locationStyles, onClick}) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClick}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">{serverData.name}</h2>
                    <button className="text-gray-400 hover:text-gray-600" onClick={onClick}>
                        <CloseIcon/>
                    </button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex items-center flex-wrap gap-x-3 text-sm">
                        {serverData.rating >= ratingThreshold ? <StarIcon/> : ''}
                        <span className="font-semibold text-gray-800 text-lg">{serverData.rating}</span>
                        <span className="px-3 py-1 border border-gray-400 rounded-full text-sm font-semibold">{serverData.tag}</span>
                        <span className={`px-3 py-1 ${activityLevelStyles[serverData.activityLevel]} rounded-full text-sm font-semibold`}>{serverData.activityLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                        {locationStyles[serverData.location]}
                        <span>{serverData.location}</span><span>•</span>
                        <LanguageIcon></LanguageIcon>
                        <span>{serverData.language}</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm">{serverData.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {serverData.features.map(feature => <DisplayTag key={feature} feature={feature}></DisplayTag>)}
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">
                            Join Server
                            <ExternalLinkModalIcon/>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardModal