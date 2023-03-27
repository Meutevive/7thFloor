import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDirectors } from "../utils/api/directorsController";


export const fetchAllDirectors = createAsyncThunk(
    '/directors/fetchAllDirectors',
    ()=>{
        return getDirectors()
    }
)

const initialState = {
    allDirectors: [],
    isLoading: false
}

const directorsSlice = createSlice({
    name: 'directors',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllDirectors.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchAllDirectors.fulfilled, (state, action)=>{
            state.allDirectors = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchAllDirectors.rejected, (state)=>{
            state.isLoading = false;
        })
    }

})

export default directorsSlice.reducer