import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./Pages/Home/Home";
import About from "./Pages/Home/About";
import Faq from "./Pages/Home/Faq";
import Contact from "./Pages/Home/Contact";
import NotFound from "./Pages/Error/NotFound";
import Summoner, { summonerLoader } from "./Pages/Player/Components/Profile/Summoner.js";
import LoginForm from "./Pages/Login/LoginForm/LoginForm";
import ChampionStats from "./Pages/GlobalStats/ChampionStats.js";

// layouts
import RootLayout from "./Layouts/RootLayout";
import HelpLayout from "./Layouts/HelpLayout";

// Auth
import { AuthProvider } from "./Authentication/AuthContext";
import ProtectedRoute from "./Authentication/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="help" element={<HelpLayout />}>
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="statistics/global" element={<ChampionStats />} />

          <Route path="summoner/:summonerName/:tag?" element={<Summoner />} loader={summonerLoader} />

        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

