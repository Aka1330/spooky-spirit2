import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from '@/services/AccountServices'

export type Task1 = {
    firstName: string
    lastName: string
    email: string
    residentCountry: string
    nationality: string
    dialCode: string
    phoneNumber: string
    dob: string
    gender: string
    maritalStatus: string
}

export type Task2 = {
    documentType: string
    passportCover: string
    passportDataPage: string
    nationalIdFront: string
    nationalIdBack: string
    driversLicenseFront: string
    driversLicenseBack: string
}


export type Done = {
    time: string
    date: string
    
}

type CompanyInformation = {
    companyName: string
    contactNumber: string
    country: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
}

export type Task3 = {
    taxResident: string
    tin: string
    noTin: boolean
    noTinReason: string | number
    occupation: string
    annualIncome: string
    sourceOfWealth: string
    companyInformation: CompanyInformation
}

type FormData = {
    task1Information: Task1
    task2Information: Task2
    task3Information: Task3
    doneInformation: Done
   
}

export type StepStatus = Record<number, { status: string }>

type GetAccountFormDataResponse = {
    formData: FormData
    formStatus: StepStatus
}

export type NewTaskState = {
    formData: FormData
    stepStatus: StepStatus
    currentStep: number
}

export const SLICE_NAME = 'accountDetailForm'

export const getForm = createAsyncThunk(SLICE_NAME + '/getForm', async () => {
    const response = await apiGetAccountFormData<GetAccountFormDataResponse>()
    return response.data
})

export const initialState: NewTaskState = {
    formData: {
        task1Information: {
            firstName: '',
            lastName: '',
            email: '',
            residentCountry: '',
            nationality: '',
            dialCode: '',
            phoneNumber: '',
            dob: '',
            gender: '',
            maritalStatus: '',
        },
        task2Information: {
            documentType: 'passport',
            passportCover: '',
            passportDataPage: '',
            nationalIdFront: '',
            nationalIdBack: '',
            driversLicenseFront: '',
            driversLicenseBack: '',
        },
      
        task3Information: {
            taxResident: '',
            tin: '',
            noTin: false,
            noTinReason: '',
            occupation: '',
            annualIncome: '',
            sourceOfWealth: '',
            companyInformation: {
                companyName: '',
                contactNumber: '',
                country: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
            },
        },
        doneInformation: {
            time: '',
            date: '',
           
        },
    },
    stepStatus: {
        0: { status: 'pending' },
        1: { status: 'pending' },
        2: { status: 'pending' },
        3: { status: 'pending' },
        4: { status: 'pending' },
    },
    currentStep: 0,
}

const NewTaskSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setDoneStep: (state) => {
            state.currentStep = 0
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getForm.fulfilled, (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        })
    },
})

export const { setFormData, setStepStatus, setCurrentStep } =
    NewTaskSlice.actions

export default NewTaskSlice.reducer
