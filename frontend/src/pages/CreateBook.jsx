/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import axios from "axios";

export default function CreateBook() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    author: "",
    // parutionYear: ""
    // opinion: "",
  });

  const handleChangeForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submitBook = (event) => {
    event.preventDefault();
    console.info("Contenu du formulaire :", form);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/books/`, form)
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Créer une fiche de livre </h1>
      <form onSubmit={submitBook}>
        <label htmlFor="title">Titre du livre :</label>
        <input
          type="text"
          name="title"
          onChange={handleChangeForm}
          id="title"
        />
        <label htmlFor="author">Auteur :</label>
        <input
          type="text"
          name="author"
          onChange={handleChangeForm}
          id="author"
        />
        <label htmlFor="summary">Résumé du livre :</label>
        <textarea name="summary" onChange={handleChangeForm} id="summary" />
        {/* <label htmlFor="date">Année de parution :</label>
        <input
          type="number"
          name="parutionYear"
          onChange={handleChangeForm}
          id="number"
        /> */}
        {/* <label htmlFor="note"> Notes sur le livre :</label>
        <input type="text" name="note" onChange={handleChangeForm} id="note" /> */}
        <input type="submit" />
      </form>
    </>
  );
}
