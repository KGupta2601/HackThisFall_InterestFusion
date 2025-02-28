import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/Landingpage/Landingpage";
import PageNotFound from "./components/PageNotFound";
import { ONESIGNAL_APP_ID } from "./utils/constants";
import OneSignal from "react-onesignal";
import Chat from "./components/Chat/Chat";
import About from "./components/About";
import Contact from "./components/Contact";
import StudyGroup from "./components/StudyGroup";
import InterestMatching from "./components/InterestMatching";
import SupportPage from "./components/SupportPage";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import CursorTrail from "./components/CursorTrail";
import Community from "./components/Community";
import CommunityEvents from "./components/Events/CommunityEvents";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/Terms";
import ForgetPassword from "./components/auth/ForgetPassword";
import VerifyCode from "./components/auth/VerifyCode";
import SetPassword from "./components/auth/SetPassword";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PublicProfile from "./components/PublicProfile";

function App() {
  try {
    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      notifyButton: {
        enable: true,
      },
    }).then(() => {
      OneSignal.Notifications.requestPermission();
    });
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route element={<Body />}>
              <Route path="home" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="chat" element={<Chat />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="services/groups" element={<StudyGroup />} />
              <Route path="services/events" element={<CommunityEvents />} />
              <Route path="services/matching" element={<InterestMatching />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="blog" element={<Blog />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
            </Route>
            <Route
              path="GetToKnowMe/:publicUserId"
              element={<PublicProfile />}
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="verify-code" element={<VerifyCode />} />
            <Route path="set-password" element={<SetPassword />} />

            <Route path="*" element={<PageNotFound />} />
            {/* <Routes> */}
            <Route path="community" element={<Community />} />
            <Route path="faq" element={<FAQ />} />
            {/* </Routes> */}
          </Routes>
        </BrowserRouter>
        <BrowserRouter basename="/"></BrowserRouter>
      </Provider>
      <CursorTrail />
    </>
  );
}

export default App;
