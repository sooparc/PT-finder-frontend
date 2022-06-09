import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import classes from "./Payment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";

const Payment = () => {
  const [success, setSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => setShowPayment(false);
  const handleShow = () => setShowPayment(true);

  const axios = require("axios");

  const check = <FontAwesomeIcon icon={faCheck} />;

  const btnClickHandler = () => {
    setShowPayment(true);
  };

  useEffect((index) => {
    const id = localStorage.getItem("user_id");
    setUserId(id);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    axios
      .post("https://pt-finder.herokuapp.com/paymentInfo", {
        userId: userId,
        name: name,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
      })
      .then((response) => {
        alert("Successfully paid !");
      });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://pt-finder.herokuapp.com/payment",
          {
            amount: 100,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="text-center">
        <div className={classes.body}>
          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}></span>Free
              </div>
            </div>
            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>Free trial</span>
              <h1 className={classes.cardHeaderTitle}>BASIC</h1>
            </div>

            <div className={classes.cardList}>
              <p>
                {check}
                <span> </span>Post part time jobs
              </p>
              <p>
                {check}
                <span> </span>Post one time jobs
              </p>
              <p>
                {check}
                <span> </span>Up to 5 job posting
              </p>
            </div>

            <button className={classes.cardButton} disabled>
              Free Trial
            </button>
          </div>

          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}>$</span>9.99
              </div>
              <span className={classes.cardPricingMonth}>/month</span>
            </div>

            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>
                Affordable Plan
              </span>
              <h1 className={classes.cardHeaderTitle}>STANDARD</h1>
            </div>

            <div className={classes.cardList}>
              <p>
                {check}
                <span> </span> Exclusive access
              </p>
              <p>
                {check}
                <span> </span>Increased visibility for jobs
              </p>
              <p style={{ color: "#218AEC" }}>
                {check}
                <span> </span>Up to 50 job posting
              </p>
            </div>

            <button className={classes.cardButton} onClick={handleShow}>
              Choose this plan
            </button>
          </div>

          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}>$</span>19.99
              </div>
              <span className={classes.cardPricingMonth}>/month</span>
            </div>

            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>FULL ACCESS</span>
              <h1 className={classes.cardHeaderTitle}>PREMIUM</h1>
            </div>

            <div className={classes.cardList}>
              <p>
                {check}
                <span> </span>Full access
              </p>
              <p>
                {check}
                <span> </span>Unlimited job posting
              </p>
              <p style={{ color: "#218AEC" }}>
                {check}
                <span> </span>Find candidates for you
              </p>
            </div>

            <button className={classes.cardButton} onClick={handleShow}>
              Choose this plan
            </button>
          </div>
        </div>

        <Modal
          show={showPayment}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>PAYMENTS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={classes.paymentForm} onSubmit={handleSubmit}>
              <label htmlFor="card-element" className={classes.label}>
                Card
              </label>
              <CardElement id="card-element" />
            </form>

            <p className={classes.cardInstruction}>
              *Please fill out the form above
            </p>

            <div className="text-center mt-5">
              <h3 className="mb-4">Billing Address</h3>
              <label className={classes.label}>Name on card</label>
              <input
                type="text"
                className={classes.input}
                onChange={(e) => setName(e.target.value)}
              />
              <label className={classes.label}>Street</label>
              <input
                type="text"
                className={classes.input}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label className={classes.label}>City</label>
              <input
                type="text"
                className={classes.input}
                onChange={(e) => setCity(e.target.value)}
              />
              <label className={classes.label}>State</label>
              <input
                type="text"
                className={classes.input}
                onChange={(e) => setState(e.target.value)}
              />
              <label className={classes.label}>Zip code</label>
              <input
                type="text"
                className={classes.input}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!stripe || !elements}
                className={classes.payBtn}
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Payment);
