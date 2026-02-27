import { useState } from "react";
import Nav            from "./components/Nav.jsx";
import HomePage       from "./pages/HomePage.jsx";
import AboutPage      from "./pages/AboutPage.jsx";
import ProductsPage   from "./pages/ProductsPage.jsx";
import AuthPage       from "./pages/AuthPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  // Show onboarding only if user hasn't seen it before
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("coffeecient_onboarded") === "1"
  );

  const finishOnboarding = () => setOnboarded(true);

  const logout = () => {
    setUser(null);
    setPage("home");
  };

  // Wrap setPage so finishing onboarding also hides the overlay
  const handleSetPage = (p) => {
    setPage(p);
    finishOnboarding();
  };

  if (!onboarded) {
    return (
      <OnboardingPage
        setPage={handleSetPage}
        setUser={setUser}
      />
    );
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
