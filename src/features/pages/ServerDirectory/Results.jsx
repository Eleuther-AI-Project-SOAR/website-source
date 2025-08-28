import { ArrowDownIcon, GridIcon, ListIcon } from "../../icons/SymbolIcons"


const Results = ({children}) => {
    return (
        <div className="w-full flex-1 min-w-0">
            <div class="flex justify-between items-start mb-4">
                <div class="relative">
                    <button class="flex items-center space-x-2 p-2 border rounded-md bg-white text-sm">
                        <span>Sort Priority</span>
                        <ArrowDownIcon></ArrowDownIcon>
                    </button>
                </div>
                <div class="flex items-center p-1 bg-gray-200 rounded-lg">
                    <button class="p-2 rounded-md bg-white shadow">
                        <GridIcon></GridIcon>
                    </button>
                    <button class="p-2 rounded-md text-gray-500 hover:bg-gray-300">
                        <ListIcon></ListIcon>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-6 items-stretch">
                {children}
            </div>
        </div>
    )
}

export default Results