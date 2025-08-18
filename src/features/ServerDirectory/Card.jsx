const Card = ({serverData, children}) => {
    return (
        <div className="bg-white border border-black-300 p-4 rounded-lg h-full flex flex-col shadow-sm hover:shadow-lg">
            <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="text-xl font-semibold">
                    <a className="text-blue-600 hover:text-blue-800 transition-colors" href={serverData.link} target="_blank" rel="noopener noreferrer">{serverData.name}</a>
                </div>
                <div className="text-sm text-gray-500">Score: {serverData.score} • Type: {serverData.type}</div>
                <div className="text-sm text-gray-600 flex-1">{serverData.notes}</div>
                <div className="flex flex-wrap gap-1 pt-2">{children}</div>
            </div>
        </div>
    )
}


export default Card