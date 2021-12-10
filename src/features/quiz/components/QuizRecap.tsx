import React from "react";
import style from "./QuizRecap.module.css";
import { useAppSelector } from "../../../app/hooks";
import { getScoreValue, getQuestionsAnswered } from "../quizSlice";

export function QuizRecap() {
  const score = useAppSelector(getScoreValue);
  const answeredCount = useAppSelector(getQuestionsAnswered);

  return (
    <p className={style.score}>
      Answered: {answeredCount}/10 | Score: {score}
    </p>
  );
}
