import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler';
import type { RootState } from '../../store/store'
import {getBook} from "../../utils/api"
import {BookParams} from "../../components/Params"
import { Value } from 'react-native-reanimated';



const initialState : BookParams[] = [{volumeInfo: {}, id: "", shelf: "currentlyReading"}];

export const booksSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
    receive_books: (state, action: PayloadAction<BookParams>) => {
      console.log("Payload", action.payload);
        return [
          {
            ...state,
            ...action.payload,
            shelf: "currentlyReading"
            
          },
        ];
      },
    update_shelf: (state, action: PayloadAction<BookParams>) => {
      const {shelf, id} = action.payload
      
      return [
        {...state[0], shelf}
      ]
    }
    
  },
})

export const { receive_books, update_shelf } = booksSlice.actions

export function updateShelf(id: string, shelf: string) {
  return async (dispatch) => {
    try {
      await getBook(id).then((book) => {
        console.log("Slice", book)});
      dispatch(update_shelf(<BookParams>{shelf, id}));
    } catch (err) {
      console.warn("Error in saveCard: ", err);
      alert("There was an error saving your card. Please try again.");
    }
  };
}

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books

export default booksSlice.reducer