import axios from "axios";
import { format, subDays } from "date-fns";
import { 
  ProblemDetails, 
  ProblemDetailsAPI, 
  ProblemFilterDay, 
  Rating 
} from "../types";
import { DATE_FORMAT } from "../const/const";

export const problemSolvingData = async (
  userId: string, 
  filterDay: ProblemFilterDay
): Promise<ProblemDetails | null> => {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.status?handle=${userId}&from=1`);

    if(res.data.status === "OK") {
      const data = res.data.result;
      let maxProblemRating = 0, avgRating = 0, avgProblemsSolvedPerDay = 0;

      const today = new Date();
      const lastDay = format(subDays(today, filterDay), DATE_FORMAT);
      
      const problemSet = new Set<string>();
      
      const filterProblems = data.filter((p: ProblemDetailsAPI) => {  
        const problem = problemSet.has(p.problem.name);      
        if(p.verdict === "OK" && !problem) {

          const submissionDateTime = new Date(p.creationTimeSeconds * 1000);
          const formattedDate = format(submissionDateTime, DATE_FORMAT);
          if(new Date(formattedDate) > new Date(lastDay)) {
            problemSet.add(p.problem.name);
            return p;
          }
        }
      }).map((p: ProblemDetailsAPI) => {
        return {
          verdict: p.verdict,
          creationTimeSeconds: p.creationTimeSeconds,
          problem: {
            name: p.problem.name,
            rating: p.problem.rating,
            tags: p.problem.tags,
          },
        }
      });
      
      filterProblems.forEach((p: any) => {
        maxProblemRating = Math.max(maxProblemRating, p.problem.rating ?? 0);
        avgRating += p.problem.rating ?? 0;
      });
      
      
      const bucketWiseData = new Map<Rating, number>();
      const heatMapData = new Map<string, number>();
      for(let i = 0; i < filterProblems.length; i++) {
        const rating: Rating = filterProblems[i].problem.rating;
        if(rating) {
          const count = bucketWiseData.get(rating) ?? 0;
          bucketWiseData.set(rating, count + 1);
        }

        const submissionDateTime = new Date(filterProblems[i].creationTimeSeconds * 1000);
        const formattedDate = format(submissionDateTime, DATE_FORMAT);
        const submissionCount = heatMapData.get(formattedDate) ?? 0;
        heatMapData.set(formattedDate, submissionCount + 1);
      }
      
      const problemsSolved = filterProblems.length;

      return {
        userId,
        filterDay,
        maxProblemRating,
        problemsSolved,
        avgRating: problemsSolved > 0 ? Math.round(avgRating / problemsSolved) : 0,
        problems: filterProblems,
        bucketWiseData: Object.fromEntries(bucketWiseData),
        heatMapData: Object.fromEntries(heatMapData)
      }
    }
  } catch (error) {
    throw(error);
  }
  return null;
} 