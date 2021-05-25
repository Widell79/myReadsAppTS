import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BOOKS_STORAGE_KEY = "MyReadsApp:books";

const SEARCH_API = "https://www.googleapis.com/books/v1/volumes?q=";
const GET_BOOK_BY_ID_API = "https://www.googleapis.com/books/v1/volumes/";

export async function getInitial() {
  try {
    const response = await axios.get(`${GET_BOOK_BY_ID_API}2HvGDwAAQBAJ`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBook(id: string) {
  try {
    const response = await axios.get(`${GET_BOOK_BY_ID_API}${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function search(query: string) {
  try {
    const response = await axios.get(`${SEARCH_API}${query}`);

    return response.data.items;
  } catch (error) {
    console.log(error);
  }
}
