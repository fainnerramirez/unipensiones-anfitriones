import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { PATHS } from "./utils/PathsRouter";
import HeroHost from "./components/Hero.component";
import ErrorPage from "./components/ErrorPage.component";
import Layout from "./Layout/Layout";
import AvisoPage from "./pages/Aviso.page";
//librarys
import 'react-toastify/dist/ReactToastify.css';
import Root from "./pages/Root";

// const router2 = createBrowserRouter([
//   {
//     path: PATHS.HOME,
//     element: <HeroHost />,
//     errorElement: <ErrorPage/>,
//     children: [
//       {

//         path: "user/:userId",
//         element: <AvisoPage />,
//       },
//     ],
//   }
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HeroHost />} />
      <Route path="user/:userId" element={<AvisoPage />} />
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