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
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, ModalBody, Modal } from "reactstrap";
import { AiOutlinePlus } from 'react-icons/ai';

import LoginComponent from "../authentication/login";
import PasswordResetComponent from "../authentication/passwordReset";
import { FilterContext } from "../../context/filter/FilterContextProvider";
import useWindowResize from "../../custom-hooks/useWindowResize";
import { service } from "../../services/AuthService/authService";
import { useHistory } from "react-router-dom";

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
import { Input } from "@material-ui/core";
import ExperieceSearchBar from "./experieceSearchBar";

builder.init(process.env.REACT_APP_BUILDER_API_KEY);

const MusingooNavbar = (props) => {
  const filterContext = useContext(FilterContext);

  const [userProfile,setUserProfile] = useState(null);
  const [filterState, setFilterStatestate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const history = useHistory();

  useEffect(() => {
    if (filterContext.filterType !== "") {
      setFilterStatestate(true);
    }
  }, [filterContext]);

  const [showNav, setShowNav] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showPlusPopup, setShowPlusPopup] = useState(false);
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

  const isLoggedIn = localStorage.getItem("current_user");

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

  const getUser = () => {
    service.get_user_profile().then((response) => {
      setUserProfile(response.data.avatar)
    })
  }

  const redirection = (url) => {
    history.push(`${url}`)
  }

  useEffect(() => {
    getUser();
  },[isLoggedIn])

  return (
    <div>
      {showNav &&
        !(
          width <= 1024 &&
          (location.pathname === "/experience" ||
            location.pathname === "/" ||
            location.pathname === "/viewListing")
        ) && (
          <Navbar
            color="light"
            light
            expand="md"
            // fixed={width > 1024 ? "top" : ""}
            fixed={"top"}
            className="border-bottom bg-white customNav"
          >
            <div className="container-fluid pl-lg-5 pr-lg-5 px-2 pb-3">
              <NavbarBrand
                tag={Link}
                to={"/"}
                style={{ width: width >= 1024 ? "300px" : "" }}
                className={`align-items-center
                    ${(location.pathname === "/experience" ||
                    location.pathname === "/viewListing") &&
                    width > 1024
                    ? "nav-brand-hide"
                    : "d-flex"
                  }`}
              >
                <img src={logo} className="App-logo" width="120px" alt="logo" />
              </NavbarBrand>
              {(location.pathname === "/landing-page-new") &&
                width <= 1024 && (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center places " 
                  
                    
                  >
                    <div
                    >
                      <div className=" d-flex">
                        <ExperieceSearchBar
                          width={100}
                        />
                      </div>
                    </div>
                  </div>
                )}
              {(location.pathname === "/experience" ||
                location.pathname === "/viewListing") &&
                width > 1024 && (
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

                    <div className="mt-2 mr-3" style={{ position: 'relative', width: '11%', cursor: 'pointer' }}>
                      <AiOutlinePlus onClick={() => setShowPlusPopup(!showPlusPopup)} color="#4ad9ca" size={35} />
                      {showPlusPopup &&
                        <>
                          <div className="plus-popup">
                            <p>Experience erstellen</p>
                            <p>Story erstellen</p>
                            <p>Post erstellen</p>
                            <p>Gesuch erstellen</p>
                            <p>Chat Message</p>
                          </div>
                        </>
                      }
                    </div>

                    {showPlusPopup &&
                      <>
                        <div onClick={() => setShowPlusPopup(false)} className="overlay"></div>
                      </>
                    }

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
                          {/* <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            className="ml-5"
                          > */}
                          {/* <DropdownToggle className="accountButtonContainer"> */}
                          {currentUser && <button className="accountButton">
                            <img onClick={() => setDropdownOpen(!dropdownOpen)}
                              src={isLoggedIn ? userProfile : AccountIcon}
                              style={{
                                borderRadius: isLoggedIn ? "50%" : "",
                              }}
                              alt="account"
                              width={isLoggedIn ? "45px" : "35px"}
                              height={isLoggedIn ? "44px" : "0"}
                            />
                          </button>}
                         {dropdownOpen && <div className="comunity-modal">
                              <div
                                className="d-flex justify-content-between w-100"
                              >
                                <div className="item">
                                  <h2>Community</h2>
                                  <p className="box">Freunde einladen</p>
                                  <p style={{cursor:'pointer'}} onClick={() => redirection("/settings")}>Profil</p>
                                  <p>Zum Feed</p>
                                  <p>Post erstellen</p>
                                  <p>Livestream erstellen</p>
                                  <p>My network</p>
                                </div>
                                <div className="item">
                                  <h2>Finden</h2>
                                  <p className="box">Suche starten</p>
                                  <p>Wie es funktioniert</p>
                                  <p>Instrumente</p>
                                  <p>Konzerte</p>
                                  <p>Jobs</p>
                                  <p>Meine Buchungen</p>
                                  <p>Meine Favoriten</p>
                                </div>
                                <div className="item">
                                  <h2>Anbieten</h2>
                                  <p className="box2">Host werden</p>
                                  <p>Wie es funktioniert</p>
                                  <p>Musikunterricht</p>
                                  <p>Instrumente</p>
                                  <p>Konzerte</p>
                                  <p>Jobs</p>
                                </div>
                              </div>
                            </div>
                          }
                          {/* </DropdownToggle>
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
                                  <span><Link to='/settings'>
                                  Profil
                                    </ Link></span>
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
                                  
                                  <span>
                                  <Link to='/settings'>
                                  Settings
                                    </ Link>
                                    </span>
                                </DropdownItem>
                                <div className="d-flex justify-content-center">
                                <Link to='/trainerapply'>
                                <button className="btn btn-md btn-outline-primary my-3">
                                    Jetzt Trainer werden
                                  </button>
                                    </ Link>
                                 
                                </div>
                              </DropdownMenu>
                            )} */}
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
                          {/* </Dropdown> */}
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
                  location.pathname !== "/viewListing" && (
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
                      {
                        location.pathname != "/startExperience-single" || location.pathname != "/startExperience-group" && (
                          <NavItem className="mr-sm-5 pr-sm-4">
                            <Link
                              to="/viewListing"
                              className="activeNavLink text-primary nav-link cursor-pointer helvetica font-weight-bold pr-4 pl-4 ml-4"
                            >
                              Trainer werden
                            </Link>
                          </NavItem>
                        )}
                      {
                        location.pathname == "/startExperience-single" || location.pathname == "/startExperience-group" && (
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
                                Feed
                              </span>
                            </Link>
                          </NavItem>
                        )}


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
                              // window.location.reload();
                              redirection("/")
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
                    ["/booking", "/booking/group", "/viewListing"].includes(
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
                          // window.location.reload();
                          redirection("/")
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
        )
      }
      <SignupModal
        open={signupModal}
        onClose={() => toggleRegisterModal()}
        onSwitchToLogin={() => toggleLoginModalFromRegisterModal()}
        width={width}
        currentUser={currentUser}
      />
      {
        loginModal && (
          <LoginComponent
            modal={loginModal}
            toggleModal={toggleLoginModal}
            togglePasswordResetModalFromLoginModal={
              togglePasswordResetModalFromLoginModal
            }
            toggleRegisterModalFromLoginModal={toggleRegisterModalFromLoginModal}
            width={width}
          />
        )
      }
      {
        passwordResetModal && (
          <PasswordResetComponent
            modal={passwordResetModal}
            toggleModal={togglePasswordResetModal}
            toggleLoginModalFromPasswordResetModal={
              toggleLoginModalFromPasswordResetModal
            }
          />
        )
      }
    </div >
  );
};

export default MusingooNavbar;