import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MainFormT } from "../../pages/Home/models/form"
import axios from "axios"
import { RootState } from "../store"

const initialState: {
    data: MainFormT | null,
    error: string | null
    isLoading: boolean
} = {
    data: null,
    error: null,
    isLoading: false
}

export const fetchFormData = createAsyncThunk(
    'fetchFormData',
    async (params: MainFormT) => {
        const res = await axios.post('/permit/contact-info', params)
        return res
    }
)

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchFormData.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })
    }
})

export const selectError = (state: RootState) => state.form.error

export default formSlice.reducer