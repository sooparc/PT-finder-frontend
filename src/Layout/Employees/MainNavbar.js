import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFile,
  faAddressCard,
  faHeart,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import BrandLogo from "../../Assets/BrandLogo.png";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import classes from "./MainNavbar.module.css";

const MainNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const user = <FontAwesomeIcon size="lg" icon={faUser} />;
  const resume = <FontAwesomeIcon size="lg" icon={faFile} />;
  const profile = <FontAwesomeIcon size="lg" icon={faAddressCard} />;
  const heart = <FontAwesomeIcon size="lg" icon={faHeart} />;
  const employer = <FontAwesomeIcon size="lg" icon={faBriefcase} />;
  const history = useHistory();

  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={BrandLogo} style={{ width: "80%" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          className={classes.navbar}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              PT Finder
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!isLoggedIn && (
                <Nav.Link href="/login" className={classes.navbar}>
                  <span className="mx-2"> {user} </span> Login / Sign up
                </Nav.Link>
              )}
              <Nav.Link href="/profile" className={classes.navbar}>
                <span className="mx-2">{profile}</span>
                Profile
              </Nav.Link>
              <Nav.Link href="/likedjobs" className={classes.navbar}>
                <span className="mx-2">{heart}</span>
                Saved Jobs
              </Nav.Link>
              <Nav.Link href="/resume" className={classes.navbar}>
                <span className="mx-2"> {resume} </span> My resume
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href="/homepage" className={classes.navbar}>
                <span className="mx-2">{employer}</span>
                Employer
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link
                  className={classes.navbar}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    authCtx.logout();
                    history.push("/");
                    alert("Successfully logged you out!");
                  }}
                >
                  <span className="mx-2"> {user} </span> Sign out
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
