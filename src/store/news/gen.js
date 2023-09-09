import axios from "axios";

export const GET_NEWS = "GET_NEWS";
const SUBS = [
  "AskReddit",
  "IAmA",
  "bestof",
  "fatpeoplestories",
  "DoesAnybodyElse",
  "CrazyIdeas",
  "WTF",
  "aww",
  "cringe",
  "rage",
  "nosleep",
  "nostalgia",
  "gaming",
  "pokemon",
  "starcraft",
];
const GET_NEWS_URL = "https://www.reddit.com/r/";
const GET_NEWS_QUERY = "/top.json?limit=10&t=year";
const TWENTY_SECS = 20000;

/**
 * Calls Reddit API to fetch the top 10 entries from a random sub topic
 *
 * @returns {function(): Promise<AxiosResponse<any>>}
 */
const getNewsWorker = () => () => {
  const randomSub = SUBS[Math.floor(Math.random() * SUBS.length)];
  const url = GET_NEWS_URL + randomSub + GET_NEWS_QUERY;
  return axios.get(url).then((r) => r.data);
};

export default [
  {action: GET_NEWS, worker: getNewsWorker, opts: {pollEvery: TWENTY_SECS}},
];
