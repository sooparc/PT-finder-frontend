import { Card, Button } from "react-bootstrap";
import classes from "./Homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faClock,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const dog = <FontAwesomeIcon size="xl" icon={faDog} />;
  const clock = <FontAwesomeIcon size="xl" icon={faClock} />;
  const card = <FontAwesomeIcon size="xl" icon={faCreditCard} />;

  return (
    <div className={classes.body}>
      <div className={classes.header}>
        <Card className={classes.card}>
          <Card.Body>
            <div className="mb-3">{dog}</div>
            <Card.Title className={classes.cardTitle}>ONE TIME JOBS</Card.Title>
            <Card.Text className={classes.cardText}>
              Looking for a contractor to fulfill an one time job?
            </Card.Text>
            <Button href="/onetimejobs" variant="dark" className="mt-3">
              POST A JOB
            </Button>
          </Card.Body>
        </Card>

        <Card className={classes.card}>
          <Card.Body>
            <div className="mb-3">{clock}</div>
            <Card.Title className={classes.cardTitle}>
              PART TIME JOBS
            </Card.Title>
            <Card.Text className={classes.cardText}>
              It won't take more than 5 minutes to post. Post one now !
            </Card.Text>
            <Button href="/parttimejobs" variant="dark" className="mt-3">
              POST A JOB
            </Button>
          </Card.Body>
        </Card>

        <Card className={classes.card}>
          <Card.Body>
            <div className="mb-3">{card}</div>
            <Card.Title className={classes.cardTitle}>Membership</Card.Title>
            <Card.Text className={classes.cardText}>
              Join for the benefits, stay to make a difference.
            </Card.Text>
            <Button href="/payment" variant="dark" className="mt-3">
              SIGN UP
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
