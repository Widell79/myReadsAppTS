export type RootStackParamList = {
    BookShelf: undefined;
    Book: object;
    Search: object
};

export type BookParams = {
    volumeInfo: { [key: string]: any };
    id: string;
    shelf: string
};

export type BookRouteParams = {
    volumeInfo: { [key: string]: any };
    
};