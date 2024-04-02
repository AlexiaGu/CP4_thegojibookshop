/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../services/UserContext";

export default function Navbar() {
  const { reader, setReader } = useContext(UserContext);

  const isConnected = reader.id && reader.id !== "null";

  console.info("isConnected", isConnected);

  const handleLogout = () => {
    axios
      .delete("http://localhost:3310/api/logout", {
        withCredentials: true,
      })
      .then(() =>
        setReader({
          id: null,
          email: null,
          nickname: null,
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/books">Books</Link>
      <Link to="/create">Créer un livre</Link>
      <Link to="/register">Créer un compte</Link>
      <Link to="/login">Se connecter</Link>
      <Link to="/" onClick={handleLogout}>
        log Out
      </Link>
    </nav>
  );
}
