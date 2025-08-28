import { ArrowDownIcon, GridIcon, ListIcon } from "../../icons/SymbolIcons"

const Results = ({handleTableListViewOnClick, isTableViewOn, children}) => {
    const viewSwitcherStyles = {
        'active': 'bg-white shadow',
        'inactive': 'text-gray-500 hover:bg-gray-300'
    }

    return (
        <div className="w-full flex-1 min-w-0">
            <div className="flex justify-between items-start mb-4">
                <div className="relative">
                    <button className="flex items-center space-x-2 p-2 border rounded-md bg-white text-sm">
                        <span>Sort Priority</span>
                        <ArrowDownIcon></ArrowDownIcon>
                    </button>
                </div>
                <div className="flex items-center p-1 bg-gray-200 rounded-lg">
                    <button className={`p-2 rounded-md ${!isTableViewOn ? viewSwitcherStyles['active'] : viewSwitcherStyles['inactive']}`} onClick={() => handleTableListViewOnClick('grid')}>
                        <GridIcon></GridIcon>
                    </button>
                    <button className={`p-2 rounded-md ${isTableViewOn ? viewSwitcherStyles['active'] : viewSwitcherStyles['inactive']}`} onClick={() => handleTableListViewOnClick('table')}>
                        <ListIcon></ListIcon>
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Results