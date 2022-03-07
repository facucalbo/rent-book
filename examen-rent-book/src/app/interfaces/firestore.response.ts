export interface BookStatus {
    exists:   boolean,
    updated:  boolean,
    bookInfo: BookInfo,
}

export interface BookInfo {
    id:           string,
    isbn:         string,
    cantPrestado: number
}