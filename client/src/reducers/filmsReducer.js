import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getFilms } from "../utils/api/filmsController";

export const fetchAllFilms = createAsyncThunk(
    '/films/fetchAllFilms',
    (page) => {
        console.log(page);
        return getFilms(page)
    }
)

const initialState = {
    allFilms: [],
    elements: 0,
    pages: 0,
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
        builder.addCase(fetchAllFilms.fulfilled, (state, action) => {
            console.log(action.payload);
            state.allFilms = action.payload.content;
            state.elements = action.payload.totalElements;
            state.pages = action.payload.totalPages;
            state.isLoading = false;
        })
        builder.addCase(fetchAllFilms.rejected, (state)=> {
            state.isLoading = false;
        })
    }
})

export default filmsSlice.reducer