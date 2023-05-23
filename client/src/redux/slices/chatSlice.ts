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

export const getMessages = createAsyncThunk(
    'getMessages',
    async (params: { usdot: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('chat/open-chat', params)
            return response
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.data = {...state.data, data: [...state.data.data, action.payload]}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMessages.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = false
        })
    }
})

export const selectMessages = (state: RootState) => state.chat.data
export const selectIsLoading = (state: RootState) => state.chat.isLoading
export const { updateState } = chatSlice.actions

export default chatSlice.reducer