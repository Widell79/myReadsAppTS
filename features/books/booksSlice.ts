import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler';
import type { RootState } from '../../store/store'
import {getBook} from "../../utils/api"


type BooksState = {
  volumeInfo: any;
  id: string
  shelf: string
};

const initialState : BooksState[] = [];

export const booksSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
    receive_books: (state, action: PayloadAction<BooksState>) => {
        
        return [
          {
            ...state,
            ...action.payload,
            shelf: "currentlyReading",
          },
        ];
      },
    update_shelf: (state, action: PayloadAction<BooksState>) => {
      return [
        {
          ...state,
          ...action.payload,
          shelf: action.payload.shelf,
          
          
        }
      ]
    }
    
  },
})

export const { receive_books, update_shelf } = booksSlice.actions

export function updateShelf(id: any, shelf: string) {
  return async (dispatch) => {
    try {
      await getBook(id).then((book) => {
        console.log("Slice", book)});
      dispatch(update_shelf(<BooksState>{shelf: shelf}));
    } catch (err) {
      console.warn("Error in saveCard: ", err);
      alert("There was an error saving your card. Please try again.");
    }
  };
}

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books

export default booksSlice.reducer