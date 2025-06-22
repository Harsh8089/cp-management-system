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

export type Rating = 800 | 900 | 1000 | 1100 | 1200 | 1300 | 1400 | 1500 | 1600 | 1700 | 1800 | 1900 | 2000 | 2100 | 2200 | 2300;

type BucketWiseData = {
  [key in Rating]?: number;
};

export type ProblemFilterDay = 7 | 30 | 90;

export type ProblemDetailsAPI = {
  verdict: "OK" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | "MEMORY_LIMIT_EXCEEDED";
  creationTimeSeconds: number;
  problem: {
    name: string;
    rating: Rating;
    tags: any[]
  }
}

export type HeatMapData = {
  [date: string]: number
}

export type ProblemDetails = {
  userId: string;
  filterDay: ProblemFilterDay;
  maxProblemRating: number;
  problemsSolved: number;
  avgRating: number;
  avgProblemsSolvedPerDay?: number;
  problems: ProblemDetailsAPI[];
  bucketWiseData: BucketWiseData;
  heatMapData: HeatMapData
}

export type Codeforces_API = 'USER_INFO' | 'CONTEST_INFO' | 'PROBLEM_INFO'; 