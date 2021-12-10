// mock for development mode
// import { usersMock } from "./rank/rankAPIMock";

const DB_BASE_URL = "DB_URL/";

export type UserData = {
  nickname?: string;
  scores: number[];
  bestScore?: {
    score: number;
    date: string;
  };
};

export async function getUserById(
  userId: string,
  authToken: string
): Promise<UserData> {
  const ENDPOINT = `${DB_BASE_URL}users/${userId}.json?auth=${authToken}`;
  const response = await fetch(ENDPOINT);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }
  return responseData;
}

export async function updateUserData(
  userId: string,
  authToken: string,
  userInformation: UserData
): Promise<UserData> {
  const ENDPOINT = `${DB_BASE_URL}users/${userId}.json?auth=${authToken}`;
  const response = await fetch(ENDPOINT, {
    method: "put",
    body: JSON.stringify(userInformation),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }
  return responseData;
}

export async function getUsersList(): Promise<Record<string, UserData>> {
  const ENDPOINT = `${DB_BASE_URL}users.json`;

  // mock for development mode
  // return Promise.resolve(usersMock);
  const response = await fetch(ENDPOINT);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }
  return responseData;
}
