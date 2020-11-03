export interface IAuthor {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IBook {
  title: string;
  isbn: string;
  authors: string;
  entity: string;
  description?: string;
}

export interface IMagazine extends IBook {
  publishedAt: string;
}
