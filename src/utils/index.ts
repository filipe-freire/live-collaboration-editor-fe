import { USER_COLORS, USER_NAMES } from "../components/Editor/constants";

export const getRandomElement: <T>(list: T[]) => T = (list) =>
  list[Math.floor(Math.random() * list.length)];

export const getRandomColor = () => getRandomElement(USER_COLORS);
export const getRandomName = () => getRandomElement(USER_NAMES);
