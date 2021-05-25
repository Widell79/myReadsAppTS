import { getInitial } from "../../utils/api";
import { receive_books } from "../books/booksSlice";


export const handleInitialData = () => {

  return async (dispatch: any) => {
    try {
      const booksData = await getInitial().then((books: {}) => {
        dispatch(receive_books(books));
      });

      if (booksData === null) return;
    } catch (e) {
      console.error("Failed to load books!");
    }
  };
};
