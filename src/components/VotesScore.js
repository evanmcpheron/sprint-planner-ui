import { countVotes } from "../services/countVotes";
import { Paper } from "@mui/material";

const VotesScore = ({ votes }) => {
  const score = countVotes(votes);

  return <Paper>{score} score</Paper>;
};

export default VotesScore;
