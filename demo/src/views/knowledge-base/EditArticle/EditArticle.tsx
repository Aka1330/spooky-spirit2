import { useEffect } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Button from '@/components/ui/Button'
import Editor from './components/Editor2'
import useQuery from '@/utils/hooks/useQuery'
import { injectReducer } from '@/store'
import reducer, {
    getArticle,
    setArticle,
    setCategory,
    setMode,
    useAppDispatch,
    useAppSelector,
} from './store'

injectReducer('knowledgeBaseEditArticle', reducer)

const EditArticle = () => {
    const dispatch = useAppDispatch()

    const mode = useAppSelector(
        (state) => state.knowledgeBaseEditArticle.data.mode
    )

    const query = useQuery()

    const id = query.get('id')

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        const categoryLabel = query.get('categoryLabel')
        const categoryValue = query.get('categoryValue')

       /* if (id) {
            dispatch(getArticle({ id }))
        }

        if (!id) {
            dispatch(setMode('add'))
            dispatch(setArticle(''))
        }*/
        dispatch(setMode('task1'))
        dispatch(setArticle(''))
        
    }

    const onModeChange = (mode: string) => {
        dispatch(setMode(mode))
    }

    return (
        <Container>
            <AdaptableCard>
                <div className="max-w-[800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3>
                              
                            {mode === 'task1' && <span>Writing Test "Task 1"</span>}
                            {mode === 'task2' && <span>Writing Test "Task 2"</span>}
                            {mode === 'preview' && <span>Preview </span>}
                        </h3>
                        {mode === 'preview' ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    onModeChange(id ? 'task1' : 'task2')
                                }
                            >
                                Back
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => onModeChange('preview')}
                            >
                                Preview
                            </Button>
                        )}
                    </div>
                    <Editor mode={mode} />
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default EditArticle
