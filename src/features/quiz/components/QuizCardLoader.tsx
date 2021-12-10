import React from "react";
import style from "./QuizCardLoader.module.css"

export function QuizCardLoader () {
  return (
    <div className={style.container} data-testid="quiz-card-loader">
      <div className={style.placeholder}></div>
      <div className={style.placeholder}></div>
      <div className={style.placeholder}></div>
      <div className={style.placeholder}></div>
      <div className={style.placeholder}></div>
    </div>
  )
}