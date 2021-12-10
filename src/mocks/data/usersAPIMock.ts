import { UserData } from "../../features/sharedAPIs";

export const usersMock: Record<string, UserData> = {
  "first-user": {
    nickname: "Foo",
    bestScore: {
      score: 12,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  A02: {
    nickname: "Tom",
    bestScore: {
      score: 22,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  A03: {
    nickname: "Bar",
    bestScore: {
      score: 80,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  B01: {
    nickname: "Baz",
    bestScore: {
      score: 2,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  B02: {
    bestScore: {
      score: 14,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  B03: {
    nickname: "Mark",
    bestScore: {
      score: 30,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  C01: {
    nickname: "Joe35",
    bestScore: {
      score: 21,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  C02: {
    nickname: "Ironman",
    bestScore: {
      score: 17,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  "user-with-best-score": {
    nickname: "Very very long nickname",
    bestScore: {
      score: 230,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  D01: {
    nickname: "Jocker",
    bestScore: {
      score: 10,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  D02: {
    nickname: "Pascal",
    bestScore: {
      score: 10,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
  D03: {
    nickname: "Alpha",
    bestScore: {
      score: 45,
      date: "2021-12-06T16:41:31.158Z",
    },
    scores: [12, 13, 9],
  },
};
