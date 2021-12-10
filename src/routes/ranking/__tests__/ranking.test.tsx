import React from "react";
import { Ranking } from "../Ranking";
import { render, screen, within } from "../../../test-utils";
import { usersMock } from "../../../mocks/data/usersAPIMock";
import { formatDateTime } from "../../../services";

describe("Ranking", () => {
  test("it renders loader while load ranking data", async () => {
    render(<Ranking />);

    const loader = screen.queryByTestId("ranking-loader");
    expect(loader).toBeInTheDocument();

    const firstUserNickname = usersMock["first-user"].nickname || "";
    await screen.findByText(firstUserNickname);

    expect(loader).not.toBeInTheDocument();
  });

  test("it renders users nickname, best score and best score date per row", async () => {
    render(<Ranking />);

    const bestScoreUserNickname =
      usersMock["user-with-best-score"].nickname || "";
    const bestScoreUserScore =
      usersMock["user-with-best-score"]?.bestScore?.score;
    const bestScoreUserDate =
      usersMock["user-with-best-score"]?.bestScore?.date ||
      "2021-12-10T11:20:11.573Z";

    const rows = await screen.findAllByTestId("rank-row");
    const firstRankingRow = rows[0];

    expect(
      within(firstRankingRow).queryByText(bestScoreUserNickname)
    ).toBeInTheDocument();

    expect(
      within(firstRankingRow).queryByText(bestScoreUserScore || 0)
    ).toBeInTheDocument();

    expect(
      within(firstRankingRow).queryByText(formatDateTime(bestScoreUserDate))
    ).toBeInTheDocument();
  });

  test("it renders max 10 rows", async () => {
    render(<Ranking />);

    const rows = await screen.findAllByTestId("rank-row");

    expect(rows.length).toBeLessThan(11);
  });
});
