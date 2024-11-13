import { useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from '@/constants/countries.constant'
import * as Yup from 'yup'
import type { Done } from '../store'
import type { FieldProps, FormikTouched, FormikErrors } from 'formik'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
type FormModel = Done

type DoneInfomationProps = {
    data: Done
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}



const DoneInfomation = ({
    data = {
       time: '',
       date: ''
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}: DoneInfomationProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'Information', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2"> Information</h3>
              
            </div>
            <Formik
                enableReinitialize
                initialValues={data}
             
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    const formProps = { values, touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                            <div className="text-center h-full flex flex-col justify-center">
            <DoubleSidedImage
                className="mb-6 mx-auto"
                src="/img/others/pending-approval.png"
                darkModeSrc="/img/others/pending-approval-dark.png"
                alt=""
            />
            <h4 className="mb-4">Account application proccessing</h4>
            <p>
                Your account application is currently under review & will be
                finalize shortly.
                <br />
                To fast track your account proccessing, you can try to contact
                our customer services.
            </p>
        </div>
                              
                               
                           
                                <div className="flex justify-end gap-2">
                                    <Button type="button" onClick={onBack}>
                                        Back
                                    </Button>
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Done'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default DoneInfomation
