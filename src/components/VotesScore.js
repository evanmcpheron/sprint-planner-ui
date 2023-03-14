import { countVotes } from "../services/countVotes";
import { Box } from "@mui/material";

const VotesScore = ({ votes }) => {
  const score = countVotes(votes);

  return <Box>{score} Points</Box>;
};

export default VotesScore;
