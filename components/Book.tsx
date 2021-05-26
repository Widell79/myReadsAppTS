import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as BooksAPI from "../utils/api";
import { useAppSelector, useAppDispatch } from "../hooks";
import { updateShelf } from "../features/books/booksSlice";

const Book = ({ route }) => {
  const {
    image,
    bookTitle,
    bookAuthor,
    id,
    shelf,
    language,
    pages,
    publishedDate,
  } = route.params;

  const dispatch = useAppDispatch();

  const updateBookShelf = (id: any, shelf: string) => {
    const bookId = id.id;
    dispatch(updateShelf(bookId, shelf));
  };

  const handleUpdate = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    updateBookShelf({ id }, value);
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listBooksContent}>
        <View style={styles.book}>
          <View>
            <Image
              source={{ uri: image }}
              style={{
                width: 128,
                height: 188,
                backgroundColor: "#eee",
                marginTop: 10,
              }}
            />
            <View style={styles.bookShelfChanger}>
              <select
                onChange={handleUpdate}
                defaultValue={shelf === undefined ? "none" : shelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </View>
          </View>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
          <Text style={styles.bookAuthors}>{bookAuthor}</Text>
          <Text style={styles.text}>Language: {language}</Text>
          <Text style={styles.text}>Pages: {pages}</Text>
          <Text style={styles.text}>Published: {publishedDate}</Text>
        </View>
      </View>
    </View>
  );
};
export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf3e0",
  },
  listBooksContent: {
    paddingTop: 40,
    paddingLeft: 80,
    margin: "auto",
    flex: 1,
  },
  book: {
    width: 200,
  },
  bookTop: {
    position: "relative",
    height: 200,
    display: "flex",
    alignItems: "flex-end",
  },
  bookTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  bookAuthors: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#7e7e7e",
  },
  bookShelfChanger: {
    position: "relative",
    right: 0,
    bottom: -10,
    width: 130,
    height: 40,

    cursor: "pointer",
  },
});