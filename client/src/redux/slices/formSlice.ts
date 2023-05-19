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

export const fetchPaymentFormData = createAsyncThunk(
    'fetchPaymentFormData',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await axios.post("payment/send-payment", {
                amount: Math.round(params.price * 100),
                token: params.id,
                usdot_id: localStorage.getItem('usdot_id'),
                email: localStorage.getItem('email'),
                usdot: localStorage.getItem('usdot')
            })
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
            state.data = { ...state.data, contacts: action.payload.data }
            localStorage.setItem('usdot_id', action.payload.data.data.usdot_id)
            localStorage.setItem('usdot', action.payload.data.data.usdot)
            localStorage.setItem('email', action.payload.data.data.email_adress)
            state.isLoading = false
        })
        builder.addCase(fetchFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data ={ ...state.data, contacts: action.payload}
            state.isLoading = false
        })

        // Truck form data
        builder.addCase(fetchTruckFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchTruckFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = { ...state.data, truck: action.payload.data }
            state.isLoading = false
        })
        builder.addCase(fetchTruckFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = { ...state.data, truck: action.payload}
            state.isLoading = false
        })

        // Route form data
        builder.addCase(fetchRouteFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchRouteFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = { ...state.data, route: action.payload.data }
            state.isLoading = false
        })
        builder.addCase(fetchRouteFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = { ...state.data, route: action.payload}
            state.isLoading = false
        })

        // Payment form data
        builder.addCase(fetchPaymentFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchPaymentFormData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false

        })
        builder.addCase(fetchPaymentFormData.rejected, (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.isLoading = false
        })
    }
})

export const selectFormData = (state: RootState) => state.form.data
export const selectIsLoading = (state: RootState) => state.form.isLoading

export default formSlice.reducer