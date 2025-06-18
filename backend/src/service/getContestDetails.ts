import axios from "axios";
import { CodeforcesContestAPI, ContestDetails, ContestFilterDay } from "../types";
import { format, subDays } from "date-fns";

const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const getContestDetails = async (userId: string, filterDay: ContestFilterDay): Promise<ContestDetails | null> => {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${userId}`);

    if(res.data.status === "OK") {
      const data = res.data.result?.reverse() as CodeforcesContestAPI[];
      const today = new Date();
      const lastDay = format(subDays(today, filterDay), DATE_FORMAT);
      
      const filterContests = data.filter((contest: CodeforcesContestAPI) => {
        const contestEndDateTime = contest.ratingUpdateTimeSeconds;
        const dateObj = new Date(contestEndDateTime * 1000);
        const formattedDate = format(dateObj, DATE_FORMAT);   
        return formattedDate > lastDay;   
      });

      return {
        userId,
        filterDay,
        contest: filterContests.reverse()
      };
    }
  } catch (error) {
    throw(error);
  }
  return null;
}