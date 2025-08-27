const FilterTag = ({text, onClick, isSelected=false}) => {
    const unSelectStyle = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
    const selectStyle = "bg-indigo-600 text-white border-indigo-600"
    return (
        <button className={`px-2.5 py-1 border rounded-full text-xs transition-colors cursor-pointer duration-200
            ${isSelected ? selectStyle : unSelectStyle}`} 
            style={{userSelect: 'none'}} onClick={() => onClick(text.toLowerCase())}>{text}</button>
    )
}

export default FilterTag
