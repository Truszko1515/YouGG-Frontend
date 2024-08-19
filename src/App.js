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

          <Route path="summoner/:summonerName" element={<Summoner />} loader={summonerLoader} />

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

/* const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
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
); */

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/login" element={<LoginForm />}>
//         <ProtectedRoute path="/" element={<RootLayout />}>
//           <ProtectedRoute index element={<Home />} />
//           <ProtectedRoute path="about" element={<About />} />

//           <ProtectedRoute path="help" element={<HelpLayoyt />}>
//             <ProtectedRoute path="faq" element={<Faq />} />
//             <ProtectedRoute path="contact" element={<Contact />} />
//           </ProtectedRoute>

//           <ProtectedRoute
//             path="summoner/:summonerName"
//             element={<Summoner />}
//             loader={summonerLoader}
//           />

//           <Route path="*" element={<NotFound />} />
//         </ProtectedRoute>
//       </Route>
//     </>
//   )
// );