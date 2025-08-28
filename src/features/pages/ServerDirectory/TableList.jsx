const TableList = ({children}) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Name</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Score</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Type</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Activity</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Location</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Features</th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Link</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default TableList