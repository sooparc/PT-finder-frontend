import React, { useState, useEffect, useContext } from "react";
import classes from "./OneTimeJobs.module.css";
import AuthContext2 from "../../Page/EmployerUsers/auth-context2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const OneTimeJobs = () => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userId, setUserId] = useState("");

  // To bring data that user saved before
  const [nameRef, setNameRef] = useState("");
  const [occupationRef, setOccupationRef] = useState("");
  const [salaryRef, setSalaryRef] = useState("");
  const [phoneRef, setPhoneRef] = useState("");
  const [streetRef, setStreetRef] = useState("");
  const [cityRef, setCityRef] = useState("");
  const [stateRef, setStateRef] = useState("");
  const [zipcodeRef, setZipcodeRef] = useState("");

  const axios = require("axios");

  const authCtx2 = useContext(AuthContext2);
  const isLoggedIn = authCtx2.isLoggedIn;
  const lock = <FontAwesomeIcon icon={faLock} />;

  useEffect((index) => {
    const id = localStorage.getItem("user_id");

    axios.get("https://pt-finder.herokuapp.com/employers").then((response) => {
      const newArr = response.data;
      const filteredArr = newArr.find((e) => e.id === id);
      setUserId(filteredArr.id);
    });

    axios
      .get("https://pt-finder.herokuapp.com/onetimejobsdata")
      .then((response) => {
        const newArr = response.data;
        const filteredArr = newArr.find((e) => e.user_id === id);
        setNameRef(filteredArr.company_name);
        setOccupationRef(filteredArr.occupation);
        setSalaryRef(filteredArr.salary);
        setPhoneRef(filteredArr.phone);
        setStreetRef(filteredArr.street);
        setCityRef(filteredArr.city);
        setStateRef(filteredArr.state);
        setZipcodeRef(filteredArr.zip_code);
      });
  });

  const saveClickHandler = () => {
    axios
      .post("https://pt-finder.herokuapp.com/onetimejobs", {
        name: name,
        occupation: occupation,
        salary: salary,
        phone: phone,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        userId: userId,
      })
      .then((response) => {
        alert("Successfully saved !");
      });
  };

  const submitHandler = (e) => {
    e.preventdefault();
  };

  const editClickHandler = () => {
    axios
      .put("https://pt-finder.herokuapp.com/editonetimejob", {
        name: name,
        occupation: occupation,
        salary: salary,
        phone: phone,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        userId: userId,
      })
      .then((response) => {
        alert("Successfully edited !");
      });
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        {isLoggedIn ? (
          <>
            <div>
              <h1 className={classes.title}>One Time Job HIRING !</h1>
            </div>

            <form onSubmit={submitHandler}>
              <div className={classes.inputBox}>
                <div>
                  <label className={classes.label}>
                    First name / Last name
                  </label>
                  <input
                    type="text"
                    className={classes.input}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={nameRef}
                    required="required"
                  />
                </div>

                <div>
                  <label className={classes.label}>Job Title</label>
                  <input
                    type="text"
                    className={classes.input}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder={occupationRef}
                    required="required"
                  />
                </div>

                <div>
                  <label className={classes.label}>Salary (per hour)</label>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder={salaryRef}
                    onChange={(e) => setSalary(e.target.value)}
                    required="required"
                  />
                </div>

                <div>
                  <label className={classes.label}>Phone number</label>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder={phoneRef}
                    onChange={(e) => setPhone(e.target.value)}
                    required="required"
                  />
                </div>

                <div className="mt-2">
                  <label className={classes.label}>
                    When do you need to hire?
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      fontWeight: "700",
                      marginTop: "30px",
                    }}
                  >
                    Start
                  </label>
                  <input
                    type="date"
                    className={classes.input}
                    onChange={(e) => setStartDate(e.target.value)}
                    required="required"
                  />
                  <input
                    type="time"
                    className={classes.input}
                    style={{ marginLeft: "10px" }}
                    onChange={(e) => setStartTime(e.target.value)}
                    required="required"
                  />
                  <br />
                  <label
                    style={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      fontWeight: "700",
                    }}
                    className="mb-5"
                  >
                    End
                  </label>
                  <input
                    type="date"
                    className={classes.input}
                    onChange={(e) => setEndDate(e.target.value)}
                    required="required"
                  />
                  <input
                    type="time"
                    className={classes.input}
                    style={{ marginLeft: "10px" }}
                    onChange={(e) => setEndTime(e.target.value)}
                    required="required"
                  />
                </div>

                <hr />

                <h4 className="mt-5">Location</h4>
                <div className="mt-4">
                  <label className={classes.label}>Street</label>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder={streetRef}
                    onChange={(e) => setStreet(e.target.value)}
                    required="required"
                  />
                </div>

                <div>
                  <label className={classes.label}>City</label>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder={cityRef}
                    onChange={(e) => setCity(e.target.value)}
                    required="required"
                  />
                </div>

                <div>
                  <label className={classes.label}>State</label>
                  <select
                    className={classes.input}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    placeholder={stateRef}
                    style={{ padding: "8px 15px" }}
                    required="required"
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>

                <div>
                  <label className={classes.label}>Zip code</label>
                  <input
                    type="text"
                    className={classes.input}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder={zipcodeRef}
                    required="required"
                  />
                </div>

                <button className={classes.editBtn} onClick={editClickHandler}>
                  Edit
                </button>
                <button className={classes.saveBtn} onClick={saveClickHandler}>
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className={classes.background}>
              <p>
                {lock} <span style={{ marginLeft: "5px" }}> </span>
                Please <a href="/employerlogin">login</a> or<span> </span>
                <a href="/employersignup">sign up</a>
                <span> </span>to post a job.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OneTimeJobs;
