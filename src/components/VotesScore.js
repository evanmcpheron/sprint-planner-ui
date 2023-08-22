import { countVotes } from "../services/countVotes";
import { Box } from "@mui/material";

const VotesScore = ({ votes }) => {
  const score = countVotes(votes);

  return <Box>{score > 1 ? `${score} Points` : `${score} Point`}</Box>;
};

export default VotesScore;
