//import { convertShelf } from "./components/BookShelf";

const convertShelf = (shelf: string) => {
  switch (shelf) {
    case "Currently Reading":
      return "currentlyReading";
    case "Want to Read":
      return "wantToRead";
    case "read":
      return "Read";
  }
};

describe("convertShelf", () => {
  it("should return the string in a new format", () => {
    expect(convertShelf("Currently Reading")).toBe("currentlyReading");
    expect(convertShelf("Want to Read")).toBe("wantToRead");
  });
});
