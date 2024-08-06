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
import Summoner, { summonerLoader } from "./Pages/Player/Summoner";
import LoginForm from "./Pages/Login/LoginForm/LoginForm";


// layouts
import RootLayout from "./Layouts/RootLayout";
import HelpLayoyt from "./Layouts/HelpLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route  path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="help" element={<HelpLayoyt />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route
        path="summoner/:summonerName"
        element={<Summoner />}
        loader={summonerLoader}
      />
      
      <Route path="*" element={<NotFound />} />
      
    </Route>
    
    <Route path="login" element={<LoginForm />} />
    </>
  )
);

function App() {
  return  <RouterProvider router={router} />
  //return <LoginForm />
}

export default App;
