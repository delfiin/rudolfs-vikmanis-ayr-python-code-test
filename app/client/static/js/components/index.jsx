import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import UrlShortenerPage from './pages/UrlShortenerPage';
import GetStatsPage from './pages/GetStatsPage';
import StatsResultPage from './pages/StatsResultPage';

const ErrorPage = () => (
  <div className='error-page'>
    <h2 style={{ fontWeight: "bold" }}>Not Found</h2>
    <p>The page you requested was not found.</p>
    <hr />
    <p>
      <Link to="/">Shorten a URL →</Link><br />
      <Link to="/get_stats">View stats for a shortened URL →</Link>
    </p>
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <UrlShortenerPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "get_stats",
    element: <GetStatsPage />,
  },
  {
    path: "get_stats/:short_url",
    element: <StatsResultPage />,
  }
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;