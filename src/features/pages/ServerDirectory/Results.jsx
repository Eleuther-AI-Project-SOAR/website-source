import { GridIcon, ListIcon, SortIcon } from "../../icons/SymbolIcons"
import SortDropDown from "../../components/SortDropDown"

const Results = ({handleTableListViewOnClick, isTableViewOn, children, filterControls}) => {
    const viewSwitcherStyles = {
        'active': 'bg-white dark:bg-gray-800 shadow',
        'inactive': 'text-gray-500 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700'
    }

    // Determine button text based on sorting state
    const getSortButtonText = () => {
        if (filterControls.isSortingApplied) {
            return `${filterControls.primarySortOption}: ${filterControls.secondarySortOption}`;
        }
        return "Sort By";
    };

    return (
        <div className="w-full flex-1 min-w-0">
            <div className="flex justify-between items-start mb-4">
                <div className="relative">
                    <button 
                        className="flex items-center space-x-2 p-2 border rounded-md bg-white dark:bg-gray-800 text-sm dark:text-gray-200"
                        onClick={filterControls.toggleSortDropdown}
                    >
                        <span className="whitespace-nowrap">{getSortButtonText()}</span>
                        <SortIcon></SortIcon>
                    </button>
                    {filterControls.showSortDropdown && (
                        <SortDropDown
                            primarySortOption={filterControls.primarySortOption}
                            secondarySortOption={filterControls.secondarySortOption}
                            setSorting={filterControls.setSorting}
                            showSortDropdown={filterControls.showSortDropdown}
                            toggleSortDropdown={filterControls.toggleSortDropdown}
                            resetSorting={filterControls.resetSorting}
                            isSortingApplied={filterControls.isSortingApplied}
                        />
                    )}
                </div>
                <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
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
