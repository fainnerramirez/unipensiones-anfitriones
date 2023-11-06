import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { PATHS } from "./utils/PathsRouter";
import HeroHost from "./components/Hero.component";
import ErrorPage from "./components/ErrorPage.component";
import Layout from "./Layout/Layout";
import AvisoPage from "./pages/Aviso.page";
//librarys
import 'react-toastify/dist/ReactToastify.css';
import Root from "./pages/Root";
import ProfileUser from "./pages/ProfileUser.page";
import SingInUser from "./components/SingIn.component";
import ResetPassword from "./components/ResetPassword.component";
import moment from 'moment';
import 'moment/locale/es'
import './styles/global.css';
moment.locale('es');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HeroHost />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="user/:userId" element={<AvisoPage />} />
      <Route path="user/:userId/profile" element={<ProfileUser />} />
    </Route>
  )
);

const App = () => {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};

export default App;