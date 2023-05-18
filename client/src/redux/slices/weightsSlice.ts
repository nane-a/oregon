import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { RootState } from "../store"

const initialState: {
    data: any | null,
    error: string | null
    isLoading: boolean
} = {
    data: null,
    error: null,
    isLoading: false
}

export const getWeights = createAsyncThunk(
    'getWeights',
    async () => {
        const res = await axios.get('/permit/get-weights')
        return res
    }
)

const weightsSlice = createSlice({
    name: 'weights',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getWeights.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getWeights.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getWeights.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = false
        })
    }
})

export const selectWeightData = (state: RootState) => state.weights.data

export default weightsSlice.reducer