"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormData, FormFiled } from "@/types";

const fields: FormFiled[] = [
  { name: "title", label: "Name" },
  { name: "author", label: "Author" },
  { name: "description", label: "Description" },
];

const initialForm: FormData = {
  title: "",
  author: "",
  description: "",
};

export default function AddBookPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const router = useRouter();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://book-store-github-io-omega.vercel.app/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const book = await res.json();
      alert("Добавлена книга: " + book.title);
      router.push("/books");
    } else {
      const error = await res.json();
      alert("Error: " + error.error);
    }
  };

  return (
    <div className="container">
      <div className="book-new">
        <h1>➕New Book</h1>
        <form onSubmit={handleSubmit} className="book-new">
          {fields.map(({ name, label }) => (
            <div
              className={`book-new-blog ${
                name === "description" ? "desc" : ""
              }`}
              key={name}
            >
              <label htmlFor={name}>{label}</label>
              {name === "description" ? (
                <textarea
                  className="book-new-input"
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={changeHandler}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  className="book-new-input"
                  onChange={changeHandler}
                  required
                />
              )}
            </div>
          ))}
          <div className="book-new-btn">
            <Link className="btn" href={"/books"}>
              ← Back
            </Link>
            <button className="btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
