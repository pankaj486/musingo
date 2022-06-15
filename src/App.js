import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { VerifyEmail } from "./components/authentication/VerifyEmail";
import ChatLayout from "./components/chat/ChatLayout/ChatLayout";
import CustomerView from "./components/customerView/customerView";
import MusingooNavbar from "./components/layout/navbar";
import BookingRequestsList from "./components/modals/BookingRequestsList/BookingRequestsList";
import KidsModal from "./components/modals/Kids/kids";
import NetworkModals from "./components/modals/Network/networkModals";
import NewApplicationsList from "./components/modals/newApplicationList/newApplicationList";
import ConfirmPayment from "./components/modals/Payment/confirmPayment";
import GetRefund from "./components/modals/Payment/getRefund";
import PaymentFail from "./components/modals/Payment/paymentFail";
import PaymentRefund from "./components/modals/Payment/paymentRefund";
import PaymentRefundReceived from "./components/modals/Payment/paymentRefundReceived";
import PaymentUpdate from "./components/modals/Payment/paymentUpdate";
import RefundRefused from "./components/modals/Payment/refundRefused";
import RefuseRefund from "./components/modals/Payment/refuseRefund";
import RatingModal from "./components/modals/Rating/rating";
import SocialShare from "./components/modals/socialShare/SocialShare";
import MusicianView from "./components/musicianView/musicianView";
import Error404Page from "./components/pages/404";
import Applications from "./components/pages/Applications/applications";
import Booking from "./components/pages/Booking/booking";
import BookingInquiries from "./components/pages/Booking/Booking Inquiries/BookingInquiries";
import BookingConcert from "./components/pages/Booking/bookingConcert";
import BookingInstrumentBuy from "./components/pages/Booking/bookingInstrumentBuy";
import BookingInstrumentRental from "./components/pages/Booking/bookingInstrumentType";
import BookingJobs from "./components/pages/Booking/bookingjobs";
import CancelSubscription from "./components/pages/CancelSubscription/cancelSubscription";
import CoachOnboard from "./components/pages/CoachOnboard/coachOnboard";
import Calendar from "./components/pages/CreateExperience/components/Calendar/Calendar.old";
import CreateMoreExperienceModal from "./components/pages/CreateExperience/components/CreateMoreExperienceModal/CreateMoreExperienceModal";
import ExperienceTypeSelect from "./components/pages/CreateExperience/components/ExperienceTypeSelect/ExperienceTypeSelect";
import Groups from "./components/pages/CreateExperience/components/Groups/Groups";
import CreateExperience from "./components/pages/CreateExperience/CreateExperience";
import Dashboard from "./components/pages/Dashboard";
import Feedback from "./components/pages/Feedback/feedback";
import FindExperience from "./components/pages/FindExperience/FindExperience";
import ExperienceListing from "./components/pages/FindExperience/Listing/experienceListing";
import LandingPageNew from './components/pages/Landing-page-new/Landing-page-new';
import InviteFriendModal from "./components/pages/LandingPage/inviteFriends";
import LandingPage from "./components/pages/LandingPage/landingPage";
import ViewListing from "./components/pages/Listing/ViewListing";
import LiveStream from "./components/pages/LiveStream/live";
import Loader from "./components/pages/loader/Loader";
import Network from "./components/pages/Network/network";
import Partnerships from "./components/pages/Partnerships/partnerships";
import PasswordReset from "./components/pages/PasswordReset/passwordReset";
import Settings from "./components/pages/Settings/settings";
import { StartExperience } from "./components/pages/StartExperience/StartExperience";
import StartExperienceGroup from "./components/pages/StartExperienceGroup";
import StartExperienceSingle from "./components/pages/StartExperienceSingle";
import AddStory from "./components/pages/story/addStory";
import Teaser from "./components/pages/Teaser";
import TrainerApply from "./components/pages/TrainerApply/TrainerApply";
import UserProfile from "./components/pages/UserProfile/UserProfile";
import VideoLesson from "./components/pages/VideoLesson/VideoLesson";
import SharedComponents from "./components/sharedComponents/sharedComponents";
import ToastComponent from "./components/toast/toast";
import TrainerStat from "./components/trainerStat/trainerStat";
import TrainerView from "./components/trainerView/trainerView";
import { FilterContextProvider } from "./context/filter/FilterContextProvider";
import "./services/axiosInterceptors";
import { useActions } from "../src/hooks/use-actions";
import {experienceService} from 'src/services/api'

function App() {
  const { AllAction } = useActions();
  const [showNavBar, setShowNavBar] = useState(true);
  const [showFavExperienceModal, setShowFavExperienceModal] = useState(false);
  const [viewListingShowRequestBooking, setViewListingRequestBooking] =
    useState(false);
  const [viewListingScrolledSection, setViewListingScrolledSection] =
    useState(false);

  const handleShowFavExperienceModal = (e) => {
    console.log("Heart Button Clicked");
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setShowFavExperienceModal((prevState) => !prevState);
  };

  const handleShowViewListingRequestBookingInNav = () => {
    setViewListingRequestBooking((prevState) => !prevState);
  };

  
  useEffect(()=> {
    AllAction({'test':'shani'})
  },[])

  return (
    <div className="App">
      <FilterContextProvider>
        <Router>
          {showNavBar && (
            <MusingooNavbar
              handleShowFavExperienceModal={handleShowFavExperienceModal}
              viewListingScrolledSection={viewListingScrolledSection}
            />
          )}

          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <FindExperience
                  toggleNavBar={() => setShowNavBar(!showNavBar)}
                />
              )}
            ></Route>
            <Route
              path="/experience"
              render={() => (
                <FindExperience
                  toggleNavBar={() => setShowNavBar(!showNavBar)}
                  showFavExperienceModal={showFavExperienceModal}
                  handleShowFavExperienceModal={handleShowFavExperienceModal}
                  handleHeartButton={() => handleShowFavExperienceModal()}
                />
              )}
            />
            <Route
              path="/landing-page-new"
              render={() => (
                <LandingPageNew
                  toggleNavBar={() => setShowNavBar(!showNavBar)}
                />
              )}
            />
            <Route
              path="/viewListing"
              render={(props) => (
                <ViewListing
                  scrolledSection={(value) =>
                    setViewListingScrolledSection(value)
                  }
                />
              )}
            />
            <Route
              path="/landing-page"
              render={(props) => (
                <LandingPage
                  scrolledSection={(value) =>
                    setViewListingScrolledSection(value)
                  }
                />
              )}
            />

            <Route path="/booking">
              <Booking />
            </Route>
            <Route path="/booking-jobs">
              <BookingJobs />
            </Route>
            <Route path="/booking-concert">
              <BookingConcert />
            </Route>
            <Route path="/booking-instrument-rental">
              <BookingInstrumentRental />
            </Route>
            <Route path="/booking-instrument-buy">
              <BookingInstrumentBuy />
            </Route>
            <Route path="/passwordReset">
              <PasswordReset />
            </Route>
            <Route path="/startExperience">
              <StartExperience />
            </Route>
            <Route path="/trainerApply">
              <TrainerApply />
            </Route>
            <Route path="/trainerStat">
              <TrainerStat />
            </Route>
            <Route path="/trainerView">
              <TrainerView />
            </Route>
            <Route path="/musicianView">
              <MusicianView />
            </Route>
            <Route path="/applications">
              <Applications />
            </Route>
            <Route path="/newApplicationList">
              <NewApplicationsList />
            </Route>
            <Route path="/network">
              <Network />
            </Route>
            <Route path="/toast">
              <ToastComponent />
            </Route>
            <Route path="/networkModals">
              <NetworkModals />
            </Route>
            <Route path="/sharedComponents">
              <SharedComponents />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/cancelSubscription">
              <CancelSubscription />
            </Route>
            <Route path="/feedback">
              <Feedback />
            </Route>
            <Route path="/paymentFail">
              <PaymentFail />
            </Route>
            <Route path="/paymentUpdate">
              <PaymentUpdate />
            </Route>
            <Route path="/confirmPayment">
              <ConfirmPayment />
            </Route>
            <Route path="/paymentRefund">
              <PaymentRefund />
            </Route>
            <Route path="/paymentRefundReceived">
              <PaymentRefundReceived />
            </Route>
            <Route path="/refuseRefund">
              <RefuseRefund />
            </Route>
            <Route path="/getRefund">
              <GetRefund />
            </Route>
            <Route path="/rating">
              <RatingModal />
            </Route>
            <Route path="/partnerships">
              <Partnerships />
            </Route>
            <Route path="/addStory">
              <AddStory />
            </Route>
            <Route path="/onboardCoach">
              <CoachOnboard />
            </Route>
            <Route path="/experienceListing">
              <ExperienceListing />
            </Route>
            <Route path="/welcomeKids">
              <KidsModal />
            </Route>
            <Route path="/refundRefused">
              <RefundRefused />
            </Route>
            <Route path="/customerView">
              <CustomerView />
            </Route>
            <Route exact path="/socialShare" component={SocialShare} />
            <Route
              exact
              path="/bookingRequestsList"
              component={BookingRequestsList}
            />
            <Route
              exact
              path="/bookingInquiries"
              component={BookingInquiries}
            />
            <Route
              exact
              path="/cancelBookingRequest"
              component={BookingInquiries}
            />
            <Route exact path="/loading" component={Loader} />
            <Route exact path="/conversations" component={ChatLayout} />
            <Route
              exact
              path="/createExperience"
              component={CreateExperience}
            />
            <Route
              exact
              path="/createExperienceModal"
              component={CreateMoreExperienceModal}
            />
            <Route
              path="/createExperience/classes"
              component={CreateExperience}
            />
            <Route
              path="/createExperience/instruments"
              component={CreateExperience}
            />
            <Route path="/createExperience/jobs" component={CreateExperience} />
            <Route
              path="/createExperience/concerts"
              component={CreateExperience}
            />
            <Route path="/calendar" component={Calendar} />
            <Route
              exact
              path="/experienceTypeSelect"
              component={ExperienceTypeSelect}
            />
            <Route path="/profile/visitor" component={UserProfile} />
            <Route path="/profile/trainer" component={UserProfile} />
            {/*<Route path="/profile/edit" component={UserProfileEdit} />*/}
            <Route path="/addGroups" component={Groups} />
            <Route path="/verify/email/:token" component={VerifyEmail} />
            <Route
              path="/startExperience-group"
              component={StartExperienceGroup}
            />
            <Route
              path="/startExperience-single"
              component={StartExperienceSingle}
            />
            <Route path="/inviteFriendModal" component={InviteFriendModal} />
            <Route path="/404" component={Error404Page} />
            <Route path="/livestream" component={LiveStream} />
            <Route exact path="/dashboard" component={Dashboard}  />
            <Route exact path="/teaser" component={Teaser}  />
            <Route exact path="/video-lesson" component={VideoLesson}  />
          </Switch>
        </Router>
      </FilterContextProvider>
    </div>
  );
}

export default App;