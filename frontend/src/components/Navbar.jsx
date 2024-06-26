/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../services/UserContext";

export default function Navbar() {
  // const URL = import.meta.env.VITE_BACKEND_URL;
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
    <div className="globalNavbar">
      <nav className="placementLien">
        <Link to="/">Home</Link>
        {/* pour les pages Register et Login accessiblent si pas connecté et une fois connecté, disparaissent */}
        {!isConnected ? <Link to="/register">Register</Link> : null}
        {!isConnected ? <Link to="/login">Login</Link> : null}
        {/* pour les pages Books et CreateBook se débloquent et apparaissent à la connexion */}
        {isConnected ? <Link to="/books">Books</Link> : null}
        {isConnected ? <Link to="/create">Add one</Link> : null}
        {/* le bouton permettant de se logout n'est dispo qu'une fois connecté */}
        {isConnected ? (
          <Link to="/" onClick={handleLogout}>
            logout
          </Link>
        ) : null}
      </nav>
      <img className="logo" src="../src/assets/IMG_6129-1.png" alt="logo" />
    </div>
  );
}
