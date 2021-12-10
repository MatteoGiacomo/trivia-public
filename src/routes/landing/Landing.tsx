import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export function Landing() {
  return (
    <main className={style.main}>
      <section>
        <h1>Welcome to Trivia</h1>
        <nav>
          <ul>
            <li>
              <Link className={style.link} to="/game">Start a new game</Link>
            </li>
            <li>
              <Link to="/ranking">See top ten ranking</Link>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
