/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../services/UserContext";

export default function Login() {
  const { setReader } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3310/api/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setReader({
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
        });
        navigate("/", { replace: true });
      })
      .catch((error) => console.error(error));
  };

  console.info(email, password);

  return (
    <>
      <h1> Log you here </h1>
      <form onSubmit={submitForm}>
        <label>
          Email
          <input
            type="email"
            required="required"
            onChange={handleChangeEmail}
            id="email"
            placeholder="Enter your email address"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            id="password"
            required="required"
            onChange={handleChangePassword}
            placeholder="Enter your password"
          />
        </label>
        <div className="buttonLogin_container">
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </>
  );
}
