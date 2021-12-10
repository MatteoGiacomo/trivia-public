import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import questionsReducer from "../features/quiz/quizSlice";
import userReducer from "../features/user/userSlice";
import rankSlice from "../features/rank/rankSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    user: userReducer,
    rank: rankSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
