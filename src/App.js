import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./Pages/Home/Home";
import About from "./Pages/Home/About";
import Faq from "./Pages/Help/Faq";
import Contact from "./Pages/Help/Contact";
import NotFound from "./Pages/Error/NotFound";
import Careers, { careersLoader } from "./Pages/Careers/Careers";
import CareerDetail, { CareerDetailsLoader } from "./Pages/Careers/CareerDetail";
import CareersError from "./Pages/Careers/CareersError";
import Summoner, { summonerLoader } from "./Pages/Player/Summoner";
import TestComponent from "./Pages/Error/TestComponent";

// layouts
import RootLayout from "./Layouts/RootLayout";
import HelpLayoyt from "./Layouts/HelpLayout";
import CareersLayout from "./Layouts/CareersLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="help" element={<HelpLayoyt />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route
        path="careers"
        element={<CareersLayout />}
        errorElement={<CareersError />}
      >
        <Route index element={<Careers />} loader={careersLoader} />
        <Route
          path=":id"
          element={<CareerDetail />}
          loader={CareerDetailsLoader}
        />
      </Route>

      <Route
        path="summoner/:summonerName"
        element={<Summoner />}
        loader={summonerLoader}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return  <RouterProvider router={router} />
}

export default App;
