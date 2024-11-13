// وقتی به مرحله آخر رسید با اطلاعات و برای دفعه بعد پاک شود

import { useEffect, useMemo, lazy, Suspense } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import FormStep from './components/FormStep'
import reducer, {
    getForm,
    setStepStatus,
    setFormData,
    setCurrentStep,
    useAppDispatch,
    useAppSelector,
    Task1 as Task1InformationType,
    Task2 as Task2InformationType,
    Task3 as Task3InformationType,
    Done as  DoneInformationType
   
} from './store'
import { injectReducer } from '@/store'

injectReducer('readingDetailForm', reducer)

const Task1Information = lazy(
    () => import('./components/Task1')
)
const Task2Information = lazy(() => import('./components/Task2'))
const Task3Information = lazy(() => import('./components/Task3'))
const FinancialInformation = lazy(
    () => import('./components/Done')
)
const AccountReview = lazy(() => import('./components/AccountReview'))

const DetailForm = () => {
    const dispatch = useAppDispatch()
    const stepStatus = useAppSelector(
        (state) => state.readingDetailForm.data.stepStatus
    )
    const currentStep = useAppSelector(
        (state) => state.readingDetailForm.data.currentStep
    )
    const formData = useAppSelector(
        (state) => state.readingDetailForm.data.formData
    )

    useEffect(() => {
        dispatch(getForm())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNextChange = (
        values:
            | Task1InformationType
            | Task2InformationType
            | Task3InformationType
            | DoneInformationType,
        name: string
    ) => {
        const nextStep = currentStep + 1
        dispatch(setFormData({ [name]: values }))
        dispatch(
            setStepStatus({
                [currentStep]: { status: 'complete' },
                [nextStep]: { status: 'current' },
            })
        )
        dispatch(setCurrentStep(nextStep))
    }

    const handleBackChange = () => {
        const previousStep = currentStep - 1
        dispatch(setCurrentStep(previousStep))
    }

    const currentStepStatus = useMemo(
        () => stepStatus[currentStep].status,
        [stepStatus, currentStep]
    )
    
    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-6 gap-4 h-full">
                    {currentStep !== 4 && (
                        <div className="2xl:col-span-3 xl:col-span-1 lg:col-span-3">
                      
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                            />
                        </div>
                    )}
                    <div
                        className={
                            currentStep !== 4
                                ? '2xl:col-span-3 lg:col-span-3 xl:col-span-2'
                                : 'lg:col-span-5'
                        }
                    >
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <Task1Information
                                    data={formData.task1Information}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                />
                            )}
                            {currentStep === 1 && (
                                <Task2Information
                                    data={formData.task2Information}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 2 && (
                                <Task3Information
                                    data={formData.task3Information}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 3 && (
                                <FinancialInformation
                                    data={formData.doneInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 4 && ( <AccountReview />
                            )
                            }
                        </Suspense>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DetailForm
