import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { RootState } from "../store"

const initialState: {
    startPoints: any | null,
    exitPoints: any | null,
    error: string | null
    isLoading: boolean
} = {
    startPoints: null,
    exitPoints: null,
    error: null,
    isLoading: false
}

export const getExitPoints = createAsyncThunk(
    'getExitPoints',
    async () => {
        const res = await axios.get('/permit/get-exit-points')
        return res
    }
)

export const getStartPoints = createAsyncThunk(
    'getStartPoints',
    async () => {
        const res = await axios.get('/permit/get-start-points')
        return res
    }
)

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //Exit points
        builder.addCase(getExitPoints.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getExitPoints.fulfilled, (state, action: PayloadAction<any>) => {
            state.exitPoints = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getExitPoints.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })

        //Start points
        builder.addCase(getStartPoints.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getStartPoints.fulfilled, (state, action: PayloadAction<any>) => {
            state.startPoints = action.payload.data
            state.isLoading = false
        })
        builder.addCase(getStartPoints.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = true
        })
    }
})

export const selectExitPointsData = (state: RootState) => state.points.exitPoints
export const selectStartPointsData = (state: RootState) => state.points.startPoints

export default pointsSlice.reducer