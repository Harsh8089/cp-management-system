import { Codeforces_API } from "../types";

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DATE_FORMAT = 'yyyy-MM-dd';

const getCodeforcesApi = (userId: string, Api: Codeforces_API) => {
  switch(Api) {
    case 'USER_INFO':
      return `https://codeforces.com/api/user.info?handles=${userId}`;
    case 'CONTEST_INFO':
      return `https://codeforces.com/api/user.rating?handle=${userId}`;
    case 'PROBLEM_INFO':
      return `https://codeforces.com/api/user.status?handle=${userId}&from=1`;
    default:
      return "";
  }
}

export {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  getCodeforcesApi
}