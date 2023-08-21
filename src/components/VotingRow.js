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
          variant={vote.value === "LOW" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "LOW", id })
          }
        >
          LOW
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "MEDIUM" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "MEDIUM", id })
          }
        >
          MEDIUM
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "HIGH" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "HIGH", id })
          }
        >
          HIGH
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          className={"vote-button "}
          variant={vote.value === "EPIC" ? "contained" : "text"}
          size="large"
          color={"primary"}
          onClick={() =>
            updateVotes({ category: vote.category, value: "EPIC", id })
          }
        >
          EPIC
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
