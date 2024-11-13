import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import ArticleContent from './components/ArticleContent'
import OthersArticle from './components/OthersArticle'

injectReducer('knowledgeBaseArticle', reducer)

const Article = () => {
    const query = useQuery()
    const id = query.get('id') as string

    return (
        <Container>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-6 gap-4 h-full">
                    <div className="2xl:col-span-3 xl:col-span-1 lg:col-span-3">
                    <ArticleContent articleId={id} />
                </div>
                <div className="'2xl:col-span-3 lg:col-span-3 xl:col-span-2'">
                <OthersArticle articleId={id} />
                </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Article
