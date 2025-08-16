const FilterTag = ({text, onClick, isSelected=false}) => {
    const defaultStyle = "bg-white text-gray-600 border border-gray-300"
    return (
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block cursor-pointer hover:opacity-80 transition-all  
        ${ isSelected ? 'bg-blue-600 text-white border-blue-500': defaultStyle}`}
        style={{userSelect: 'none'}}
        onClick={() => onClick(text) }>{text}</span>
    )
}

export default FilterTag
