import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./Ranking.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RankLoader } from "../../features/rank/RankLoader";
import {
  loadRank,
  getTopTenRank,
  getLoadRankStatus,
  resetState,
} from "../../features/rank/rankSlice";
import { RankRow } from "../../features/rank/RankRow";
import { ErrorBanner } from "../../sharedComponents";

export function Ranking() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const topTenRank = useAppSelector(getTopTenRank);
  const loadRankStatus = useAppSelector(getLoadRankStatus);

  /**
   * Boostrap page resetting state and loading ranking list
   */
  useEffect(() => {
    dispatch(resetState());
    dispatch(loadRank());
  }, [dispatch]);

  /**
   * Hanldes error banner when load rank fail
   *
   * redirect to home page
   */
  useEffect(() => {
    if (loadRankStatus === "failed") {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [dispatch, loadRankStatus, navigate]);

  return (
    <main className={style.main}>
      {loadRankStatus === "failed" && (
        <ErrorBanner message="Oops, we had some issues. Try again later!" />
      )}
      <h1>Top Ten Ranking</h1>
      <section>
        {loadRankStatus === "loading" ? (
          <RankLoader />
        ) : (
          topTenRank.map((user, idx) => (
            <RankRow
              key={user.uid}
              index={idx + 1}
              name={user.nickname}
              score={user.maxScore}
              date={user.maxScoreDate}
            />
          ))
        )}
      </section>
      {/* <Link className={style.link} to="/landing">go back to main index</Link> */}
      <Link className={style.link} to="/game">
        Start a new game
      </Link>
      <Link to="/">Go back to index</Link>
    </main>
  );
}
