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
import type { Address } from '../store'
import type { FieldProps, FormikTouched, FormikErrors } from 'formik'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
type FormModel = Address

type AddressInfomationProps = {
    data: Address
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

type AddressFormProps = {
    values: FormModel
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
    countryName: string
    addressLine1Name: string
    addressLine2Name: string
    cityName: string
    stateName: string
    zipCodeName: string
}

const validationSchema = Yup.object().shape({
    country: Yup.string().required('Please select country'),
    addressLine1: Yup.string().required('Please enter your address'),
    addressLine2: Yup.string(),
    city: Yup.string().required('Please enter your city'),
    state: Yup.string().required('Please enter your state'),
    zipCode: Yup.string().required('Please enter zip code'),
    sameCorrespondenceAddress: Yup.bool(),
    correspondenceAddress: Yup.object().when('sameCorrespondenceAddress', {
        is: false,
        then: (schema) =>
            schema.shape({
                country: Yup.string().required('Please select country'),
                addressLine1: Yup.string().required(
                    'Please enter your address'
                ),
                addressLine2: Yup.string(),
                city: Yup.string().required('Please enter your city'),
                state: Yup.string().required('Please enter your state'),
                zipCode: Yup.string().required('Please enter zip code'),
            }),
        otherwise: (schema) => schema,
    }),
})

const AddressForm = (props: AddressFormProps) => {
    const {
        values,
        touched,
        errors,
        countryName,
        addressLine1Name,
        addressLine2Name,
        cityName,
        stateName,
        zipCodeName,
    } = props

    const getError = useCallback(
        (name: string) => {
            return get(errors, name)
        },
        [errors]
    )

    const getTouched = useCallback(
        (name: string) => {
            return get(touched, name)
        },
        [touched]
    )

    return (
        <>
            <div className="md:grid grid-cols-2 gap-4">
           
              
              
            </div>
            <div className="md:grid grid-cols-2 gap-4">
               
            </div>
            <div className="md:grid grid-cols-2 gap-4">
               
                <FormItem
                    label="Zip Code"
                    invalid={getError(zipCodeName) && getTouched(zipCodeName)}
                    errorMessage={getError(zipCodeName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={zipCodeName}
                        placeholder="Zip Code"
                        component={Input}
                    />
                </FormItem>
            </div>
        </>
    )
}

const AddressInfomation = ({
    data = {
        country: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        sameCorrespondenceAddress: true,
        correspondenceAddress: {
            country: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
        },
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}: AddressInfomationProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'addressInformation', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Address Information</h3>
                <p>
                    Enter your address information help us to speed up the
                    verication process.
                </p>
            </div>
            <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={validationSchema}
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

export default AddressInfomation
