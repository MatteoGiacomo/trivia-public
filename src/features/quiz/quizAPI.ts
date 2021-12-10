const OPEN_TDB_URL = "https://opentdb.com/api.php?amount=10";

export type Question = {
  category: string;
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionsResponse = {
  results: Question[];
  response_code: number;
};

export async function fetchQuestions(): Promise<QuestionsResponse> {
  const response = await fetch(OPEN_TDB_URL);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Questions API error");
}
