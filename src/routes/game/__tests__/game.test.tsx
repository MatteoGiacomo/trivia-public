import React from "react";
import { Game } from "../Game";
import { render, screen } from "../../../test-utils";
import { quizMock } from "../../../mocks/data/quizAPIMock";
import userEvent from "@testing-library/user-event";

describe("Game", () => {
  const firstQuiz = quizMock.results[0];

  describe("QuizCard", () => {
    test("it renders QuizCardLoader while load questions", async () => {
      render(<Game />);

      const QuizCardLoader = screen.queryByTestId("quiz-card-loader");
      expect(QuizCardLoader).toBeInTheDocument();

      await screen.findByText(firstQuiz.category, {
        exact: false,
      });

      expect(QuizCardLoader).not.toBeInTheDocument();
    });

    test("it renders question, category and level", async () => {
      render(<Game />);

      const category = await screen.findByText(firstQuiz.category, {
        exact: false,
      });
      expect(category).toBeInTheDocument();

      const question = await screen.findByText(firstQuiz.question);
      expect(question).toBeInTheDocument();

      const difficultyLevel = await screen.findByText(firstQuiz.difficulty, {
        exact: false,
      });
      expect(difficultyLevel).toBeInTheDocument();
    });

    test("it renders answers", async () => {
      render(<Game />);

      const answersLength = [
        ...firstQuiz.incorrect_answers,
        firstQuiz.correct_answer,
      ].length;

      const answers = await screen.findAllByRole("checkbox");

      expect(answers.length).toBe(answersLength);
    });

    test("after users click on answer all checkboxes will be disabled", async () => {
      render(<Game />);

      const answers = await screen.findAllByRole("checkbox");
      userEvent.click(answers[0]);

      const QuizCardFieldset = await screen.findByTestId("quiz-card-fieldset");

      expect(QuizCardFieldset).toHaveAttribute("disabled");
    });
  });

  describe("QuizControls", () => {
    test("next question button is disabled before user selection, then it will be enabled", async () => {
      render(<Game />);

      const mainCta = await screen.findByRole("button", {
        name: "Next question",
      });
      expect(mainCta).toHaveAttribute("disabled");

      const answers = await screen.findAllByRole("checkbox");
      userEvent.click(answers[0]);

      expect(mainCta).not.toHaveAttribute("disabled");
    });

    test("prev question button is disabled within the first question", async () => {
      render(<Game />);

      const mainCta = await screen.findByRole("button", {
        name: "Prev question",
      });
      expect(mainCta).toHaveAttribute("disabled");

      const answers = await screen.findAllByRole("checkbox");
      userEvent.click(answers[0]);

      expect(mainCta).toHaveAttribute("disabled");
    });
  });

  describe("QuizRecap", () => {
    test("it renders answered questions and score counters", async () => {
      render(<Game />);

      const scoreAndAnsweredCounters = await screen.findByText(
        "Answered: 0/10 | Score: 0"
      );

      expect(scoreAndAnsweredCounters).toBeInTheDocument();
    });

    test("it increments answered questions counter after user selection", async () => {
      render(<Game />);

      const answers = await screen.findAllByRole("checkbox");
      userEvent.click(answers[0]);

      const scoreAndAnsweredCounters = await screen.findByText(
        "Answered: 1/10 | Score: 0"
      );

      expect(scoreAndAnsweredCounters).toBeInTheDocument();
    });
  });
});
