/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../services/UserContext";

export default function Navbar() {
  const { reader, setReader } = useContext(UserContext);

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
    <nav>
      <Link to="/">Accueil</Link>
      {/* pour les pages Books et CreateBook se débloquent et apparaissent à la connexion */}
      {isConnected ? <Link to="/books">Books</Link> : null}
      {isConnected ? <Link to="/create">Créer un livre</Link> : null}
      {/* pour les pages Register et Login accessiblent si pas connecté et une fois connecté, disparaissent */}
      {!isConnected ? <Link to="/register">Créer un compte</Link> : null}
      {!isConnected ? <Link to="/login">Se connecter</Link> : null}
      {/* le bouton permettant de se logout n'est dispo qu'une fois connecté */}
      {isConnected ? (
        <Link to="/" onClick={handleLogout}>
          log Out
        </Link>
      ) : null}
    </nav>
  );
}
