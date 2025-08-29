import { useState } from 'react'
import { CloseIcon, RightArrowIcon } from '../icons/SymbolIcons'

const SortDropDown = () => {
    const [chosenSortLevels, setSortedLevels] = useState({
        'Score': true,
        'Name': false,
        'Activity': false,
        'Server Type': false,
        'Activity Level': false,
        'Language': false,
        'Location': false,
        'Others': false
    })

    return (
        <div class="absolute top-full mt-1 w-72 bg-white border rounded-md shadow-lg z-50 p-2 space-y-2">
            <div class="flex items-center justify-between group">
                <button class="p-2 text-gray-400 hover:text-red-600">
                    <CloseIcon className="w-4 h-4"></CloseIcon>
                </button>
                <div class="relative flex-grow">
                    <button class="w-full text-left p-2 hover:bg-gray-100 rounded-md flex justify-between items-center">
                        <span>Score: descending</span>
                        <RightArrowIcon></RightArrowIcon>
                    </button>
                </div>
            </div>
            <div class="border-t pt-2">
                <div class="relative">
                    <button class="text-sm font-semibold text-indigo-600 hover:text-indigo-800 w-full text-left p-2 disabled:text-gray-400 disabled:cursor-not-allowed">Choose Sort Option</button>
                </div>
            </div>
        </div>
    )
}

export default SortDropDown