import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button } from "../../../sharedComponents";

import style from "./GameOver.module.css";
import { QuizRecap } from "./QuizRecap";
import {
  setLoginModalStatus,
  getUserId,
  saveUserScore,
  getUsersCallStatus,
} from "../../user/userSlice";
import { getScoreValue } from "../quizSlice";

type GameOverViewProp = {
  onStartGame: () => void;
};

export function GameOverView(props: GameOverViewProp) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = Boolean(useAppSelector(getUserId));
  const saveScoreCallStatus = useAppSelector(getUsersCallStatus);
  const score = useAppSelector(getScoreValue);

  /**
   * flag to trigger user score save process
   */
  const [shouldSaveScore, setShouldSave] = useState(false);

  /**
   * flag to trigger redirect to raking page
   */
  const [shouldRedirect, setShouldRedirect] = useState(false);

  /**
   * Handles main CTA click
   *
   * based on user login status shows Login modal or saves user score
   */
  const handleSaveScore = () => {
    if (isUserLoggedIn) {
      setShouldRedirect(true);
      dispatch(saveUserScore(score));
    } else {
      dispatch(setLoginModalStatus("visible"));
      setShouldSave(true);
    }
  };

  /**
   * Triggers redirect to ranking page as soon as user score is saved
   */
  useEffect(() => {
    if (shouldRedirect && saveScoreCallStatus === "success") {
      navigate("/ranking");
    }
  }, [shouldRedirect, saveScoreCallStatus, navigate]);

  /**
   * Triggers score saving as soon as the login is completed
   */
  useEffect(() => {
    if (isUserLoggedIn && shouldSaveScore) {
      dispatch(saveUserScore(score));
      setShouldSave(false);
      setShouldRedirect(true);
    }
  }, [isUserLoggedIn, shouldSaveScore, dispatch, score]);

  return (
    <section className={style.wrapper}>
      <h2>GAME OVER</h2>
      <QuizRecap />
      <nav>
        <ul>
          <li>
            <Button label="Save your score" onClick={handleSaveScore} />
          </li>
          <li>
            <Link to="/game" onClick={props.onStartGame}>
              Start a new game
            </Link>
          </li>
          <li>
            <Link to="/">Go back to index</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
