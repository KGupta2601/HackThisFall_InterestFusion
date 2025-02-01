import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import LandingPage from "./components/Landingpage/Landingpage";
import Login2 from "./components/LoginComp/Login2";
import PageNotFound from "./components/PageNotFound";
import { ONESIGNAL_APP_ID } from "./utils/constants";
import OneSignal from "react-onesignal";
import Chat from "./components/Chat/Chat";

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
          <Routes>
            {/* Separate layout for LandingPage */}
            <Route path="/" element={<LandingPage />} />

            {/* Parent Route with NavBar and Footer */}
            <Route element={<Body />}>
              <Route path="home" element={<Feed />} />
              <Route path="login" element={<Login2 />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
