export type RootStackParamList = {
    BookShelf: undefined;
    Book: object;
    Search: object
};

export type BookParams = {
    book?: { [key: string]: any };
    volumeInfo: { [key: string]: any };
    id: string;
    shelf: "none" | "currentlyReading" | "wantToRead" | "read"
};

export type BookRouteParams = {
    volumeInfo: { [key: string]: any };
    
};