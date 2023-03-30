import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getArticles} from "../utils/api/articlesController";


export const fetchAllArticles = createAsyncThunk(
    '/articles/fetchAllArticles',
    ()=>{
        return getArticles()
    }
)

/*export const fetchActor = createAsyncThunk(
    '/actors/fetchActor',
    ()=>{
        return getActor()
    }
)*/

const initialState = {
    allArticles: [],
    isLoading: false
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllArticles.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchAllArticles.fulfilled, (state, action)=>{
            state.allArticles = action.payload;
            state.isLoading = false;
        })

        builder.addCase(fetchAllArticles.rejected, (state)=>{
            state.isLoading = false;
        })
    }

})

export default articlesSlice.reducer