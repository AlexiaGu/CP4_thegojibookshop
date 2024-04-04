import Home from "../components/HomeComponent";

import "../styles/home.css";

export default function HomePage() {
  return (
    <section className="globalHome">
      <div className="titresHome">
        <h1> The Goji Bookshelf </h1>
        <h2>
          {" "}
          Welcome here, where you can keep your readings and see if someone read
          something intrerresting ...
        </h2>
      </div>
      <Home />
    </section>
  );
}
