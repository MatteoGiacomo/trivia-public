import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getUsersList, UserData } from "../sharedAPIs";

type AsyncCallStatus = "idle" | "loading" | "failed";

export interface RankState {
  loadRankStatus: AsyncCallStatus;
  usersMap: Record<string, UserData>;
}

const initialState: RankState = {
  loadRankStatus: "idle",
  usersMap: {},
};

export const loadRank = createAsyncThunk(
  "rank/loadRank",
  async (): Promise<Record<string, UserData>> => await getUsersList()
);

export const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loadRankStatus = "idle";
      state.usersMap = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRank.pending, (state) => {
        state.loadRankStatus = "loading";
      })
      .addCase(loadRank.fulfilled, (state, action) => {
        state.loadRankStatus = "idle";
        state.usersMap = action.payload;
      })
      .addCase(loadRank.rejected, (state) => {
        state.loadRankStatus = "failed";
      });
  },
});

export const { resetState } = rankSlice.actions;

type UserRank = {
  uid: string;
  nickname: string;
  maxScore: number;
  maxScoreDate: string;
};

export const getLoadRankStatus = (state: RootState) =>
  state.rank.loadRankStatus;

export const getTopTenRank = (state: RootState): UserRank[] => {
  const { rank } = state;
  const usersMap = rank.usersMap;

  const userList = [];
  for (const userId in usersMap) {
    const user = usersMap[userId];

    userList.push({
      nickname: user.nickname || "Anonymous",
      maxScore: user.bestScore ? user.bestScore.score : 0,
      maxScoreDate: user.bestScore
        ? user.bestScore.date
        : new Date().toISOString(),
      uid: userId,
    });
  }

  userList.sort((userA, userB) => userB.maxScore - userA.maxScore);

  return userList.splice(0, 10);
};

// @ts-ignore
export default rankSlice.reducer as Reducer<RankState>;
