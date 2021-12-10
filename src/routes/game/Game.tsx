import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./Game.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { GenericLoader, ErrorBanner } from "../../sharedComponents";

import { QuizCard, QuizControls, QuizRecap } from "../../features/quiz";
import { GameOverView } from "../../features/quiz/components/GameOver";
import {
  loadQuestions,
  resetQuizState,
  getIsQuizOver,
  getQuestionsStatus,
} from "../../features/quiz/quizSlice";
import {
  getUsersCallStatus,
  resetUserCallStatus,
} from "../../features/user/userSlice";

export function Game() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userCallStatus = useAppSelector(getUsersCallStatus);
  const quizLoadStatus = useAppSelector(getQuestionsStatus);

  const isErrorBannerVisible =
    quizLoadStatus === "failed" || userCallStatus === "failed";

  const isGameOver = useAppSelector(getIsQuizOver);
  const isLoaderVisible = userCallStatus === "loading";

  const startGame = useCallback(() => {
    dispatch(resetQuizState());
    dispatch(loadQuestions());
  }, [dispatch]);

  /**
   * Bootstrap game resetting state and loading quiz
   */
  useEffect(() => {
    startGame();
  }, [startGame]);

  /**
   * Handle error when save score fail
   */
  useEffect(() => {
    if (userCallStatus === "failed") {
      setTimeout(() => {
        dispatch(resetUserCallStatus());
      }, 5000);
    }
  }, [dispatch, userCallStatus]);

  /**
   * Handle error when load questions fail
   *
   * redirect to home page
   */
  useEffect(() => {
    if (quizLoadStatus === "failed") {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [quizLoadStatus, navigate]);

  return (
    <main className={style.wrapper}>
      {isErrorBannerVisible && (
        <ErrorBanner message="Oops, we had some issues. Try again later!" />
      )}
      {isLoaderVisible && <GenericLoader message="saving your score" />}
      <section>
        <h1>QUIZ</h1>
        {isGameOver ? (
          <GameOverView onStartGame={startGame} />
        ) : (
          <>
            <QuizRecap />
            <QuizCard />
            <QuizControls />
            <nav className={style.nav}>
              <Link to="/">Go back to index</Link>
            </nav>
          </>
        )}
      </section>
    </main>
  );
}
