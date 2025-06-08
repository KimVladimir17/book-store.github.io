export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

type FieldName = "title" | "author" | "description";

export type FormFiled = {
  name: FieldName;
  label: string;
};

export type FormData = {
  [key in FieldName]: string;
};
