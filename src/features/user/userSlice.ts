import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { firebaseInstance } from "../../services";
import {
  getUserById,
  updateUserData,
  UserData as UserDataType,
} from "../sharedAPIs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

type AsyncCallStatus = "idle" | "loading" | "failed" | "success";

export interface UserState {
  value: number;
  loginStatus: AsyncCallStatus;
  usersCallStatus: AsyncCallStatus;
  userId: string;
  authToken: string;
  errorMessage: string;
  isLoginModalVisible: boolean;
}

const initialState: UserState = {
  value: 0,
  loginStatus: "idle",
  usersCallStatus: "idle",
  authToken: "",
  userId: "",
  errorMessage: "",
  isLoginModalVisible: false,
};

export type LoginUserDetails = {
  email: string;
  password: string;
  nickname: string;
  mode: "signup" | "login";
};

const ERROR_MAP: Record<string, string> = {
  "auth/wrong-password": "Oops! This is the wrong password!",
  "auth/too-many-requests": "Wait few minutes! You did too many requests",
  "auth/user-not-found": "Opps, it seems you are not registered!",
  "auth/email-already-in-use": "Hey! You are already registered",
  "auth/weak-password":
    "Oops! Password too short, should be at least 6 characters",
  default: "Oops, something went wrong!",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (userDetails: LoginUserDetails): Promise<UserCredential> => {
    const auth = getAuth(firebaseInstance);

    const action =
      userDetails.mode === "signup"
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;

    const response = await action(
      auth,
      userDetails.email,
      userDetails.password
    );

    if (userDetails.mode === "signup") {
      // @ts-expect-error response.user.accessToken is not expose in types
      await updateUserData(response.user.uid, response.user.accessToken, {
        nickname: userDetails.nickname,
        scores: [],
        bestScore: {
          score: 0,
          date: new Date().toISOString(),
        },
      });
    }

    return response;
  }
);

export const saveUserScore = createAsyncThunk(
  "user/saveUserScore",
  async (score: number, { getState }) => {
    const { user } = getState() as RootState;

    if (user.userId && user.authToken) {
      const userData = await getUserById(user.userId, user.authToken);

      if (userData === null) {
        throw new Error("User not found");
      }

      /**
       * @NOTE since a BE is not available, I move this BE logic here in order to manage easly
       * top ten list in the raking page.
       *
       */

      // type guards on bestScore
      const bestScoreValue =
        (userData.bestScore && userData.bestScore.score) || 0;

      let payload: UserDataType = {
        ...userData,
        scores: [...(userData.scores || []), score],
      };

      // update bestScore field
      if (bestScoreValue <= score) {
        payload = {
          ...payload,
          bestScore: {
            score,
            date: new Date().toISOString(),
          },
        };
      }
      await updateUserData(user.userId, user.authToken, payload);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginModalStatus: (
      state,
      action: PayloadAction<"hidden" | "visible">
    ) => {
      state.loginStatus = "idle";
      state.isLoginModalVisible = action.payload === "visible";
    },
    resetError: (state) => {
      state.errorMessage = "";
      state.loginStatus = "idle";
    },
    resetUserCallStatus: (state) => {
      state.usersCallStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "success";
        state.userId = action.payload.user.uid;
        // @ts-expect-error accessToken
        state.authToken = action.payload.user.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.errorMessage = ERROR_MAP[action.error.code || "default"];
      })
      .addCase(saveUserScore.pending, (state) => {
        state.usersCallStatus = "loading";
      })
      .addCase(saveUserScore.fulfilled, (state) => {
        state.usersCallStatus = "success";
      })
      .addCase(saveUserScore.rejected, (state) => {
        state.usersCallStatus = "failed";
      });
  },
});

export const { setLoginModalStatus, resetError, resetUserCallStatus } =
  userSlice.actions;

export const getLoginStatus = (state: RootState) => state.user.loginStatus;
export const getUsersCallStatus = (state: RootState) =>
  state.user.usersCallStatus;
export const getUserId = (state: RootState) => state.user.userId;
export const isLoginModalVisible = (state: RootState) =>
  state.user.isLoginModalVisible;

export const getErrorMessage = (state: RootState) => state.user.errorMessage;

// @ts-ignore
export default userSlice.reducer as Reducer<UserState>;
