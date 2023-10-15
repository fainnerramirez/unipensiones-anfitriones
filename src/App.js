import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./utils/PathsRouter";
import HeroHost from "./components/Hero.component";
import ErrorPage from "./components/ErrorPage.component";
import Layout from "./Layout/Layout";
//librarys
import 'react-toastify/dist/ReactToastify.css';
import AvisoPage from "./pages/Aviso.page";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <HeroHost />,
    errorElement: <ErrorPage/>,
  },
  {
    path: PATHS.AVISO,
    element: <AvisoPage />,
    errorElement: <ErrorPage/>,
  },
]);

const App = () => {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};

export default App;