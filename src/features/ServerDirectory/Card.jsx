import { LanguageIcon } from "../icons/LanguageIcons"
import { DiscordIcon } from "../icons/LocationIcons"
import { ExternalLinkIcon, StarIcon } from "../icons/SymbolIcons"
import { PaperChannelIcon, ReadingGroupIcon } from "../icons/TagIcons"

const Card = ({serverData, children}) => {
    return (
        <div class="bg-white rounded-lg shadow-md p-8 flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 overflow-hidden">
            <div class="flex flex-col">
                <div>
                    <div class="flex justify-between items-start">
                        <h3 class="text-xl font-bold text-gray-900 pr-2">The Alignment Problem</h3>
                        <button class="text-indigo-500 hover:text-indigo-700 transition-colors flex-shrink-0">
                            <ExternalLinkIcon></ExternalLinkIcon>
                        </button>
                    </div>
                    <div class="flex items-center flex-wrap gap-x-3 gap-y-2 text-sm text-gray-500 mt-1">
                        <StarIcon></StarIcon>
                        <span class="font-semibold text-gray-800 text-base">9.2</span>
                        <div class="flex items-center gap-x-3 flex-shrink-0">
                            <span class="px-2 py-1 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap">Alignment</span>
                            <span class="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-semibold whitespace-nowrap">Very Active</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                        <DiscordIcon></DiscordIcon>
                        <span>discord</span><span>•</span>
                        <LanguageIcon></LanguageIcon>
                        <span>english</span>
                    </div>
                    <p class="text-gray-600 mt-4 text-sm">Dedicated to solving the AI alignment problem.</p>
                </div>
                <div class="mt-5"><div class="flex flex-wrap gap-2">
                    <span class="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">
                        <ReadingGroupIcon></ReadingGroupIcon>
                        Reading Group
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                        <PaperChannelIcon></PaperChannelIcon>
                        Paper Channel
                    </span>
                </div>
                </div>
            </div>
        </div>
        /*<div className="bg-white border border-black-300 p-4 rounded-lg h-full flex flex-col shadow-sm hover:shadow-lg">
            <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="text-xl font-semibold">
                    <a className="text-blue-600 hover:text-blue-800 transition-colors" href={serverData.link} target="_blank" rel="noopener noreferrer">{serverData.name}</a>
                </div>
                <div className="text-sm text-gray-500">Score: {serverData.score} • Type: {serverData.type}</div>
                <div className="text-sm text-gray-600">{serverData.notes}</div>
                <div className="flex flex-wrap gap-1 pt-2">{children}</div>
            </div>
        </div>*/
    )
}


export default Card