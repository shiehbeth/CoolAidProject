import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Homepage.jsx';
import About from './About.jsx';
import FindAid from './FindAid.jsx';
import OfferAid from './OfferAid.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/find-aid',
    element: <FindAid />
  },
  {
    path: '/offer-aid',
    element: <OfferAid />
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
