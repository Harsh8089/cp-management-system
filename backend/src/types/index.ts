export type ContestFilterDay = 30 | 90 | 365;

export type ContestApi = {
  contestId: number,
  contestName: string,
  rank: number,
  oldRating: number,
  newRating: number,
  ratingUpdateTimeSeconds: number
}

export type Codeforces_API = 'USER_INFO' | 'CONTEST_INFO' | 'PROBLEM_INFO'; 