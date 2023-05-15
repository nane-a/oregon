import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { RootState } from "../store"

const initialState: {
    dataUS: any | null,
    dataCanada: any | null,
    error: string | null
    isLoading: boolean
} = {
    dataUS: null,
    dataCanada: null,
    error: null,
    isLoading: false
}

export const getStatesUS = createAsyncThunk(
    'getStatesUS',
    async () => {
        const res = await axios.get('/permit/get-us-states')
        return res
    }
)

export const getStatesCanada = createAsyncThunk(
    'getStatesCanada',
    async () => {
        const res = await axios.get('/permit/get-canada-states')
        return res
    }
)

const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //US
        builder.addCase(getStatesUS.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getStatesUS.fulfilled, (state, action: PayloadAction<any>) => {
            state.dataUS = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getStatesUS.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })

        //Canada
        builder.addCase(getStatesCanada.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getStatesCanada.fulfilled, (state, action: PayloadAction<any>) => {
            state.dataCanada = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getStatesCanada.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })
    }
})

export const selectStatesDataUS = (state: RootState) => state.states.dataUS
export const selectStatesDataCanada = (state: RootState) => state.states.dataCanada

export default statesSlice.reducer