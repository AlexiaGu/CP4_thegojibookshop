/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../services/UserContext";

import "../styles/home.css";

export default function Navbar() {
  const { reader, setReader } = useContext(UserContext);
  // const URL = import.meta.env.VITE_BACKEND_URL;

  // pour sécuriser l'affichage et donc l'accès a certaines selon si connecté ou non
  const isConnected = reader.id && reader.id !== "null";

  console.info("isConnected", isConnected);

  // pour se déconnecter
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
    <nav className="componentHome">
      <div className="BookAndCreate">
        {/* pour les pages Books et CreateBook se débloquent et apparaissent à la connexion */}
        <div className="linkBook">
          <Link to="/books">Books</Link>
        </div>
        <div className="linkCreate">
          {isConnected ? (
            <Link className="test" to="/create">
              Add one
            </Link>
          ) : null}
        </div>
      </div>
      <div className="linkLogout">
        {/* le bouton permettant de se logout n'est dispo qu'une fois connecté */}
        {isConnected ? (
          <Link to="/" onClick={handleLogout}>
            logout
          </Link>
        ) : null}
      </div>
      <img
        className="backgroundHome"
        src="../src/assets/Fondpagehome.png"
        alt=""
      />
    </nav>
  );
}
