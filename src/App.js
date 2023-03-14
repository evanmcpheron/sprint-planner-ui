import React, { useContext, useEffect } from "react";
import { SocketContext } from "./context/socket";
import { useParams } from "react-router-dom";
import VotingRoom from "./components/VotingRoom";
import VotersTable from "./components/VotersTable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserToList, getAllUsers } from "./redux/actions/votes";
import { addUser } from "./redux/actions/user";

const App = ({ user, addUser, addUserToList }) => {
  let { roomId } = useParams();
  const socket = useContext(SocketContext);
  let currentUser = localStorage.getItem("currentUser");

  const onLoad = () => {
    if (currentUser) {
      const data = JSON.parse(currentUser);
      addUser(data.name, data.id, roomId);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (user.name) {
      socket.emit("new-user-add", { ...user });
      socket.on("get-users", (users) => {
        addUserToList(users);
      });
    }
  }, [user]);

  useEffect(() => {
    //   const handleFocus = async () => {
    //     socket.emit("new-user-add", { ...user, room: roomId });
    //     socket.on("get-users", (users) => {
    //       addUserToList(users);
    //     });
    //   };
    //
    //   const handleBlur = () => {
    //     if (user) {
    //       socket.emit("offline");
    //     }
    //   };

    // window.addEventListener("focus", handleFocus);
    // window.addEventListener("blur", handleBlur);

    return () => {
      // window.removeEventListener("focus", handleFocus);
      // window.removeEventListener("blur", handleBlur);
    };
  }, [user]);

  return (
    <div className="App">
      <VotersTable />
      <VotingRoom />
    </div>
  );
};

App.propTypes = {
  addUserToList: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  allUsers: state.votes,
});

export default connect(mapStateToProps, {
  addUserToList,
  addUser,
  getAllUsers,
})(App);
