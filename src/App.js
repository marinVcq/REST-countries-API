// Import pages
import Home from './pages/Home';
import Detail from './pages/Detail';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Useful scripts
import ScrollToTop from './components/ScrollToTop';


// React router import 
import {
  createBrowserRouter,
  createHashRouter,
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
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:countryName",
        element: <Detail/>,
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
