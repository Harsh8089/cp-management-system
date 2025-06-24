export type ContestFilterDay = 30 | 90 | 365;

export type ContestApi = {
  contestId: number,
  contestName: string,
  rank: number,
  oldRating: number,
  newRating: number,
  ratingUpdateTimeSeconds: number
}

export type ProblemApi = {
  id: number,
  contestId: number,
  creationTimeSeconds: number,
  problem: {
    name: string,
    rating?: number,
    tags?: string[]
  },
  verdict: 'FAILED'| 'OK'| 'PARTIAL'| 'COMPILATION_ERROR'| 'RUNTIME_ERROR'| 'WRONG_ANSWER'| 'TIME_LIMIT_EXCEEDED'| 'MEMORY_LIMIT_EXCEEDED'| 'IDLENESS_LIMIT_EXCEEDED'| 'SECURITY_VIOLATED'| 'CRASHED'| 'INPUT_PREPARATION_CRASHED'| 'CHALLENGED'| 'SKIPPED'| 'TESTING'| 'REJECTED'| 'SUBMITTED';
}

export type Codeforces_API = 'USER_INFO' | 'CONTEST_INFO' | 'PROBLEM_INFO'; 