import React, { useState, useEffect, useContext } from "react";
import { useHistory, generatePath } from "react-router-dom";
import classes from "./LikedJobs.module.css";
import { Card } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const axios = require("axios");

const LikedJobs = () => {
  const [liked, setLiked] = useState([]);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const lock = <FontAwesomeIcon icon={faLock} />;

  const history = useHistory();

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/likedjobs").then((response) => {
      if (response.data) {
        setLiked(response.data);
      }
    });
  }, []);

  const removeClickHandler = (index) => {
    let tempArr = [...liked];
    const companyname = tempArr[index].company_name;
    const deleted = tempArr[index];

    axios
      .delete(`https://pt-finder.herokuapp.com/remove/${companyname}`)
      .then((response) => {
        const newArr = tempArr.filter((e) => e !== deleted);
        setLiked(newArr);
      });
  };

  const btnClickHandler = (index) => {
    const newArr = [...liked];
    const id = newArr[index].id;
    history.push(generatePath(`/jobdetails/${id}`));
  };

  return (
    <div className={classes.body}>
      {isLoggedIn ? (
        <>
          <div className={classes.header}>
            <h3>
              Saved Jobs <span className="mx-1"> </span>
              <i className="fa-regular fa-bookmark"></i>
            </h3>
            <hr />
          </div>

          <div className="row">
            {liked.length === 0 && (
              <div className={classes.warningContainer}>
                <div className={classes.warningIcon}>⚠</div>
                <div className={classes.warning}>
                  No jobs have been added yet
                </div>
              </div>
            )}
            {liked.map((e, i) => (
              <div className="col-md-3 mt-5" key={i}>
                <div className={classes.container}>
                  <Card className={classes.card}>
                    <Card.Body>
                      <div className="text-end">
                        <i
                          className="fa-solid fa-x"
                          style={{ cursor: "pointer" }}
                          onClick={() => removeClickHandler(i)}
                        ></i>
                      </div>
                      <Card.Title className="mt-3">
                        <strong>{e.company_name}</strong>
                      </Card.Title>
                      <Card.Subtitle className="mt-3 text-muted">
                        {e.occupation}
                      </Card.Subtitle>
                      <Card.Text>
                        <button
                          className={classes.applyBtn}
                          onClick={() => btnClickHandler(i)}
                        >
                          More details
                        </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={classes.background}>
          <p>
            {lock} <span style={{ marginLeft: "5px" }}> </span>
            Please <a href="/login">login</a> or<span> </span>
            <a href="/signup">sign up</a>
            <span> </span>to see saved jobs
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedJobs;
