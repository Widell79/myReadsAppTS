import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state

export const booksSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [],
  reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
    receive_books: (state, action: PayloadAction<{}>) => {
        console.log(action.payload);
        
        return [
          {
            ...state,
            ...action.payload,
            shelf: "currentlyReading",
          },
        ];
      },
    
    
  },
})

export const { receive_books } = booksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books

export default booksSlice.reducer