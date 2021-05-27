import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import {BookParams} from "../../components/Params"

// Define a type for the slice state
const initialState : BookParams[] = [];

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      add_search: (state, action: PayloadAction<[]>) => {
       
        return [...action.payload];
        
      },
    
    
  },
})

export const { add_search } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.search

export default searchSlice.reducer