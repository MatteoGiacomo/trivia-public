import { QuestionsResponse } from "../../features/quiz/quizAPI";
export const quizMock: QuestionsResponse = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question: "In Night In The Woods, where does Gregg work?",
      correct_answer: "Snack Falcon",
      incorrect_answers: [
        "Ol&#039; Pickaxe",
        "Video Outpost &quot;Too&quot;",
        "Food Donkey",
      ],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question:
        "In Final Fantasy XIV, what is the name of the Deep Dungeon that was introduced in the expansion pack, Heavensward?",
      correct_answer: "Palace of the Dead",
      incorrect_answers: [
        "Heaven on High",
        "Aetherochemical Research Facility",
        "Sunken Temple of Qarn",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does the &quot;MP&quot; stand for in MP3?",
      correct_answer: "Moving Picture",
      incorrect_answers: ["Music Player", "Multi Pass", "Micro Point"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question: "How many classes are there in Team Fortress 2?",
      correct_answer: "9",
      incorrect_answers: ["10", "8", "7"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "hard",
      question:
        "Which of these artists did NOT remix the song &quot;Faded&quot; by Alan Walker?",
      correct_answer: "Skrillex",
      incorrect_answers: ["Ti&euml;sto", "Slushii", "Dash Berlin"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question: "Who is the leader of Team Valor in Pok&eacute;mon Go?",
      correct_answer: "Candela",
      incorrect_answers: ["Willow", "Blanche", "Spark"],
    },
    {
      category: "Entertainment: Japanese Anime & Manga",
      type: "boolean",
      difficulty: "easy",
      question:
        "In the &quot;Toaru Kagaku no Railgun&quot; anime, espers can only reach a maximum of level 6 in their abilities.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the name of the largest planet in Kerbal Space Program?",
      correct_answer: "Jool",
      incorrect_answers: ["Eeloo", "Kerbol", "Minmus"],
    },
    {
      category: "Entertainment: Cartoon & Animations",
      type: "multiple",
      difficulty: "medium",
      question: "Adam West was the mayor of which cartoon town?",
      correct_answer: "Quahog",
      incorrect_answers: ["Springfield", "South Park", "Langley Falls"],
    },
    {
      category: "General Knowledge",
      type: "boolean",
      difficulty: "easy",
      question:
        "Scotland voted to become an independent country during the referendum from September 2014.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
  ],
};
