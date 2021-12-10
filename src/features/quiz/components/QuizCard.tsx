import React, { ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { Checkbox, CheckboxStatus } from "../../../sharedComponents";
import { QuizCardLoader } from "./QuizCardLoader";

import { getCurrentQuestion, setAnswer, getQuestionsStatus } from "../quizSlice";
import style from "./QuizCard.module.css";

export function QuizCard() {
  const dispatch = useAppDispatch();

  const quiz = useAppSelector(getCurrentQuestion);
  const quizLoadStatus = useAppSelector(getQuestionsStatus);

  const isQuizLoading = quizLoadStatus === "loading";
  const hasQuizLoadError = quizLoadStatus === "failed";

  /**
   * handles checkbox change event updating the store
   * 
   * @param e 
   */
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setAnswer(value));
  };

  /**
   * checks if argument correspond to user answer
   * 
   * @param answerCode 
   * @returns 
   */
  const isChecked = (answerCode: string): boolean =>
    quiz.userAnswer ? quiz.userAnswer === answerCode : false;


  /**
   * defines checkbox status checking the correctness of the user's response
   * 
   * @param answerCode 
   * @returns 
   */
  const getStatus = (answerCode: string): CheckboxStatus | undefined => {
    if (isChecked(answerCode)) {
      return answerCode === quiz.correctAnswer
        ? CheckboxStatus.success
        : CheckboxStatus.failure;
    }
  };

  return (
    <>
      {isQuizLoading || hasQuizLoadError ? (
        <QuizCardLoader />
      ) : (
        <fieldset
          className={style.container}
          disabled={Boolean(quiz.userAnswer)}
          data-testid="quiz-card-fieldset"
        >
          <span className={style.label}>{quiz.category?.toUpperCase()}</span>
          <span className={style.label}>{quiz.difficulty?.toUpperCase()}</span>

          <h2>{quiz.question}</h2>

          {quiz.answers.map((answer) => (
            <Checkbox
              className={style.answer}
              key={answer.code}
              label={answer.label}
              checked={isChecked(answer.code)}
              value={answer.code}
              onChange={onCheckboxChange}
              status={getStatus(answer.code)}
            />
          ))}
        </fieldset>
      )}
    </>
  );
}
