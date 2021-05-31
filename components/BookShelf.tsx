import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Params";

import { Ionicons } from "@expo/vector-icons";

//import { useSelector, useDispatch } from "react-redux";
import { selectBooks } from "../features/books/booksSlice";

import { handleInitialData } from "../features/shared/shared";
import { useAppSelector, useAppDispatch } from "../hooks";

export const convertShelf = (shelf: string) => {
  switch (shelf) {
    case "Currently Reading":
      return "currentlyReading";
    case "Want to Read":
      return "wantToRead";
    case "Read":
      return "read";
  }
};

interface bookShelfProp {
  navigation: StackNavigationProp<RootStackParamList, "BookShelf">;
}

const BookShelf: React.FC<bookShelfProp> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const bookShelfs = ["Currently Reading", "Want to Read", "Read"];

  const books = useAppSelector(selectBooks);

  function mapBooksToList(books: object) {
    return {
      values: Object.values(books),
    };
  }

  const bookList = mapBooksToList(books);
  const bookListInfo = bookList.values.map((data) => {
    return data;
  });

  return (
    <View style={styles.listBooksContent}>
      {bookShelfs.map((shelf) => (
        <View key={shelf} style={styles.bookshelf}>
          <Text style={styles.bookshelfTitle}>{shelf}</Text>
          <View style={styles.bookshelfBooks}>
            <View style={styles.booksGrid}>
              {bookListInfo
                .filter(function (book) {
                  return book.shelf === convertShelf(shelf);
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
                            id: book.id,
                          });
                        }}
                      >
                        <View style={styles.book}>
                          <View style={styles.bookTop}>
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
                          <Text style={styles.bookTitle}>
                            {book.volumeInfo.title}
                          </Text>
                          <Text style={styles.bookAuthors}>
                            {book.volumeInfo.authors}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
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
              currentBooks: bookListInfo,
            })
          }
        >
          <Ionicons name="add-circle" size={48} color="#5aa897" />
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
    marginTop: 200,
    marginLeft: 20,
  },
});
