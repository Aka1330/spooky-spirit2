import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import Categories from './Categories'
import ArticleList from './ArticleList'
import { getCategories, useAppDispatch, useAppSelector } from '../store'

const BodySection = () => {
    const dispatch = useAppDispatch()

    const categories = useAppSelector(
        (state) => state.knowledgeBaseHelpCenter.data.categories
    )
    const articles = useAppSelector(
        (state) => state.knowledgeBaseHelpCenter.data.articles
    )
    const loading = useAppSelector(
        (state) => state.knowledgeBaseHelpCenter.data.loading
    )
    const queryText = useAppSelector(
        (state) => state.knowledgeBaseHelpCenter.data.queryText
    )
    const isSearchResult = useAppSelector(
        (state) => state.knowledgeBaseHelpCenter.data.isSearchResult
    )

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories())
        }
    }, [dispatch, categories.length])

    return (
        <Loading loading={loading}>
            
                <Categories data={categories} />
          
        </Loading>
    )
}

export default BodySection
