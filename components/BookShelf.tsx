import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { selectBooks } from "../features/books/booksSlice";

import * as BooksAPI from "../utils/api";
import { handleInitialData } from "../features/shared/shares";
//import Book from "./Book";

const BookShelf = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const bookShelfs = ["Currently Reading", "Want to Read", "Read"];

  const convertShelf = {
    "Currently Reading": "currentlyReading",
    "Want to Read": "wantToRead",
    Read: "read",
  };

  //   const updateBookShelf = (id, shelf) => {
  //     const bookId = id.id;

  //     BooksAPI.getBook(bookId).then((book) => {
  //       setBooks(() => [{ ...book, shelf: shelf }]);
  //     });
  //   };

  const books = useSelector(selectBooks);
  console.log("My books", books);

  return (
    <View style={styles.listBooksContent}>
      {bookShelfs.map((shelf) => (
        <View key={shelf} style={styles.bookshelf}>
          <Text style={styles.bookshelfTitle}>{shelf}</Text>
          <View style={styles.bookshelfBooks}>
            <View style={styles.booksGrid}>
              {books
                .filter(function (book) {
                  return book.shelf === convertShelf[shelf];
                })
                .map((book) => {
                  const background = `${
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "./bg.png"
                  }`;
                  return (
                    <View key={book.id}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Book", {
                            bookTitle: book.volumeInfo.title,
                            bookAuthor: book.volumeInfo.authors,
                            image: background,
                            shelf: book.shelf,
                            language: book.volumeInfo.language,
                            pages: book.volumeInfo.pageCount,
                            publishedDate: book.volumeInfo.publishedDate,
                          });
                        }}
                      >
                        <View style={styles.book}>
                          <View style={styles.bookTop}>
                            <ImageBackground
                              source={{ uri: background }}
                              style={{
                                width: 128,
                                height: 188,
                                backgroundColor: "#eee",
                                marginTop: 10,
                              }}
                            />
                          </View>
                          <Text style={styles.bookTitle}>
                            {book.volumeInfo.title}
                          </Text>
                          <Text style={styles.bookAuthors}>
                            {book.volumeInfo.authors}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    /* <Book
                      image={background}
                      bookTitle={book.volumeInfo.title}
                      bookAuthor={book.volumeInfo.authors}
                      key={book.id}
                      updateShelf={updateShelf}
                      id={book.id}
                      shelf={book.shelf}
                    /> */
                  );
                })}
            </View>
          </View>
        </View>
      ))}
      <View style={styles.openSearch}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search", {
              currentBooks: books,
            })
          }
        >
          <Ionicons name="add-circle" size={34} color="#1e212d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BookShelf;

const styles = StyleSheet.create({
  bookshelf: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bookshelfBooks: {
    alignItems: "center",
  },
  listBooksContent: {
    backgroundColor: "#faf3e0",
    paddingLeft: 80,
    flex: 1,
  },
  bookshelfTitle: {
    fontSize: 24,
    borderBottomColor: "#eabf9f",
    borderBottomWidth: 2,
  },
  booksGrid: {
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  bookTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  bookAuthors: {
    fontSize: 16,
    color: "#999",
  },
  book: {
    width: 140,
  },
  bookTop: {
    position: "relative",
    height: 200,
    display: "flex",
    alignItems: "flex-end",
  },
  openSearch: {
    position: "relative",
    marginTop: 50,
    marginLeft: 20,
  },
});
