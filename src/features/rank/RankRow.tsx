import React from "react";
import style from "./RankRow.module.css";
import { formatDateTime } from "../../services";

type RankRowProp = {
  index: number;
  name: string;
  score: number;
  date: string;
};

export function RankRow(props: RankRowProp) {
  return (
    <div className={style.row} data-testid="rank-row">
      <span className={style.rowElement}>
        {`${props.index}`.padStart(2, "0")}
      </span>
      <span className={`${style.userName} ${style.rowElement}`}>
        {props.name}
      </span>

      <span className={style.rowElement}>{props.score}</span>
      <span className={style.rowElement}>{formatDateTime(props.date)}</span>
    </div>
  );
}
