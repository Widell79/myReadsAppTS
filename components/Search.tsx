import React from "react";
import { RouteProp } from "@react-navigation/native";
import { BookRouteParams } from "./Params";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectSearch, add_search } from "../features/search/searchSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Params";

import * as BooksAPI from "../utils/api";

interface bookProp {
  route: RouteProp<BookRouteParams, "volumeInfo">;
  navigation: StackNavigationProp<RootStackParamList, "Search">;
}

const Search: React.FC<bookProp> = ({ route, navigation }) => {
  const { currentBooks } = route.params;

  const dispatch = useAppDispatch();

  const searchBook = (query: string) => {
    BooksAPI.search(query).then((book) => {
      if (query.length !== 0) {
        dispatch(add_search(book));
      }
    });
  };

  const updateSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    searchBook(value);
  };

  const searchedBooks = useAppSelector(selectSearch);
  console.log("searched", searchedBooks);

  function mapBooksToList(books: object) {
    return {
      values: Object.values(books),
    };
  }

  const bookList = mapBooksToList(searchedBooks);
  const bookListInfo = bookList.values.map((data) => {
    return data;
  });

  const renderBooks = ({ item }) => {
    const bookOnShelf = currentBooks.find(({ id }) => id === item.id);
    const shelf = bookOnShelf ? bookOnShelf.shelf : "none";
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book", {
                    bookTitle: item.volumeInfo.title,
                    bookAuthor: item.volumeInfo.authors,
                    image: background,
                    shelf: shelf,
                    language: item.volumeInfo.language,
                    pages: item.volumeInfo.pageCount,
                    publishedDate: item.volumeInfo.publishedDate,
                    id: item.id,
                  });
                }}
              >
                <Image
                  source={{ uri: background }}
                  style={{
                    width: 128,
                    height: 188,
                    backgroundColor: "#eee",
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
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
            data={bookListInfo}
            numColumns={4}
            renderItem={({ item }) => renderBooks({ item })}
            keyExtractor={(item: any) => item.id.toString()}
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
