import React, { useEffect, useState } from "react";
import { useHistory, generatePath, useParams } from "react-router-dom";
import classes from "./SearchedJobs.module.css";
import { Card } from "react-bootstrap";

const SearchedJobs = () => {
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const { jobId, cityId } = useParams();

  const axios = require("axios");
  const history = useHistory();

  useEffect(() => {
    axios
      .post(`https://pt-finder.herokuapp.com/search`, {
        jobTitle: jobId,
        city: cityId,
      })
      .then((response) => {
        setFilteredCompanies(response.data);
      });
  }, [setFilteredCompanies]);

  const searchClickHandler = () => {
    axios
      .post(`https://pt-finder.herokuapp.com/search`, {
        jobTitle: jobTitle,
        city: city,
      })
      .then((response) => {
        setFilteredCompanies(response.data);
      });
  };

  const buttonClickHandler = (i) => {
    const id = filteredCompanies[i].id;
    history.push(generatePath(`/jobdetails/${id}`));
  };

  return (
    <div className={classes.body}>
      <div className={classes.inputBox}>
        <input
          type="text"
          placeholder={jobId}
          className={classes.input1}
          onChange={(e) => setJobTitle(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder={cityId}
          className={classes.input2}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button className={classes.searchBtn} onClick={searchClickHandler}>
          Search
        </button>
      </div>

      <hr />

      {filteredCompanies.length == 0 ? (
        <div className={classes.warningContainer}>
          <div className={classes.warningIcon}>⚠</div>
          <div className={classes.warning}>No results found</div>
        </div>
      ) : (
        <div className="row mt-5">
          {filteredCompanies.map((company, i) => (
            <div className="col-md-4" key={i}>
              <Card className={classes.card}>
                <Card.Body>
                  <Card.Title className="mb-3">
                    <strong>{company.company_name}</strong>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {company.occupation}
                  </Card.Subtitle>
                  <Card.Text>
                    {company.city}, {company.state}, {company.zipcode}
                  </Card.Text>
                  <div className="text-center">
                    <button
                      className={classes.detailBtn}
                      onClick={() => buttonClickHandler(i)}
                    >
                      More details
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchedJobs;
