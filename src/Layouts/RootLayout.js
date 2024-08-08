import { NavLink, Outlet } from "react-router-dom";
import styles from "../CSS/RootLayout.module.css";
import { useAuth } from '../Authentication/AuthContext';

export default function RootLayout() {

  const { logout } = useAuth();

  return (
    <div className="body">
      <header>
        <nav>
          <h1>YouGG</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
          <button className={styles.btnLogout} onClick={logout}>Logout</button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

/* export default function RootLayout() {
  return (
    <div className={styles.rootLayout}>
      <header>
        <nav className={styles.headerNav}>
          <h1 className={styles.headerTitle}>YouGG</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
} */