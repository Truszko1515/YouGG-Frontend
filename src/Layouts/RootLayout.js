import {NavLink, Outlet} from "react-router-dom";
import LogoNavbar from "../Components/LogoNavbarSVG";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>YouGG</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
