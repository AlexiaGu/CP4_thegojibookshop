import { useLoaderData, useNavigate } from "react-router-dom";
import Book from "../components/Books";
import "../styles/books.css";

export default function Books() {
  const books = useLoaderData();

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate("/books", { replace: true });
  };

  return (
    <>
      <h1 className="pageTitle">Liste des livres </h1>
      {books.map((book) => (
        <Book key={book.id} book={book} refreshPage={refreshPage} />
      ))}
    </>
  );
}
