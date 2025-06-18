export type ContestFilterDay = 30 | 90 | 365;

export type CodeforcesContestAPI = {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

export type ContestDetails = {
  userId: string;
  filterDay: ContestFilterDay;
  contest: CodeforcesContestAPI[]
} 

type BucketWiseData = {
  minRating: '800' | '900' | '1000' | '1100' | '1200' | '1300';
  maxRating: number;
  totalProblems: number;
}

export type ProblemDetails = {
  userId: string;
  filterDays: '7' | '30' | '90';
  maxProblemRating: number;
  problemsSolved: number;
  avgRating: number;
  avgProblemsSolved: number;
  bucketWiseData: BucketWiseData[];
}