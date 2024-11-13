import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, NewTestState } from './NewTestSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: KycFormState
        }
    }
> = useSelector

export * from './NewTestSlice'
export { useAppDispatch } from '@/store'
export default reducer
