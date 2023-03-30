import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getFilms } from "../utils/api/filmsController";

export const fetchAllFilms = createAsyncThunk(
    '/films/fetchAllFilms',
    ()=>{
        return getFilms()
    }
)

const initialState = {
    allFilms: [],
    isLoading: false
}

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilms.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchAllFilms.fulfilled, (state, action)=>{
            state.allFilms = action.payload.content;
            state.isLoading = false;
        })
        builder.addCase(fetchAllFilms.rejected, (state)=> {
            state.isLoading = false;
        })
    }
})

export default filmsSlice.reducer