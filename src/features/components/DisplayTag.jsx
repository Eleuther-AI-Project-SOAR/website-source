const DisplayTag = ({feature, featureTagStyles}) => {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 ${featureTagStyles[feature].color} rounded-md text-xs font-medium`}>
            {featureTagStyles[feature].icon}
            {feature}
        </span>
    )
}

export default DisplayTag