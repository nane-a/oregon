import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MainFormT } from "../../pages/Home/models/form"
import axios from "../../api/axios"
import { RootState } from "../store"
import { RouteFormT, TruckFormT } from "../../pages/CalculatingForm/models/calculatingForms"

const initialState: {
    data: any,
    isLoading: boolean
} = {
    data: null,
    isLoading: false
}

export const fetchFormData = createAsyncThunk(
    'fetchFormData',
    async (params: MainFormT, { rejectWithValue }) => {
        try {
            const response = await axios.post('/permit/contact-info', params)
            return response
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchTruckFormData = createAsyncThunk(
    'fetchTruckFormData',
    async (params: TruckFormT, { rejectWithValue }) => {
        try {
            const response = await axios.post('/permit/truck', params)
            return response
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchRouteFormData = createAsyncThunk(
    'fetchRouteFormData',
    async (params: RouteFormT, { rejectWithValue }) => {
        try {
            const response = await axios.post('/permit/route', params)
            return response
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Main form data
        builder.addCase(fetchFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            localStorage.setItem('usdot_id', action.payload.data.data.usdot_id)
            localStorage.setItem('usdot', action.payload.data.data.usdot)
            state.isLoading = false

        })
        builder.addCase(fetchFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.isLoading = true
        })

        // Truck form data
        builder.addCase(fetchTruckFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchTruckFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false

        })
        builder.addCase(fetchTruckFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.isLoading = true
        })

        // Route form data
        builder.addCase(fetchRouteFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchRouteFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false

        })
        builder.addCase(fetchRouteFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.isLoading = true
        })
    }
})

export const selectFormData = (state: RootState) => state.form.data

export default formSlice.reducer