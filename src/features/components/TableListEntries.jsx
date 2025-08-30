const TableListEntries = ({serverData, activityLevelStyles, featureTagStyles}) => {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{serverData.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{serverData.rating}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300">{serverData.tag}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activityLevelStyles[serverData.activityLevel]}`}>{serverData.activityLevel}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{serverData.location} • {serverData.language}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                    {serverData.features.map(feature => {
                        return (
                            <span key={`${serverData.name}-${feature}`} title={feature} className={`inline-flex items-center p-1 ${featureTagStyles[feature].color} rounded-md`}>
                                {featureTagStyles[feature].icon}
                            </span>
                        )
                    })}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">link</a>
            </td>
        </tr>
    )    
}

export default TableListEntries
