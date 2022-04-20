import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import classes from "./JobDetails.module.css";
import Map from "../../Components/Map";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const JobDetails = () => {
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [occupation, setOccupation] = useState("");

  const phoneIcon = <FontAwesomeIcon icon={faPhone} />;

  const id = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/companies").then((response) => {
      const newArr = response.data;
      const newId = id.id;
      const filteredObj = newArr.find((e) => e.id == newId);
      setSelectedCompany(filteredObj);
      setCompanyname(filteredObj.company_name);
      setOccupation(filteredObj.occupation);
    });

    axios.get("https://pt-finder.herokuapp.com/users").then((response) => {
      const tempArr = response.data;
      const user_id = localStorage.getItem("userId");
      const filteredUser = tempArr.find((e) => e.id == user_id);
      setUserId(filteredUser.id);
      setFirstname(filteredUser.firstname);
      setLastname(filteredUser.lastname);
      setPhone(filteredUser.phonenumber);

      setSelectedUser(filteredUser);
    });
  }, []);

  const applyClickHandler = () => {
    if (selectedUser.firstname === null) {
      alert("Please fill out a resume form first !!");
      history.push("/resume");
    } else {
      axios
        .post("https://pt-finder.herokuapp.com/applied_jobs", {
          user_id: userId,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          company_name: companyname,
          occupation: occupation,
        })
        .then((response) => {
          alert("Succesfully applied :)");
        });
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.notification}>
            <div>
              <h2 className={classes.notificationTitle}>
                {selectedCompany.company_name}
              </h2>
              <p className={classes.notificationDesc}>
                {selectedCompany.street}, {selectedCompany.state},<span> </span>
                {selectedCompany.zip_code}
              </p>
            </div>
            <div>
              <button
                className={classes.notificationButton}
                onClick={applyClickHandler}
              >
                Apply
              </button>
            </div>
          </div>
          <div className={classes.menu}>
            <div className={classes.menuList}>
              <h2 className={classes.menuListTitle}>Job title</h2>
              <li className={classes.menuListItem}>
                <p>
                  * We are hiring part-time workers
                  <br />
                  <strong>{selectedCompany.occupation}</strong>
                </p>

                <div>
                  <div>For more details</div>
                  {phoneIcon} <span> </span>
                  {selectedCompany.phone}
                </div>
              </li>
            </div>
          </div>
        </div>
        <div className={classes.mapBox}>
          <div className={classes.map}>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
