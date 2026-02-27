import { useState } from "react";
import Nav            from "./components/Nav.jsx";
import HomePage       from "./pages/HomePage.jsx";
import AboutPage      from "./pages/AboutPage.jsx";
import ProductsPage   from "./pages/ProductsPage.jsx";
import AuthPage       from "./pages/AuthPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

export default function App() {
  const [page, setPage]           = useState("home");
  const [user, setUser]           = useState(null);
  // Always starts false — resets to onboarding on every page refresh
  const [onboarded, setOnboarded] = useState(false);

  const logout = () => { setUser(null); setPage("home"); };

  const handleSetPage = (p) => {
    setOnboarded(true);   // dismiss onboarding when navigating away from it
    setPage(p);
  };

  if (!onboarded) {
    return <OnboardingPage setPage={handleSetPage} setUser={setUser} />;
  }

  return (
    <>
      <Nav page={page} setPage={setPage} user={user} logout={logout} />
      {page === "home"     && <HomePage     setPage={setPage} user={user} />}
      {page === "about"    && <AboutPage />}
      {page === "products" && <ProductsPage setPage={setPage} user={user} />}
      {page === "login"    && <AuthPage     mode="login"    setPage={setPage} setUser={setUser} />}
      {page === "register" && <AuthPage     mode="register" setPage={setPage} setUser={setUser} />}
    </>
  );
}
