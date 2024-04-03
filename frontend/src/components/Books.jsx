/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function Book({ book, refreshPage }) {
  const [updatedTitle, setUpdatedTitle] = useState(book.title);
  const [updatedAuthor, setUpdatedAuthor] = useState(book.author);
  const [updatedSummary, setUpdatedSummary] = useState(book.summary);
  const [isEditing, setIsEditing] = useState(false);

  // fonction pour modifier les infos d'un livre
  const handleUpdate = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/books/${book.id}`, {
        title: updatedTitle,
        author: updatedAuthor,
        summary: updatedSummary,
      })
      .then(() => refreshPage(), setIsEditing(false))
      .catch((error) =>
        console.error("erreur lors de la mise à jour du livre:", error)
      );
  };

  // fonction pour supprimer un livre
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/books/${book.id}`)
      .then(() => refreshPage())
      .catch((error) => console.error(error));
  };

  return (
    <article>
      {isEditing ? (
        // Afficher le formulaire de modification
        <div>
          <label>
            Titre
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </label>
          <label>
            Auteur
            <input
              type="text"
              value={updatedAuthor}
              onChange={(e) => setUpdatedAuthor(e.target.value)}
            />
          </label>
          <label>
            Summary
            <textarea
              value={updatedSummary}
              onChange={(e) => setUpdatedSummary(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleUpdate}>
            Enregistrer les modifications
          </button>
        </div>
      ) : (
        // Afficher les informations du livre
        <div>
          <h3>{book.title}</h3>
          <h4>{book.author}</h4>
          <p>{book.summary}</p>
          <button type="button" onClick={handleDelete}>
            Supprimer le livre de la liste
          </button>
          <button type="button" onClick={() => setIsEditing(true)}>
            Modifier ce livre
          </button>
        </div>
      )}
    </article>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
  refreshPage: PropTypes.func.isRequired,
};
