import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler';
import type { RootState } from '../../store/store'
import {getBook} from "../../utils/api"
import {BookParams} from "../../components/Params"
import { Value } from 'react-native-reanimated';



const initialState : BookParams[] = [];

export const booksSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
    receive_books: (state, action: PayloadAction<BookParams>) => {
      const initialBook = {...state, ...action.payload, shelf: "currentlyReading"}

      return [...state, initialBook];
      },
  
    update_shelf: (state, action: PayloadAction<BookParams>) => {
      const {shelf, id, book} = action.payload;
      const updatedBook = {...book, shelf}
      
      if(state[0].id === id || state[state.length -1].id === id){
      return [{...state = updatedBook}]
    } else {
      return [...state, updatedBook]
    }
  }
    
  },
})

export const { receive_books, update_shelf } = booksSlice.actions

export function updateShelf(id: string, shelf: string) {
  return async (dispatch) => {
    try {
      await getBook(id).then((book) => {
        dispatch(update_shelf(<BookParams>{shelf, id, book}));
      });
    } catch (err) {
      console.warn("Error in saveCard: ", err);
      alert("There was an error saving your card. Please try again.");
    }
  };
}

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books

export default booksSlice.reducer