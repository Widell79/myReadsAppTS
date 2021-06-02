import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
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
  const [bookData, setBookData] = useState([]);
  const [filteredBookList, setFilteredBookList] = useState([]);
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

  const renderBooks = ({ item }) => {
    const background = `${
      item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : "./bg.png"
    }`;

    return (
      <View>
        <View style={styles.booksGrid}>
          <View style={styles.book}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book", {
                    bookTitle: item.volumeInfo.title,
                    bookAuthor: item.volumeInfo.authors,
                    image: background,
                    shelf: item.shelf,
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
      {bookShelfs.map((shelf) => (
        <View key={shelf} style={styles.bookshelf}>
          <Text style={styles.bookshelfTitle}>{shelf}</Text>
          <View style={styles.bookshelfBooks}>
            <View style={styles.booksGrid}>
              {bookListInfo
                .filter(function (book) {
                  return book.shelf === convertShelf(shelf);
                })
                .map((book) => {})}
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
      <FlatList
        data={bookListInfo}
        numColumns={2}
        renderItem={({ item }) => renderBooks({ item })}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </View>
  );
};

export default BookShelf;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#faf3e0",
    paddingLeft: 40,
    flex: 1,
  },
  bookshelf: {
    paddingTop: 20,
    paddingRight: 20,
  },
  bookshelfBooks: {
    alignItems: "center",
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
    marginTop: 15,
    marginLeft: 5,
  },
});
