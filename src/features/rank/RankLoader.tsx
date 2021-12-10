import React from "react";
import style from "./RankLoader.module.css";
const ROWS: undefined[] = Array.from(new Array(7));

export function RankLoader() {
  return (
    <div data-testid="ranking-loader">
      {ROWS.map((_, idx) => (
        <div key={`placeholder_${idx}`} className={style.rowPlaceholder}></div>
      ))}
    </div>
  );
}
