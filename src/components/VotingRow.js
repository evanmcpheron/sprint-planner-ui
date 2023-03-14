import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const VotingRow = ({ vote, updateVotes, user }) => {
  const id = user.id;
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {vote.category}
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button"}
          variant={vote.value === "N/A" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "N/A", id })
          }
        >
          N/A
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "Low" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "Low", id })
          }
        >
          Low
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "Medium" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "Medium", id })
          }
        >
          Medium
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "High" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "High", id })
          }
        >
          High
        </Button>
      </TableCell>
    </TableRow>
  );
};

VotingRow.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(VotingRow);
