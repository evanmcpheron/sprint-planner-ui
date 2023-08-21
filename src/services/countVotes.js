export const countVotes = (users) => {
  const currentVotes = [];
  for (const user of users) {
    for (const vote of user.votes) {
      currentVotes.push(vote.value);
    }
  }
  let sum = 0;
  let voteCount = 0;
  for (const value of currentVotes) {
    if (value === "N/A") {
    } else if (value === "Low") {
      sum += 1;
      voteCount += 1;
    } else if (value === "Medium") {
      sum += 8;
      voteCount += 1;
    } else if (value === "High") {
      sum += 13;
      voteCount += 1;
    }
  }
  let returnedScore;
  if (sum / voteCount < 1.5) {
    returnedScore = 1;
  } else if (sum / voteCount >= 1.5 && sum / voteCount < 2.5) {
    returnedScore = 2;
  } else if (sum / voteCount >= 2.5 && sum / voteCount < 4) {
    returnedScore = 3;
  } else if (sum / voteCount >= 4 && sum / voteCount < 6.5) {
    returnedScore = 5;
  } else if (sum / voteCount >= 6.5 && sum / voteCount < 10.5) {
    returnedScore = 8;
  } else if (voteCount === 0) {
    returnedScore = "N/A";
  } else {
    returnedScore = 13;
  }

  return returnedScore;
};
