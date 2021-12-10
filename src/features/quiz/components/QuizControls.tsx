import React from "react";
import style from "./QuizControls.module.css";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../sharedComponents";
import {
  incrementQuestionId,
  decreseQuestionId,
  setGameOver,
  getCurrentQuestionId,
  getIsLastQuestion,
  getCurrentQuestion,
} from "../quizSlice";

export function QuizControls() {
  const dispatch = useAppDispatch();

  const questionId = useAppSelector(getCurrentQuestionId);
  const question = useAppSelector(getCurrentQuestion);
  const isLastQuestion = useAppSelector(getIsLastQuestion);

  const hasAnswer = Boolean(question && question.userAnswer);
  const primaryCtaAction = isLastQuestion ? setGameOver : incrementQuestionId;
  const primaryCtaLabel = isLastQuestion ? "Finish" : "Next question";

  return (
    <div className={style.controls}>
      <Button
        className={style.control}
        status="primary"
        onClick={() => dispatch(primaryCtaAction())}
        label={primaryCtaLabel}
        disabled={!hasAnswer}
      />
      <Button
        className={style.control}
        status="secondary"
        disabled={questionId < 1}
        onClick={() => dispatch(decreseQuestionId())}
        label="Prev question"
      />
    </div>
  );
}
