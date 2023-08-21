import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Check, Close } from "@mui/icons-material";
import { useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserToList } from "../redux/actions/votes";
import VotesScore from "./VotesScore";
import { SocketContext } from "../context/socket";
import { resetUserVotes } from "../redux/actions/user";

const VotersTable = ({ votes, addUserToList, resetUserVotes }) => {
  const [visible, setVisible] = useState(false);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin");
  const socket = useContext(SocketContext);

  const handlePointVisibility = () => {
    socket.emit("change-point-visibility", !visible);
  };

  const handleResetScores = () => {
    socket.emit("reset-scores");
    socket.emit("change-point-visibility", false);
  };

  useEffect(() => {
    socket.on("change-point-visibility", (visibility) => {
      setVisible(visibility);
    });
    socket.on("reset-scores", (users) => {
      resetUserVotes();
      addUserToList(users);
    });
  }, [visible]);

  const parseData = (data) => {
    if (visible) {
      switch (data) {
        case "N/A":
          return <Typography>N/A</Typography>;
        case "Low":
          return <Typography sx={{ color: "lightgreen" }}>LOW</Typography>;
        case "Medium":
          return <Typography sx={{ color: "orange" }}>MEDIUM</Typography>;
        case "High":
          return <Typography sx={{ color: "red" }}>HIGH</Typography>;
        case "Epic":
          return <Typography className="epic">Epic</Typography>;
        default:
          return;
      }
    }

    return (
      <>
        {data === "N/A" ? (
          <Close color={"error"} />
        ) : (
          <Check color={"success"} />
        )}
      </>
    );
  };

  return (
    <div className={"voters-table-container"}>
      <Button
        variant={"contained"}
        onClick={() => {
          navigator.clipboard.writeText(
            `https://sprint-planner-ui.herokuapp.com/${roomId}`
          );
        }}
        id={"link-copy"}
      >{`https://sprint-planner-ui.herokuapp.com/${roomId}`}</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Uncertainty</TableCell>
              <TableCell align="center">Complexity</TableCell>
              <TableCell align="center">Effort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes.map((user) => {
              return (
                <TableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">
                    {parseData(user.votes[0].value)}
                  </TableCell>
                  <TableCell align="center">
                    {parseData(user.votes[1].value)}
                  </TableCell>
                  <TableCell align="center">
                    {parseData(user.votes[2].value)}
                  </TableCell>
                </TableRow>
              );
            })}
            {visible && (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center">
                  <VotesScore votes={votes} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isAdmin && (
        <div className={"admin-buttons-container"}>
          <Button
            variant={"contained"}
            style={{ marginRight: "10px" }}
            onClick={handlePointVisibility}
          >
            {visible ? "Hide" : "Reveal"}
          </Button>
          <Button variant={"contained"} onClick={handleResetScores}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

VotersTable.propTypes = {
  addUserToList: PropTypes.func.isRequired,
  resetUserVotes: PropTypes.func.isRequired,
  votes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  votes: state.votes,
});

export default connect(mapStateToProps, { addUserToList, resetUserVotes })(
  VotersTable
);
