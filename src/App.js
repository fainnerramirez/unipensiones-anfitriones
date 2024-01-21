import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { PATHS } from "./utils/PathsRouter";
import HeroHost from "./components/Hero.component";
import ErrorPage from "./components/ErrorPage.component";
import Layout from "./Layout/Layout";
import AvisoPage from "./pages/Admin.page";
//librarys
import 'react-toastify/dist/ReactToastify.css';
import Root from "./pages/Root";
import ProfileUser from "./pages/ProfileUser.page";
import SingInUser from "./components/SingIn.component";
import ResetPassword from "./components/ResetPassword.component";
import moment from 'moment';
import 'moment/locale/es'
import './styles/global.css';
import Homepage from "./pages/Home.page";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PlansPage } from "./pages/Plans.page";
import SettingsPage from "./pages/Settings.page";
import NotificationsPage from "./pages/Notifications.page";
import ProfileMovil from "./pages/ProfileMovil.page";
moment.locale('es');

const App = () => {

  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    });
  }, [isAuthenticated])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={isAuthenticated ? <AvisoPage /> : <Homepage />}
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="plans" element={<PlansPage />} />
        <Route
          path="user/:userId"
          element={isAuthenticated ? <AvisoPage /> : <Navigate to="/" />}
        />
        <Route
          path="user/:userId/profile"
          element={isAuthenticated ? <ProfileUser /> : <Navigate to="/" />}
        />
        <Route
          path="profile"
          element={<ProfileMovil />}
        />
      </Route>
    )
  );

  return (
    <Layout>
      <RouterProvider router={router} />
      <ToastContainer />
    </Layout>
  );
};

export default App;
