import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { PATHS } from "./utils/PathsRouter";
import HomeHost from "./components/HomeHost.component";
import ErrorPage from "./components/ErrorPage.component";
import Layout from "./Layout/Layout";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <HomeHost />,
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