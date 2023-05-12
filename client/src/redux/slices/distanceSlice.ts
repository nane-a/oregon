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

export const getDistanceAddPrice = createAsyncThunk(
    'getDistanceAddPrice',
    async (params: { usdot: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/permit/get-distance-and-price', params)
            return response
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

const distanceSlice = createSlice({
    name: 'distance',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getDistanceAddPrice.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getDistanceAddPrice.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getDistanceAddPrice.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })
    }
})

export const selectDistanceAddPrice = (state: RootState) => state.distance.data

export default distanceSlice.reducer