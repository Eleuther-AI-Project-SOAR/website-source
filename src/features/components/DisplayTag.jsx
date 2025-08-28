import { PaperChannelIcon, ReadingGroupIcon, VCEventsIcon, JobsBoardIcon } from "../icons/TagIcons"

const featureTagStyles = {
    'Reading Group': { icon: <ReadingGroupIcon />, color: 'bg-purple-100 text-purple-800' },
    'Paper Channel': { icon: <PaperChannelIcon />, color: 'bg-blue-100 text-blue-800' },
    'VC events/Office Hours': { icon: <VCEventsIcon />, color: 'bg-green-100 text-green-800' },
    'Jobs Board': { icon: <JobsBoardIcon />, color: 'bg-orange-100 text-orange-800' },
}

const DisplayTag = ({feature}) => {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 ${featureTagStyles[feature].color} rounded-md text-xs font-medium`}>
            {featureTagStyles[feature].icon}
            {feature}
        </span>
    )
}

export default DisplayTag