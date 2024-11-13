import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export type GridItemProps = {
    data: {
        id: number
        name: string
        category: string
        task: string
        desc: string
        attachmentCount: number
        totalTask: number
        completedTask: number
        progression: number
        dayleft: number
        status: string
        member: {
            name: string
            img: string
        }[]
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { name,category,  totalTask, completedTask, progression, desc , task} = data

    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to="/app/writing/issue">
                        <h6>{name}</h6>
                    </Link>
                    <p className="mt-4">{task}</p>
                </div>
                <p className="mt-4">{desc}</p>
                <div className="mt-3">
                    <ProgressionBar progression={progression} />
                    <div className="flex items-center justify-between mt-2">
                    <Link to="/app/project/issue">
                        <h6>{category}</h6>
                    </Link>
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    { totalTask}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
