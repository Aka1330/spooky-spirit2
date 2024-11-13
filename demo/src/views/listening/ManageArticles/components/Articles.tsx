import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Dropdown from '@/components/ui/Dropdown'
import Loading from '@/components/shared/Loading'
import TextEllipsis from '@/components/shared/TextEllipsis'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import { createSearchParams } from 'react-router-dom'
import Confirmations from './Confirmations'
import {
    getCategorizedArticles,
    toggleArticleDeleteConfirmation,
    toggleCategoryDeleteConfirmation,
    toggleCategoryRenameDialog,
    setSelected,
    useAppDispatch,
    useAppSelector,
    CategorizedArticles,
} from '../store'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import {
    HiChevronRight,
    HiChevronDown,
    HiOutlineTrash,
    HiOutlinePencil,
    HiOutlineCog,
    HiOutlinePlus,
} from 'react-icons/hi'

const CategorySection = ({ data }: { data: CategorizedArticles }) => {
    const dispatch = useAppDispatch()

    const [collapse, setCollapse] = useState(false)

    const navigate = useNavigate()

    const onCollapse = () => {
        setCollapse(!collapse)
    }

   

    const onArticleClick = (id: string) => {
        navigate(`/app/writing/article?${createSearchParams({ id })}`)
    }

  
   

   

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={onCollapse}
                >
                    <span className="text-lg">
                        {collapse ? <HiChevronRight /> : <HiChevronDown />}
                    </span>
                    <h5>{data?.label}</h5>
                    <span>({data?.articles?.length})</span>
                </div>
                <hr className="mx-3 w-full" />
               
            </div>
            <motion.div
                className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{
                    opacity: collapse ? 0 : 1,
                    height: collapse ? 0 : 'auto',
                }}
                transition={{ duration: 0.15 }}
            >
                
                {data?.articles?.map((article) => (
                    <Card key={article.id} bordered clickable
                    className="group mb-4"
                    onClick={() => onArticleClick(article.id)}>
                        <h6 className="truncate mb-4">{article.title}</h6>
                        <div className="min-h-[60px]">
                            <TextEllipsis
                                text={article.content.replace(/<[^>]*>?/gm, '')}
                                maxTextCount={120}
                            />
                        </div>
                      
                    </Card>
                ))}
            </motion.div>
        </div>
    )
}

const Articles = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.loading
    )
    const categorizedArticles = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.categorizedArticles
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getCategorizedArticles())
    }

    return (
        <Loading loading={loading}>
            {categorizedArticles.map((cat) => (
                <CategorySection key={cat.value} data={cat} />
            ))}
            <Confirmations data={categorizedArticles} />
        </Loading>
    )
}

export default Articles
