const Results = ({children}) => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {children}
            </div>
        </div>
    )
}

export default Results