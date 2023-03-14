import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { enterRoom } from "../redux/actions/user";

const GenerateRoom = ({ enterRoom }) => {
  const roomId = uuid();
  return (
    <Button>
      <Link onClick={() => enterRoom(roomId)} to={roomId}>
        Generate Room
      </Link>
    </Button>
  );
};

GenerateRoom.propTypes = {
  enterRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { enterRoom })(GenerateRoom);
