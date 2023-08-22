import React, { useEffect, useContext } from "react";
import VotingRow from "./VotingRow";
import { Paper, Table, TableBody, TableContainer, Button } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserToList, updateVotes } from "../redux/actions/votes";
import { SocketContext } from "../context/socket";
import { resetUserVotes } from "../redux/actions/user";

const VotingRoom = ({ updateVotes, addUserToList, user }) => {
  const socket = useContext(SocketContext);
  const id = user.id;
  useEffect(() => {
    if (user.name) {
      socket.emit("new-vote", { ...user, votes: user.votes, id: user.id });
      socket.on("new-vote", (vote) => {
        addUserToList(vote);
      });
    }
  }, [user.votes]);

  return (<div>
    <TableContainer className={"voting-row-container"} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {user.votes.map((vote, idx) => {
            return (
              <VotingRow
                updateVotes={(newVote) => updateVotes(newVote)}
                key={idx}
                vote={vote}
              />

            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <Button
      className={"vote-button"}
      variant={"contained"}
      sx={{ margin: '10px' }}
      size="large"
      color={"primary"}
      onClick={() => {
        updateVotes({ category: "Uncertainty", value: "EPIC", id });
        updateVotes({ category: "Complexity", value: "EPIC", id });
        updateVotes({ category: "Effort", value: "EPIC", id });
      }
      }
    >
      EPIC VOTE
    </Button>
  </div>
  );
};

VotingRoom.propTypes = {
  updateVotes: PropTypes.func.isRequired,
  resetUserVotes: PropTypes.func.isRequired,
  addUserToList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  votes: state.votes,
  user: state.user,
});

export default connect(mapStateToProps, {
  updateVotes,
  resetUserVotes,
  addUserToList,
})(VotingRoom);
