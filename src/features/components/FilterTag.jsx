const FilterTag = ({text, onClick, isSelected=false}) => {
    const unSelectStyle = "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
    const selectStyle = "bg-indigo-600 text-white border-indigo-600"
    return (
        <button className={`px-2.5 py-1 border rounded-full text-xs transition-colors cursor-pointer duration-200
            ${isSelected ? selectStyle : unSelectStyle}`} 
            style={{userSelect: 'none'}} onClick={() => onClick(text)}>{text}</button>
    )
}

export default FilterTag
