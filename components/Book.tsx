import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { BookRouteParams, RootStackParamList } from "./Params";
import { useAppDispatch } from "../hooks";
import { updateShelf } from "../features/books/booksSlice";

interface bookProp {
  navigation: StackNavigationProp<RootStackParamList, "Book">;
  route: RouteProp<BookRouteParams, "volumeInfo">;
}

const Book: React.FC<bookProp> = ({ route, navigation }) => {
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Currently Reading", value: "currentlyReading" },
    { label: "Want to Read", value: "wantToRead" },
    { label: "Read", value: "read" },
    { label: "None", value: "none" },
  ]);

  const dispatch = useAppDispatch();

  const updateBookShelf = (id: { id: string }, shelf: string) => {
    const bookId = id.id;
    dispatch(updateShelf(bookId, shelf));
    navigation.push("BookShelf");
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
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(value: string) => {
                updateBookShelf({ id }, value);
              }}
              style={{
                marginTop: 5,
              }}
            />
            {/* <Text style={styles.bookShelfChanger}>
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
            </Text> */}
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
  },
});
