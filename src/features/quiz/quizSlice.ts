import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuestions } from "./quizAPI";
import type { Question } from "./quizAPI";
import { shuffleList, codify, decodeHTMLEntities } from "../../services";

type NormalizedAnswer = {
  code: string;
  label: string;
};

export type NormalizedQuestion = {
  category: string;
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  answers: NormalizedAnswer[];
  correctAnswer: string;
  userAnswer: string | undefined;
};

export interface QuizState {
  questions: NormalizedQuestion[];
  status: "idle" | "loading" | "failed" | "success";
  currentQuestionId: number;
  score: number;
  answered: number;
  isQuizOver: boolean;
}

const initialState: QuizState = {
  questions: [],
  status: "loading",
  currentQuestionId: 0,
  score: 0,
  answered: 0,
  isQuizOver: false,
};

const mapScorePoints: Record<NormalizedQuestion["difficulty"], number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const normalizeAnswers = (list: string[]): NormalizedAnswer[] => {
  return shuffleList(list)
    .map((text: string): string => decodeHTMLEntities(text))
    .map(
      (text: string): NormalizedAnswer => ({
        label: text,
        code: codify(text),
      })
    );
};

/**
 * fetch questions and map response to normalized it to
 * internal state.
 *
 * - decode HTML entities present in questions and answers
 * - create a list with all available response, correct and incorrect, and shuffle them
 * - add the field "userAnswer" to keep track of the response
 */
export const loadQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await fetchQuestions();
    return response.results.map((question: Question): NormalizedQuestion => {
      return {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: decodeHTMLEntities(question.question),
        correctAnswer: codify(question.correct_answer),
        userAnswer: undefined,
        answers: normalizeAnswers([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      };
    });
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<string>) => {
      const newQuestions = [...state.questions];

      newQuestions[state.currentQuestionId] = {
        ...newQuestions[state.currentQuestionId],
        userAnswer: action.payload,
      };

      const currentQuestion = newQuestions[state.currentQuestionId];

      // update counter about answered questions
      state.answered += 1;

      // update score points if response is correct
      if (currentQuestion.correctAnswer === action.payload) {
        state.score += mapScorePoints[currentQuestion.difficulty];
      }

      state.questions = newQuestions;
    },
    resetQuizState: (state) => {
      state.score = 0;
      state.isQuizOver = false;
      state.currentQuestionId = 0;
      state.answered = 0;
      state.questions = [];
      state.status = "idle";
    },
    setGameOver: (state) => {
      state.isQuizOver = true;
    },
    incrementQuestionId: (state) => {
      state.currentQuestionId += 1;
    },
    decreseQuestionId: (state) => {
      state.currentQuestionId -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.questions = action.payload;
      })
      .addCase(loadQuestions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setAnswer,
  resetQuizState,
  incrementQuestionId,
  decreseQuestionId,
  setGameOver,
} = questionsSlice.actions;

/**
 * Selectors
 */
export const getQuestionsStatus = (state: RootState) => state.questions.status;
export const getScoreValue = (state: RootState) => state.questions.score;
export const getQuestionsAnswered = (state: RootState) =>
  state.questions.answered;
export const getIsQuizOver = (state: RootState) => state.questions.isQuizOver;
export const getCurrentQuestion = ({ questions }: RootState) =>
  questions.questions[questions.currentQuestionId];

export const getIsLastQuestion = ({ questions }: RootState) =>
  questions.questions.length === questions.currentQuestionId + 1;

export const getCurrentQuestionId = (state: RootState) =>
  state.questions.currentQuestionId;

// @ts-ignore
export default questionsSlice.reducer as Reducer<QuizState>;
