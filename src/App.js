// Import pages
import Home from './pages/Home';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Useful scripts
import ScrollToTop from './components/ScrollToTop';


// React router import 
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// Layout
const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop/>
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
