import React, { useState, useContext, useEffect, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import AccountIcon from "../../assets/images/account.png";
import AccountOutlineIcon from "../../assets/images/accountOutline.png";
import Community from "../../assets/images/community.png";
import Search from "../../assets/images/searchOutline.png";
import Meine from "../../assets/images/meine.png";
import Favourite from "../../assets/images/favourite.png";
import Settings from "../../assets/images/settings.png";
import Chat from "../../assets/images/chat.png";
import UserImage from "../../assets/images/instructor.png";
import Liste from "./../../assets/images/Liste.png";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import LoginComponent from "../authentication/login";
import PasswordResetComponent from "../authentication/passwordReset";
import { FilterContext } from "../../context/filter/FilterContextProvider";
import useWindowResize from "../../custom-hooks/useWindowResize";

import "./navbar.scss";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useLoginState } from "../../custom-hooks/useLoginState";
import { service as authService } from "../../services/AuthService/authService";
import { builder } from "@builder.io/react";

import { SignupModal } from "../SignupModal/SignupModal";

builder.init(process.env.REACT_APP_BUILDER_API_KEY);

const MusingooNavbar2 = (props) => {
  const filterContext = useContext(FilterContext);
  const [filterState, setFilterStatestate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (filterContext.filterType !== "") {
      setFilterStatestate(true);
    }
  }, [filterContext]);

  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  // state for collapsabel navbar
  const [isOpen, setIsOpen] = useState(false);

  // state for registration modal
  const [signupModal, setSignupModal] = useState(false);
  const toggleRegisterModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSignupModal(!signupModal);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // state for login modal
  const [loginModal, setLoginModal] = useState(false);
  const toggleLoginModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoginModal(!loginModal);
  };

  // state for user
  const currentUser = useLoginState();
  //const currentProfile = useProfileState({ user_id: "me" });

  const toggleLoginModalFromRegisterModal = (e) => {
    e.preventDefault();
    toggleRegisterModal(e);
    toggleLoginModal(e);
  };
  const toggleRegisterModalFromLoginModal = (e) => {
    e.preventDefault();
    toggleLoginModal(e);
    toggleRegisterModal(e);
  };

  // state for password reset modal
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const togglePasswordResetModal = (e) => {
    e.preventDefault();
    setPasswordResetModal(!passwordResetModal);
  };

  const togglePasswordResetModalFromLoginModal = (e) => {
    e.preventDefault();
    toggleLoginModal(e);
    togglePasswordResetModal(e);
  };

  const toggleLoginModalFromPasswordResetModal = (e) => {
    e.preventDefault();
    togglePasswordResetModal(e);
    toggleLoginModal(e);
  };

  return (
    <div>
      {showNav &&
        !(
          width > 1024 &&
          (location.pathname === "/experience" ||
            location.pathname === "/" ||
            location.pathname === "/viewListing" || location.pathname === "/landing-page")
        ) && (
          <Navbar
            color="light"
            light
            expand="md"
            fixed={width < 1024 ? "top" : ""}
            className="border-bottom bg-white customNav"
          >
            <div className="container-fluid pl-lg-5 pr-lg-5 px-2">
              <NavbarBrand
                tag={Link}
                to={"/"}
                style={{ width: width < 1024 ? "300px" : "" }}
                className={`align-items-center
                    ${(location.pathname === "/experience" ||
                    location.pathname === "/viewListing" || location.pathname === "/landing-page") &&
                    width < 1024
                    ? "nav-brand-hide"
                    : "d-flex"
                  }`}
              >
                <img src={logo} className="App-logo" width="120px" alt="logo" />
              </NavbarBrand>
              {(location.pathname === "/experience" ||
                location.pathname === "/viewListing" || location.pathname === "/landing-page") &&
                width < 1024 && (
                  <div
                    style={{ width: "100%" }}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <NavbarBrand
                      style={{ width: "250px" }}
                      tag={Link}
                      to={"/"}
                      className="d-flex align-items-center"
                    >
                      <img
                        src={logo}
                        className="App-logo"
                        width="120px"
                        alt="logo"
                      />
                    </NavbarBrand>

                    <div className=" d-flex mt-2 justify-content-between flex-1">
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          zIndex: "10002",
                          visibility:
                            location.pathname === "/experience"
                              ? "visible"
                              : "hidden",
                        }}
                        onClick={props.handleShowFavExperienceModal}
                      >
                        <img
                          src={Liste}
                          alt="liste"
                          style={{
                            marginRight: "10px",
                            width: "26px",
                            height: "28px",
                          }}
                        />
                        <span style={{ display: "block" }}>Liste</span>
                      </div>
                      {/* <ExperieceSearchBar /> */}
                      {
                        <a
                          className="mt-2"
                          style={{
                            fontWeight: "bold",
                            visibility: !props.viewListingScrolledSection
                              ? "visible"
                              : "hidden",
                          }}
                        >
                          Trainer Werder
                        </a>
                      }
                    </div>
                    {!props.viewListingScrolledSection && (
                      <div
                        style={{ width: "220px", marginLeft: "1rem" }}
                        className="d-flex justify-content-end"
                      >
                        <div className="d-flex align-items-center">
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            className="ml-5"
                          >
                            <DropdownToggle className="accountButtonContainer">
                              <button className="accountButton">
                                <img
                                  src={isLoggedIn ? UserImage : AccountIcon}
                                  style={{
                                    borderRadius: isLoggedIn ? "50%" : "",
                                  }}
                                  alt="account"
                                  width={isLoggedIn ? "45px" : "35px"}
                                />
                              </button>
                            </DropdownToggle>
                            {isLoggedIn && (
                              <DropdownMenu className="px-4 py-4 mr-5 accountDropdown">
                                <div className="d-flex justify-content-end">
                                  <img src={Chat} alt="chat" width="25px" />
                                </div>
                                <DropdownItem header className="text-grey">
                                  Community
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={AccountOutlineIcon}
                                    alt="Profil"
                                  />
                                  <span>Profil</span>
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Community}
                                    alt="Community"
                                  />
                                  <span>Zum Community Feed</span>
                                </DropdownItem>

                                <DropdownItem header className="mt-4 text-grey">
                                  Kunden
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Search}
                                    alt="Finde"
                                  />
                                  <span>Finde Experiences</span>
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Meine}
                                    alt="Meine"
                                  />
                                  <span>Meine Experiences</span>
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Favourite}
                                    alt="Favoritenliste"
                                  />
                                  <span>Meine Favoritenliste</span>
                                </DropdownItem>

                                <DropdownItem header className="mt-4 text-grey">
                                  Anbieter
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Search}
                                    alt="Finde"
                                  />
                                  <span>Finde Experiences</span>
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Meine}
                                    alt="Meine"
                                  />
                                  <span>Meine Experiences</span>
                                </DropdownItem>
                                <DropdownItem className="mb-2 d-flex align-items-center">
                                  <img
                                    width="20px"
                                    className="mr-3"
                                    src={Settings}
                                    alt="Settings"
                                  />
                                  <span>Settings</span>
                                </DropdownItem>
                                <div className="d-flex justify-content-center">
                                  <button className="btn btn-md btn-outline-primary my-3">
                                    Jetzt Trainer werden
                                  </button>
                                </div>
                              </DropdownMenu>
                            )}
                            {!isLoggedIn && (
                              <DropdownMenu>
                                <NavItem className="mr-sm-5 pr-sm-4">
                                  <NavLink
                                    onClick={toggleRegisterModal}
                                    className="cursor-pointer helvetica"
                                  >
                                    <span style={{ color: "#5E5E5E" }}>
                                      {" "}
                                      Registrieren
                                    </span>
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    onClick={toggleLoginModal}
                                    className="cursor-pointer helvetica"
                                  >
                                    <span style={{ color: "#5E5E5E" }}>
                                      {" "}
                                      Login
                                    </span>
                                    {/* TODO: change color */}
                                  </NavLink>
                                </NavItem>
                              </DropdownMenu>
                            )}
                          </Dropdown>
                        </div>
                      </div>
                    )}

                    {props.viewListingScrolledSection && (
                      <div
                        style={{ width: "300px" }}
                        className="ml-auto d-flex align-items-center"
                      >
                        <p className="font-weight-bold mb-0 mr-4">
                          ab<span style={{ fontSize: "24px" }}>15€</span>
                        </p>
                        <button className="btn btn-primary text-white px-4 py-3">
                          Buchung anfragen
                        </button>
                      </div>
                    )}
                  </div>
                )}
              {/* <NavbarToggler onClick={toggle} /> */}
              <div
                className="desktopMenu"
                style={{
                  display:
                    ["/booking", "/booking/group"].includes(
                      location.pathname
                    ) && "none",
                }}
              >
                {location.pathname !== "/experience" &&
                  location.pathname !== "/viewListing" && location.pathname !== "/landing-page" && (
                    <Nav className="ml-auto mt-2  align-items-center" navbar>
                      {!authService.is_logged_in() && (
                        location.pathname == "/landing-page" && (
                          <NavItem className="mr-sm-5 pr-sm-4">
                            <NavLink
                              onClick={toggleRegisterModal}
                              className="cursor-pointer helvetica"
                            >
                              <span style={{ color: "#5E5E5E" }}>
                                {" "}
                                Musingoo for kids
                              </span>
                            </NavLink>
                          </NavItem>)
                      )}
                      <NavItem className="mr-sm-5 pr-sm-4">
                        <Link
                          to="/viewListing"
                          className="activeNavLink text-primary nav-link cursor-pointer helvetica font-weight-bold pr-4 pl-4 ml-4"
                        >
                          Trainer werden
                        </Link>
                      </NavItem>

                      <NavItem className="mr-sm-5 pr-sm-4">
                        <Link
                          to={{
                            pathname: "/experience",
                            state: { fromDashboard: true },
                          }}
                          className="nav-link cursor-pointer helvetica"
                        >
                          <span style={{ color: "#5E5E5E" }}>
                            {" "}
                            Find experiences
                          </span>
                        </Link>
                      </NavItem>
                      {!currentUser && (
                        <NavItem className="mr-sm-5 pr-sm-4">
                          <NavLink
                            onClick={toggleRegisterModal}
                            className="cursor-pointer helvetica"
                          >
                            <span style={{ color: "#5E5E5E" }}>
                              {" "}
                              Registrieren
                            </span>
                          </NavLink>
                        </NavItem>
                      )}
                      {!currentUser && (
                        <NavItem>
                          <NavLink
                            onClick={toggleLoginModal}
                            className="cursor-pointer helvetica"
                          >
                            <span style={{ color: "#5E5E5E" }}> Login</span>
                            {/* TODO: change color */}
                          </NavLink>
                        </NavItem>
                      )}
                      {currentUser && (
                        <NavItem className="mx-3 cursor-pointer helvetica font-weight-bold">
                          <NavLink
                            className="cursor-pointer helvetica"
                            onClick={() => {
                              authService.logout();
                            }}
                          >
                            Logout
                          </NavLink>
                        </NavItem>
                      )}
                    </Nav>
                  )}
              </div>
              <div
                className="mobileMenu"
                style={{
                  display:
                    ["/booking", "/booking/group", "/viewListing" , "/landing-page"].includes(
                      location.pathname
                    ) && "none",
                }}
              >
                <Nav className="ml-auto mt-2 d-flex align-items-center" navbar>
                  {!authService.is_logged_in() && (
                    <NavItem className="mx-3 activeNavLink cursor-pointer helvetica font-weight-bold">
                      <NavLink
                        onClick={toggleRegisterModal}
                        className="cursor-pointer helvetica"
                      >
                        Registrieren
                      </NavLink>
                    </NavItem>
                  )}
                  {!authService.is_logged_in() && (
                    <NavItem>
                      <NavLink
                        onClick={toggleLoginModal}
                        className="cursor-pointer helvetica"
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  )}

                  {authService.is_logged_in() && (
                    <NavItem className="mx-3 activeNavLink cursor-pointer helvetica font-weight-bold">
                      <NavLink
                        className="cursor-pointer helvetica"
                        onClick={() => {
                          authService.logout();
                          window.location.reload();
                        }}
                      >
                        Logout
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </div>
            </div>
          </Navbar>
        )}
      <SignupModal
        open={signupModal}
        onClose={() => toggleRegisterModal()}
        onSwitchToLogin={() => toggleLoginModalFromRegisterModal()}
        width={width}
        currentUser={currentUser}
      />
      {loginModal && (
        <LoginComponent
          modal={loginModal}
          toggleModal={toggleLoginModal}
          togglePasswordResetModalFromLoginModal={
            togglePasswordResetModalFromLoginModal
          }
          toggleRegisterModalFromLoginModal={toggleRegisterModalFromLoginModal}
          width={width}
        />
      )}
      {passwordResetModal && (
        <PasswordResetComponent
          modal={passwordResetModal}
          toggleModal={togglePasswordResetModal}
          toggleLoginModalFromPasswordResetModal={
            toggleLoginModalFromPasswordResetModal
          }
        />
      )}
    </div>
  );
};

export default MusingooNavbar2;
