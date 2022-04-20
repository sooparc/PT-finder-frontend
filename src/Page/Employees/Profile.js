import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Profile.module.css";
import { Card, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faTrashCan,
  faPenToSquare,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Page/EmployeeUsers/auth-context";

const axios = require("axios");

const Profile = () => {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [showA, setShowA] = useState(false);
  const [userId, setUserId] = useState("");
  const email = <FontAwesomeIcon icon={faEnvelope} />;
  const user = <FontAwesomeIcon icon={faUser} />;
  const trashCan = <FontAwesomeIcon icon={faTrashCan} />;
  const edit = <FontAwesomeIcon icon={faPenToSquare} />;
  const lock = <FontAwesomeIcon icon={faLock} />;

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/users").then((response) => {
      const newArr = response.data;
      const user_id = localStorage.getItem("userId");
      const filteredObj = newArr.find((e) => e.id == user_id);
      console.log(filteredObj);
      setUserId(filteredObj.id);
      setUsername(filteredObj.username);
      setEmailAddress(filteredObj.email);
    });
  }, []);

  const deleteAccount = () => {
    axios
      .delete(`https://pt-finder.herokuapp.com/delete/${userId}`)
      .then((response) => {
        console.log("deleted");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        authCtx.logout();
        history.push("/");
      });
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Profile</h2>
          <hr />

          {isLoggedIn ? (
            <>
              <div className={classes.header}>
                <img
                  src="https://elzero.org/images/challenges/person-blue-shirt.png"
                  alt=""
                />
                <h4 className="mt-3">
                  <strong>Username: </strong>
                  {username}
                </h4>
              </div>

              <div className="text-center text-muted">
                {email} {emailAddress}
              </div>

              <div className="text-center mt-5">
                <a href="/resume" className={classes.editLink}>
                  {edit}
                  <span> </span>Edit Resume
                </a>

                <button
                  className={classes.deleteBtn}
                  onClick={() => setShowA(true)}
                >
                  {trashCan}
                  <span style={{ marginRight: "3px" }}> </span> Delete Account
                </button>
              </div>
            </>
          ) : (
            <div className={classes.background}>
              <p>
                {lock} <span style={{ marginLeft: "5px" }}> </span>
                Please <a href="/login">login</a> or<span> </span>
                <a href="/signup">sign up</a>
                <span> </span>to create a profile.
              </p>
            </div>
          )}
        </div>
      </div>

      <Toast show={showA} onClose={toggleShowA} className={classes.toast}>
        <Toast.Header>
          <strong className="me-auto">Delete Account</strong>
        </Toast.Header>
        <Toast.Body>
          Are you sure you want to delete your account?
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button
              className={classes.cancelButton}
              onClick={() => setShowA(false)}
            >
              Cancel
            </button>
            <button className={classes.deleteButton} onClick={deleteAccount}>
              Delete
            </button>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Profile;
