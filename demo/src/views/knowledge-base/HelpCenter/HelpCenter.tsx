import TopSection from './components/TopSection'
import BodySection2 from './components/BodySection'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('knowledgeBaseHelpCenter', reducer)

const HelpCenter = () => {
    return (
        <>
            <TopSection />
            <Container>
                <div className="mt-8 px-4">
                    <BodySection2 />
                </div>
            </Container>
        </>
    )
}

export default HelpCenter
