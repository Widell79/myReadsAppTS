import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { selectSearch, add_search } from "../features/search/searchSlice";

import * as BooksAPI from "../utils/api";

const Search = ({ route }) => {
  const { currentBooks } = route.params;

  const dispatch = useDispatch();

  const searchBook = (query: string) => {
    BooksAPI.search(query).then((book) => {
      if (query.length !== 0) {
        dispatch(add_search(book));
      }
    });
  };

  const updateSearch = (e) => {
    const value = e.target.value;

    searchBook(value);
  };

  const searchedBooks = useSelector(selectSearch);
  console.log("searched", searchedBooks);

  const renderBooks = ({ item }) => {
    console.log("rendered book", item);
    const background = `${
      item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : "./bg.png"
    }`;

    return (
      <View style={styles.searchBooksResults}>
        <View style={styles.booksGrid}>
          <View style={styles.book}>
            <View>
              <Image
                source={{ uri: background }}
                style={{
                  width: 128,
                  height: 188,
                  backgroundColor: "#eee",
                  marginTop: 10,
                }}
              />
            </View>
            <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookshelfBooks}>
        <View>
          <View style={styles.searchBooksBar}>
            <View style={styles.searchBooksInputWrapper}>
              <TextInput
                style={styles.searchInput}
                onChange={updateSearch}
                placeholder="Search by title"
              />
            </View>
          </View>

          <FlatList
            data={searchedBooks}
            numColumns={4}
            renderItem={({ item }) => renderBooks({ item })}
            keyExtractor={(item: unknown) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#faf3e0",
    flex: 1,
  },
  bookshelfBooks: {
    alignItems: "center",
  },
  book: {
    width: 140,
  },
  searchBooksBar: {
    position: "relative",
    width: "100%",
    marginTop: 20,
    zIndex: 5,
  },
  searchBooksInputWrapper: {
    flex: 1,
  },
  searchInput: {
    width: "100%",
    padding: 15,
    fontSize: 18,
    border: "none",
    outline: "none",
  },
  searchBooksResults: {
    padding: 50,
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
});
